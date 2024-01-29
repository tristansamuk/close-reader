import SearchBar from "../SearchBar/SearchBar.tsx";
import Hamburger from "hamburger-react";
import magnifyingGlass from "../../assets/images/icons/magnifying-glass.svg";

const Header: React.FC = () => {
  // Click handler for hamburger to display menu
  return (
    <header className="header">
      <div className="header__box-left">
        <Hamburger size={24} />
        <h1 className="header__logo">CloseReader</h1>
      </div>
      <div className="header__box-right">
        <img
          src={magnifyingGlass}
          alt="magnifying glass"
          className="header__mag-icon"
        />
        <SearchBar />
      </div>
    </header>
  );
};

export default Header;
