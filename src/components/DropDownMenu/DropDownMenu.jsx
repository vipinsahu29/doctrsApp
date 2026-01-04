import { Menu, MenuButton, MenuItem, MenuItems, useClose } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
DropDownMenu.propTypes = {
  options: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
};
export default function DropDownMenu({ options = "options", values = [] }) {
  const close = useClose();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className="sm: mx-5 md:mx-2">
        <MenuButton
          key={options}
          className="inline-flex md:w-full sm: w-40  justify-center gap-x-2.5 rounded-md bg-gray-800 px-2 py-2 text-sm font-semibold text-white ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-yellow-400 hover:text-gray-900"
        >
          {options}
          <ChevronDownIcon
            aria-hidden="true"
            className="-mr-1 size-5 text-white"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute left-0 z-10 right-0 w-40 mt-1 origin-top-right rounded-md bg-gray-900 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-2">
          {values.map((items) => (
            <MenuItem key={items.name}>
              <Link
                to={items.path}
                onClick={() => close()}
                className="block px-3 py-2 text-sm text-white data-focus:bg-gray-300 data-focus:text-gray-900 data-focus:outline-hidden hover:bg-yellow-400 hover:text-gray-900"
              >
                {items.name}
              </Link>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
}
