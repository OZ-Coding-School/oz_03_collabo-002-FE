import React, { useEffect, useState } from 'react';
import { DatePicker } from '@mantine/dates';
import './ClassDetail.css';
import { IconDetailCalendar } from '../../config/IconData';
import { findOneClass } from '../../store/useClassStore';
import { useParams } from 'react-router-dom'; // useParams 사용

function ClassCalendar({
  onDateChange,
}: {
  onDateChange: (date: Date | null) => void;
}) {
  const { id } = useParams<{ id: string }>();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [availableTypes, setAvailableTypes] = useState<string[]>([]); // string 배열로 수정
  useEffect(() => {
    if (!id) {
      console.error('URL에서 classId를 가져오지 못했습니다.');
      return;
    }

    const loadClassDetail = async () => {
      console.log('findOneClass 호출, classId:', id);
      const detail = await findOneClass(id);

      if (detail && detail.dates.length > 0) {
        const availableDates = detail.dates.map(
          (date) => new Date(date.start_date),
        );
        console.log('받아온 날짜:', availableDates);
        setAvailableDates(availableDates);
      } else {
        console.log(
          '사용 가능한 날짜가 없거나 클래스 정보를 찾을 수 없습니다.',
        );
      }
      if (detail && detail.class_type) {
        // class_type이 배열이 아닌 경우 배열로 변환
        const availableTypes = Array.isArray(detail.class_type)
          ? detail.class_type
          : [detail.class_type]; // 배열이 아니면 배열로 변환

        console.log('받아온 클래스 타입:', availableTypes);
        setAvailableTypes(availableTypes); // 배열을 상태로 설정
      } else {
        console.log('클래스 타입이 없거나 클래스 정보를 찾을 수 없습니다.');
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

  const isDateSelectable = (date: Date) => {
    return availableDates.some(
      (availableDate) =>
        availableDate.toISOString().split('T')[0] ===
        date.toISOString().split('T')[0],
    );
  };

  const CustomDay = ({ date }: { date: Date }) => {
    const selectable = isDateSelectable(date);
    return (
      <button
        className={`custom-day-button ${selectable ? 'selectable' : 'not-selectable'}`}
        disabled={!selectable}
      >
        {date.getDate()}
      </button>
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
        renderDay={(date) => <CustomDay date={date} />}
        minDate={new Date()}
        onChange={handleDateChange}
      />
    </div>
  );
}

export default ClassCalendar;
