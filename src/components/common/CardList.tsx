import { useEffect, useRef } from 'react';
import { useClassStore } from '../../store/useClassStore';
import ClassCard from './ClassCard';

type CardListProps = {
  kind: string;
};

const CardList = ({ kind }: CardListProps) => {
  const { filteredClasses, fetchClasses, filterClasses } = useClassStore(
    (state) => ({
      filteredClasses: state.filteredClasses[kind] || [], // kind에 해당하는 필터링된 데이터
      fetchClasses: state.fetchClasses,
      filterClasses: state.filterClasses, // filterClasses 추가
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
      <button
        onClick={scrollLeft}
        className="absolute w-10 h-10 left-[-20px] top-1/4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
      >
        {'<'}
      </button>

      <div
        ref={scrollContainerRef}
        className="flex gap-5 overflow-x-scroll hide-scrollbar custom-scrollbar pr-5"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {filteredClasses &&
          filteredClasses.map((classItem) => (
            <div key={classItem.id} style={{ scrollSnapAlign: 'start' }}>
              <ClassCard classItem={classItem} />
            </div>
          ))}
      </div>

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
