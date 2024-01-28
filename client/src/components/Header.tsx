import { HamburgerMenuIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import SearchBar from "./SearchBar";

const Header: React.FC = () => {
  return (
    <header className="flex h-20 items-center justify-between border-b border-gray-500 px-4">
      <div className="container-left flex flex-row items-center gap-4 ">
        <HamburgerMenuIcon className="h-5 w-5" />
        <h1 className="inline-block ">CloseReader</h1>
      </div>
      <div className="container-right flex w-fit flex-row">
        <MagnifyingGlassIcon className="h-6 w-6 md:hidden" />
        <SearchBar />
      </div>
    </header>
  );
};

export default Header;
