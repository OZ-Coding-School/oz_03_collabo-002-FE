import { DatePicker } from '@mantine/dates';
import './ClassDetail.css';
import { IconDetailCalendar } from '../../config/IconData';

type ClassCalendarProps = {
  selectedDate: Date | null;
  availableDates: Date[];
  onDateChange: (date: Date | null) => void;
};

function ClassCalendar({
  selectedDate,
  availableDates,
  onDateChange,
}: ClassCalendarProps) {
  const handleTodayClick = () => {
    const today = new Date();
    onDateChange(today);
  };

  const handleDateChange = (newValue: Date | null) => {
    onDateChange(newValue);
  };

  const renderDay = (date: Date) => {
    const today = new Date();
    const isPastDate = date.getTime() < today.setHours(0, 0, 0, 0);

    // 날짜가 클릭 가능한지 확인
    const isAvailable = availableDates.some(
      (availableDate) => availableDate.toDateString() === date.toDateString(),
    );

    const buttonClassName = isAvailable
      ? 'clickable-button'
      : 'disabled-button';

    return (
      <td>
        <button
          className={buttonClassName}
          style={{ color: isPastDate ? '#999' : '' }}
          disabled={!isAvailable}
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
