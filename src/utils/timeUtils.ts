// utils/timeUtils.ts
export const generateTimeBlocks = (
  startTime: string,
  endTime: string,
): string[] => {
  const blocks: string[] = [];
  const parseTime = (time: string): Date => {
    const [hours, minutes] = time.split(':').map(Number);
    const now = new Date();
    now.setHours(hours, minutes, 0, 0);
    return now;
  };

  let start = parseTime(startTime);
  const end = parseTime(endTime);

  while (start < end) {
    const next = new Date(start.getTime() + 120 * 60000); // 2시간 추가
    const timeBlock = `${start.toTimeString().slice(0, 5)} - ${next
      .toTimeString()
      .slice(0, 5)}`;
    blocks.push(timeBlock);
    start = next;
  }

  return blocks;
};
