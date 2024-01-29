const SearchBar: React.FC = () => {
  return (
    <>
      <label>
        <input
          name="search"
          className="search-bar__input"
          type="text"
          placeholder="Search..."
        />
      </label>
    </>
  );
};
export default SearchBar;
