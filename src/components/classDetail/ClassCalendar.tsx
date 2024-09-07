import { Dispatch, SetStateAction } from 'react';
import { DatePicker } from '@mantine/dates';
import './ClassDetail.css';
import { IconDetailCalendar } from '../../config/IconData';
import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

type ClassCalendarProps = {
  selectedDate: Date | null;
  availableDates: Date[];
  availableTypes: string[];
  selectedClassType: string | null;
  onDateChange: Dispatch<SetStateAction<Date | null>>;
  onTypeChange: Dispatch<SetStateAction<string | null>>;
};

function ClassCalendar({
  selectedDate,
  availableDates,
  onDateChange,
}: ClassCalendarProps) {
  const [showCalendar, setShowCalendar] = useState(true);

  const handleTodayClick = () => {
    const today = new Date();
    onDateChange(today);
    setShowCalendar(false); // 날짜를 선택하면 애니메이션으로 캘린더 숨김
  };

  const handleDateChange = (newValue: Date | null) => {
    onDateChange(newValue);
    setShowCalendar(true); // 날짜를 선택하면 애니메이션으로 캘린더 표시
  };

  const renderDay = (date: Date) => {
    const today = new Date();
    const isPastDate = date.getTime() < today.setHours(0, 0, 0, 0);

    const isAvailable = availableDates.some(
      (availableDate) => availableDate.toDateString() === date.toDateString(),
    );

    const dayClassName = isAvailable ? 'clickable-day' : 'disabled-day';

    return (
      <div
        className={dayClassName}
        style={{
          color: isPastDate ? '#999' : '',
          cursor: isAvailable ? 'pointer' : 'default',
        }}
        onClick={() => {
          if (isAvailable) handleDateChange(date);
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

      <CSSTransition
        in={showCalendar}
        timeout={300}
        classNames="calendar"
        unmountOnExit
      >
        <DatePicker
          value={selectedDate}
          monthLabelFormat="YYYY.MM"
          hideOutsideDates
          renderDay={renderDay}
          minDate={new Date()}
          onChange={handleDateChange}
        />
      </CSSTransition>
    </div>
  );
}

export default ClassCalendar;
