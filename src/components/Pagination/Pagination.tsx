type Props = {
  poemsPerPage: number;
  totalPoems: number;
  setCurrentPage: any;
};

const Pagination = ({ poemsPerPage, totalPoems, setCurrentPage }: Props) => {
  let pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(totalPoems / poemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination__container--maxwidth">
      <ul>
        {pageNumbers.map((number) => {
          return (
            <button key={number} onClick={() => setCurrentPage(number)}>
              {number}
            </button>
          );
        })}
      </ul>
    </div>
  );
};

export default Pagination;
