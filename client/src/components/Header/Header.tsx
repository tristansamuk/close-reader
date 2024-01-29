import "./Header.scss";
import Hamburger from "hamburger-react";
import magnifyingGlass from "../../assets/images/icons/magnifying-glass.svg";
import { useState } from "react";
import { Link } from "react-router-dom";

// TODO
// - Add page links to routes
// - Set max width container for tablet and desktop with margin auto

const Header: React.FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  // Click Handlers

  const handleClickAway = (): void => {
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
            <li className="header__nav-item--desk">
              <Link to={"authors"}>Authors</Link>
            </li>
            <li className="header__nav-item--desk">
              <Link to={"poems"}>Poems</Link>
            </li>
            <li className="header__nav-item--desk">
              <Link to={"collections"}>Collections</Link>
            </li>
          </ul>
          <Link to={"search"}>
            <img
              src={magnifyingGlass}
              alt="magnifying glass"
              className="header__mag-icon"
            />
          </Link>
        </div>
      </header>
      {/* Mobile/Tablet Menu and Overlay*/}
      {isOpen && (
        <>
          <div className="header__popout-menu">
            <ul className="header__nav-list">
              <li className="header__nav-item">
                <Link onClick={handleClickAway} to={"authors"}>
                  Authors
                </Link>
              </li>
              <li className="header__nav-item--2">
                <Link onClick={handleClickAway} to={"poems"}>
                  Poems
                </Link>
              </li>
              <li className="header__nav-item--3">
                <Link onClick={handleClickAway} to={"collections"}>
                  Collections
                </Link>
              </li>
            </ul>
          </div>
          <a onClick={handleClickAway} href="">
            <div className="header__overlay"></div>
          </a>
        </>
      )}
    </div>
  );
};

export default Header;
