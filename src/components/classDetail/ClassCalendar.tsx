import { useEffect, useState } from 'react';
import { DatePicker } from '@mantine/dates';
import './ClassDetail.css';
import { IconDetailCalendar } from '../../config/IconData';
import { useParams } from 'react-router-dom';
import { findOneClass } from '../../store/useClassStore';

function ClassCalendar({
  onDateChange,
  onTypeChange,
}: {
  onDateChange: (date: Date | null) => void;
  onTypeChange: (type: string) => void; // 추가된 콜백
}) {
  const { id } = useParams<{ id: string }>();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [availableTypes, setAvailableTypes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null); // 선택된 타입

  useEffect(() => {
    if (!id) {
      console.error('URL에서 classId를 가져오지 못했습니다.');
      return;
    }
    const loadClassDetail = async () => {
      const detail = await findOneClass(id);

      if (!detail) {
        return;
      }

      if (detail.dates && detail.dates.length > 0) {
        const availableDates = detail.dates.map((date) => {
          const parsedDate = new Date(date.start_date);
          return parsedDate;
        });
        setAvailableDates(availableDates);
      }

      if (detail.class_type) {
        const availableTypes = Array.isArray(detail.class_type)
          ? detail.class_type
          : [detail.class_type];
        setAvailableTypes(availableTypes);
        setSelectedType(availableTypes[0]); // 첫 번째 타입을 기본 선택
        onTypeChange(availableTypes[0]); // 기본 선택된 타입 콜백 호출
      }
    };

    loadClassDetail();
  }, [id, onTypeChange]);

  const handleTodayClick = () => {
    const today = new Date();
    setSelectedDate(today);
    onDateChange(today);
  };

  const handleDateChange = (newValue: Date | null) => {
    setSelectedDate(newValue);
    onDateChange(newValue);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = event.target.value;
    setSelectedType(selectedType);
    onTypeChange(selectedType); // 선택된 타입을 상위 컴포넌트에 전달
  };

  // 버튼에 클래스 적용하는 함수
  const renderDay = (date: Date) => {
    const today = new Date();
    const isPastDate = date.getTime() < today.setHours(0, 0, 0, 0);

    // 날짜가 클릭 가능한지 확인
    const isAvailable = availableDates.some(
      (availableDate) => availableDate.toDateString() === date.toDateString(),
    );

    // 버튼에 적용할 클래스 이름 결정
    const buttonClassName = isAvailable
      ? 'clickable-button'
      : 'disabled-button';

    return (
      <td>
        <button
          className={buttonClassName}
          style={{
            color: isPastDate ? '#999' : '',
          }}
          disabled={!isAvailable} // 버튼 비활성화 여부
        >
          {date.getDate()}
        </button>
      </td>
    );
  };

  return (
    <div className="relative">
      <button
        onClick={handleTodayClick}
        className="absolute left-[14px] top-[14px] z-10"
      >
        <IconDetailCalendar />
        <span className="sr-only">오늘 날짜</span>
      </button>

      {/* 날짜 선택 UI */}
      <DatePicker
        value={selectedDate}
        monthLabelFormat="YYYY.MM"
        hideOutsideDates
        renderDay={renderDay}
        minDate={new Date()}
        onChange={handleDateChange}
      />

      {/* 클래스 타입 선택 드롭다운 */}
      {availableTypes.length > 0 && (
        <div className="mt-4">
          <label htmlFor="classType">Select Class Type:</label>
          <select
            id="classType"
            value={selectedType ?? ''}
            onChange={handleTypeChange}
            className="class-type-dropdown"
          >
            {availableTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

export default ClassCalendar;
