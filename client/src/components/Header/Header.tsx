import "./Header.scss";
import Hamburger from "hamburger-react";
import magnifyingGlass from "../../assets/images/icons/magnifying-glass.svg";
import { useState } from "react";

// TODO
// - Add page links to routes
// - Set max width container for tablet and desktop with margin auto

const Header: React.FC = () => {
  const [isOpen, setOpen] = useState(false);

  // Click Handlers

  const handleClickOverlay = (): void => {
    setOpen(false);
  };

  return (
    <div className="header__box-max-width">
      <header className="header">
        <div className="header__box-left">
          <div className="header__hamburger">
            <Hamburger toggled={isOpen} toggle={setOpen} size={24} />
          </div>
          <h1 className="header__logo">CloseReader</h1>
        </div>
        <div className="header__box-right">
          <ul className="header__nav-list--desk">
            <li className="header__nav-item--desk">Authors</li>
            <li className="header__nav-item--desk">Poems</li>
            <li className="header__nav-item--desk">Collections</li>
          </ul>
          <img
            src={magnifyingGlass}
            alt="magnifying glass"
            className="header__mag-icon"
          />
        </div>
      </header>
      {/* Mobile/Tablet Menu and Overlay*/}
      {isOpen && (
        <>
          <div className="header__popout-menu">
            <ul className="header__nav-list">
              <li className="header__nav-item">Authors</li>
              <li className="header__nav-item--2">Poems</li>
              <li className="header__nav-item--3">Collections</li>
            </ul>
          </div>
          <a onClick={handleClickOverlay} href="">
            <div className="header__overlay"></div>
          </a>
        </>
      )}
    </div>
  );
};

export default Header;
