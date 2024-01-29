import "./Header.scss";
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
        {/* Search Bar */}
        <label>
          <input
            name="search"
            className="header__search"
            type="text"
            placeholder="Search..."
          />
        </label>
      </div>
    </header>
  );
};

export default Header;
