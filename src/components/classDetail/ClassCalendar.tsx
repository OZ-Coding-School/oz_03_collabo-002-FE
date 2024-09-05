import { useEffect, useState } from 'react';
import { DatePicker } from '@mantine/dates';
import './ClassDetail.css';
import { IconDetailCalendar } from '../../config/IconData';
import { useParams } from 'react-router-dom';
import { findOneClass } from '../../store/useClassStore';

function ClassCalendar({
  onDateChange,
}: {
  onDateChange: (date: Date | null) => void;
}) {
  const { id } = useParams<{ id: string }>();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [availableTypes, setAvailableTypes] = useState<string[]>([]);

  useEffect(() => {
    if (!id) {
      console.error('URL에서 classId를 가져오지 못했습니다.');
      return;
    }
    const loadClassDetail = async () => {
      console.log('findOneClass 호출, classId:', id);

      const detail = await findOneClass(id);

      if (!detail) {
        console.log('클래스 정보를 찾을 수 없습니다.');
        return;
      }

      console.log('받아온 클래스 정보:', detail);

      if (detail.dates && detail.dates.length > 0) {
        const availableDates = detail.dates.map((date) => {
          const parsedDate = new Date(date.start_date);
          return parsedDate;
        });
        setAvailableDates(availableDates);
      } else {
        console.log('사용 가능한 날짜가 없습니다.');
      }

      if (detail.class_type) {
        const availableTypes = Array.isArray(detail.class_type)
          ? detail.class_type
          : [detail.class_type];
        setAvailableTypes(availableTypes);
      } else {
        console.log('클래스 타입이 없습니다.');
      }
    };

    loadClassDetail();
  }, [id]);

  const handleTodayClick = () => {
    const today = new Date();
    setSelectedDate(today);
    onDateChange(today);
  };

  const handleDateChange = (newValue: Date | null) => {
    setSelectedDate(newValue);
    onDateChange(newValue);
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

      <DatePicker
        value={selectedDate}
        monthLabelFormat="YYYY.MM"
        hideOutsideDates
        renderDay={renderDay}
        minDate={new Date()}
        onChange={handleDateChange}
      />
    </div>
  );
}

export default ClassCalendar;
