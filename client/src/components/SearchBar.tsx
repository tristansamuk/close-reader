import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { TextField } from "@radix-ui/themes";

const SearchBar: React.FC = () => {
  return (
    <div className="hidden md:inline-block">
      <TextField.Root>
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
        <TextField.Input placeholder="Search..." />
      </TextField.Root>
    </div>
  );
};
export default SearchBar;
