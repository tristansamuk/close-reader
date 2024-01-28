import { HamburgerMenuIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import SearchBar from "./SearchBar";

const Header: React.FC = () => {
  return (
    <header className="h-20 border-b border-gray-500 flex justify-between items-center px-4">
      <div className="header__container--left flex flex-row gap-4 items-center w-fit">
        <HamburgerMenuIcon className="h-5 w-5" />
        <h1 className="inline-block ">CloseReader</h1>
      </div>
      <div className="header__container--right flex flex-row w-fit">
        <MagnifyingGlassIcon className="md:hidden h-6 w-6" />
        <SearchBar />
      </div>
    </header>
  );
};

export default Header;
