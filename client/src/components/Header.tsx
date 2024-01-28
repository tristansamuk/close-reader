import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import SearchBar from "./SearchBar";
import Hamburger from "hamburger-react";

const Header: React.FC = () => {
  // Click handler for hamburger to display menu
  return (
    <header className="flex h-20 items-center justify-between border-b border-gray-500 px-4">
      <div className="container-left flex flex-row items-center gap-4 ">
        <Hamburger size={24} />
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
