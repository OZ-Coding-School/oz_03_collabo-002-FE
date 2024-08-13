import { useState } from 'react';
import { DatePicker } from '@mantine/dates';
import './ClassDetail.css';
import { IconDetailCalendar } from '../../config/IconData';

function ClassCalendar() {
  const [value, setValue] = useState<Date | null>(null);

  const handleTodayClick = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 시간을 00:00:00.000으로 설정
    setValue(today);
  };

  return (
    <div className="relative">
      <button
        onClick={handleTodayClick}
        className="absolute left-[14px] top-[14px]"
      >
        <IconDetailCalendar />
        <span className="sr-only">오늘 날짜</span>
      </button>

      <DatePicker
        value={value}
        monthLabelFormat="YYYY.MM"
        hideOutsideDates
        onChange={setValue}
      />
    </div>
  );
}

export default ClassCalendar;
