import React, { useEffect } from 'react';
import useClassStore from '../store/useClassStore';
// import useLikeStore from '../store/useLikeStore';
import ClassCard from '../components/common/ClassCard';

const LikesPage: React.FC = () => {
  // const { classes } = useClassStore();
  // const { likedClasses } = useLikeStore();
  // const likedClassItems =
  //   classes?.filter((classItem) => likedClasses.includes(classItem.id)) || [];

  // const [page, setPage] = useState<number>(1);

  // const classPerPage: number = 4;
  // const indexOfLastClass: number = page * classPerPage;
  // const indexOfFirstClass: number = indexOfLastClass - classPerPage;

  const { filteredClasses, fetchClasses, filterClasses } = useClassStore(
    (state) => ({
      filteredClasses: state.filteredClasses['popular'] || [], // kind에 해당하는 필터링된 데이터, 없으면 빈 배열
      fetchClasses: state.fetchClasses,
      filterClasses: state.filterClasses,
    }),
  );

  useEffect(() => {
    fetchClasses().then(() => {
      filterClasses('popular');
    });
  }, [fetchClasses, filterClasses]);

  // const likeClasses = useMemo(() => {
  //   return filteredClasses.slice(indexOfFirstClass, indexOfLastClass);
  // }, [indexOfFirstClass, indexOfLastClass, filterClasses]);

  // const handlePageChange = (page: number) => {
  //   setPage(page);
  // };

  return (
    <div className="m-[24px] mt-14 flex flex-col justify-center items-center ">
      <h2 className="text-xl font-extrabold w-full text-center ">Likes</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {filteredClasses.map((classItem) => (
          <div className="transform scale-[0.85]">
            <ClassCard tag="popular" classItem={classItem} />
          </div>
        ))}
      </div>
      {/* <Pagination
        activePage={page}
        itemsCountPerPage={classPerPage}
        totalItemsCount={filteredClasses.length}
        pageRangeDisplayed={5}
        prevPageText={'<'}
        nextPageText={'>'}
        onChange={handlePageChange}
        itemClass="pagination-item"
        linkClass="pagination-link"
        activeClass="active"
        activeLinkClass=""
        itemClassFirst="pagination-nav"
        itemClassLast="pagination-nav"
        itemClassPrev="pagination-nav"
        itemClassNext="pagination-nav"
        disabledClass="disabled"
      /> */}
    </div>
  );
};

export default LikesPage;