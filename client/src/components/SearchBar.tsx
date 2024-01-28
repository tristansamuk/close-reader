const SearchBar: React.FC = () => {
  return (
    <>
      <label>
        <input
          name="search"
          className="bg-magnifying-glass hidden h-7 rounded-md border border-solid border-black bg-left bg-no-repeat md:inline"
          type="text"
          placeholder="    Search..."
        />
      </label>
    </>
  );
};
export default SearchBar;
