import SearchBar from "./SearchBar";
import Hamburger from "hamburger-react";
import magnifyingGlass from "../assets/images/icons/magnifying-glass.svg";

const Header: React.FC = () => {
  // Click handler for hamburger to display menu
  return (
    <header className="flex h-20 items-center justify-between border-b border-gray-500 px-4">
      <div className="container-left flex flex-row items-center gap-4 ">
        <Hamburger size={24} />
        <h1 className="inline-block ">CloseReader</h1>
      </div>
      <img src="./assets/images/" alt="" />
      <div className="container-right flex w-fit flex-row">
        <img src={magnifyingGlass} className="h-6 w-6 md:hidden" />
        <SearchBar />
      </div>
    </header>
  );
};

export default Header;
