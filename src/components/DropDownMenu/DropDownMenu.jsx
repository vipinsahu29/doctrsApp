import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
DropDownMenu.propTypes = {
    options: PropTypes.string.isRequired ,
    values: PropTypes.array.isRequired
  };
export default function DropDownMenu({options='options',values=[] }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className='sm: mx-5 md:mx-2'>
        <MenuButton key={options} className="inline-flex md:w-full sm: w-40  justify-center gap-x-1.5 rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-500">
          {options}
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-white" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 w-56 origin-top-right rounded-md bg-gray-700 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-3">
        { values.map((items)=>
          <MenuItem key={items.name}>
            <Link
              to={items.path}
              className="block px-4 py-2 text-sm text-white data-focus:bg-gray-400 data-focus:text-gray-900 data-focus:outline-hidden hover:bg-gray-600"
            >
              {items.name}
            </Link>
          </MenuItem>)}
        </div>
      </MenuItems>
    </Menu>
  )
}
