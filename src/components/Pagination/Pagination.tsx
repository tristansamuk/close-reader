import "./Pagination.scss";

type Props = {
  poemsPerPage: number;
  totalPoems: number;
  setCurrentPage: any;
  currentPage: number;
};

const Pagination = ({
  poemsPerPage,
  totalPoems,
  setCurrentPage,
  currentPage,
}: Props) => {
  let pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(totalPoems / poemsPerPage); i++) {
    pageNumbers.push(i);
  }
  const lastPage = pageNumbers.length;

  return (
    <div className="pagination__container">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        className={
          currentPage === 1
            ? "pagination__nav-button--inactive"
            : "pagination__nav-button"
        }
      >
        {"<"}
      </button>
      {pageNumbers.map((number) => {
        return (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={
              number === currentPage
                ? "pagination__page-number--active"
                : "pagination__page-number"
            }
          >
            {number}
          </button>
        );
      })}
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        className={
          currentPage === lastPage
            ? "pagination__nav-button--inactive"
            : "pagination__nav-button"
        }
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
