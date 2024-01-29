import "./Header.scss";
import Hamburger from "hamburger-react";
import magnifyingGlass from "../../assets/images/icons/magnifying-glass.svg";
import { useState } from "react";

const Header: React.FC = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <header className="header">
        <div className="header__box-left">
          <Hamburger toggled={isOpen} toggle={setOpen} size={24} />
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
      {/* Popout Menu */}
      {isOpen && (
        <>
          <div className="header__popout-menu">
            <ul className="header__nav-list">
              <li className="header__nav-item">Authors</li>
              <li className="header__nav-item--2">Poems</li>
              <li className="header__nav-item--3">Collections</li>
            </ul>
          </div>
          <div className="header__overlay"></div>
        </>
      )}
    </>
  );
};

export default Header;
