import { useEffect, useRef } from 'react';
import useClassStore from '../../store/useClassStore';
import ClassCard from './ClassCard';

type CardListProps = {
  kind: string;
};
// popular, custom-k-pick, newest, today

const CardList = ({ kind }: CardListProps) => {
  const { filteredClasses, fetchClasses, filterClasses } = useClassStore(
    (state) => ({
      filteredClasses: state.filteredClasses[kind] || [], // kind에 해당하는 필터링된 데이터, 없으면 빈 배열
      fetchClasses: state.fetchClasses,
      filterClasses: state.filterClasses,
    }),
  );
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  useEffect(() => {
    filterClasses(kind);
  }, [kind, fetchClasses, filterClasses]);

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({
      left: -300,
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({
      left: 300,
      behavior: 'smooth',
    });
  };

  if (!filteredClasses) return null;

  return (
    <div className="relative mx-5 ">
      {/* 왼쪽 스크롤 버튼 */}
      <button
        onClick={scrollLeft}
        className="absolute w-10 h-10 left-[-20px] top-1/4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
      >
        {'<'}
      </button>

      {/* 카드 리스트 */}
      <div
        ref={scrollContainerRef}
        className="flex gap-5 overflow-x-scroll hide-scrollbar custom-scrollbar pr-5"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {filteredClasses &&
          filteredClasses.map((classItem) => (
            <div key={classItem.id} style={{ scrollSnapAlign: 'start' }}>
              <ClassCard classItem={classItem} tag={kind} />
            </div>
          ))}
      </div>

      {/* 오른쪽 스크롤 버튼 */}
      <button
        onClick={scrollRight}
        className="absolute w-10 h-10 right-[-20px] top-1/4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
      >
        {'>'}
      </button>
    </div>
  );
};

export default CardList;
