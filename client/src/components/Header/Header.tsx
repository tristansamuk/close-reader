import "./Header.scss";
import Hamburger from "hamburger-react";
import magnifyingGlass from "../../assets/images/icons/magnifying-glass.svg";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  // Click Handlers

  const handleClickMenu = (): void => {
    setOpen(false);
  };

  const handleClickOverlay = (e: any): void => {
    e.preventDefault();
    setOpen(false);
  };

  return (
    <div className="header__max-width-container">
      <header className="header">
        <div className="header__container-left">
          <div className="header__hamburger">
            <Hamburger toggled={isOpen} toggle={setOpen} size={24} />
          </div>
          <Link onClick={handleClickMenu} to={"/"}>
            <h1 className="header__logo">close reader</h1>
          </Link>
        </div>
        <div className="header__container-right">
          {/* Desktop Navigation Menu */}
          <ul className="header__nav-list--desk">
            <li className="header__nav-item--desk">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="header__nav-item--desk">
              <Link to={"poets"}>Poets</Link>
            </li>
            <li className="header__nav-item--desk">
              <Link to={"poems"}>Poems</Link>
            </li>
            <li className="header__nav-item--desk">
              <Link to={"collections"}>Collections</Link>
            </li>
          </ul>
          <Link onClick={handleClickMenu} to={"search"}>
            <img
              src={magnifyingGlass}
              alt="magnifying glass"
              className="header__mag-icon"
            />
          </Link>
        </div>
      </header>
      {/* Mobile/Tablet Navigation Menu and Overlay*/}
      {isOpen && (
        <div>
          <div className="header__popout-menu">
            <ul className="header__nav-list">
              <li className="header__nav-item">
                <Link onClick={handleClickMenu} to={"/"}>
                  Home
                </Link>
              </li>
              <li className="header__nav-item--3">
                <Link onClick={handleClickMenu} to={"poets"}>
                  Poets
                </Link>
              </li>
              <li className="header__nav-item--3">
                <Link onClick={handleClickMenu} to={"poems"}>
                  Poems
                </Link>
              </li>
              <li className="header__nav-item--4">
                <Link onClick={handleClickMenu} to={"collections"}>
                  Collections
                </Link>
              </li>
            </ul>
          </div>
          <a onClick={handleClickOverlay} href="">
            <div className="header__overlay"></div>
          </a>
        </div>
      )}
    </div>
  );
};

export default Header;
