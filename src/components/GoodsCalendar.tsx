import React, { useState } from 'react';
import { DatePicker } from '@mantine/dates';

function GoodsCalendar() {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <div>
      <DatePicker value={value} onChange={setValue} className="" />
      {value && <div>Selected date: {value.toDateString()}</div>}
    </div>
  );
}

export default GoodsCalendar;
