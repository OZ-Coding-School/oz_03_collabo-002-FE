import { useState } from 'react';
import { DatePicker } from '@mantine/dates';
import './ClassDetail.css';
import { IconDetailCalendar } from '../../../config/IconData';

function ClassCalendar({
  onDateChange,
}: {
  onDateChange: (date: Date | null) => void;
}) {
  const [value, setValue] = useState<Date | null>(null);

  const handleTodayClick = () => {
    const today = new Date();
    setValue(today);
    onDateChange(today);
  };

  const handleDateChange = (newValue: Date | null) => {
    setValue(newValue);
    onDateChange(newValue);
  };

  const CustomDay = ({ date }: { date: Date }) => {
    const today = new Date();
    const isPastDate = date.getTime() < today.setHours(0, 0, 0, 0);

    return (
      <div
        style={{
          color: isPastDate ? '#999' : 'inherit',
        }}
      >
        {date.getDate()}
      </div>
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
        value={value}
        monthLabelFormat="YYYY.MM"
        hideOutsideDates
        onChange={handleDateChange}
        renderDay={(date) => <CustomDay date={date} />}
        minDate={new Date()}
      />
    </div>
  );
}

export default ClassCalendar;
