import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
} from '@headlessui/react';
import React, { Fragment } from 'react';
import { HiChevronDown } from 'react-icons/hi';

export default function Navbar({ navItems, activeMenu, handleDropdownClick }) {
    return (
        <nav className="h-16 w-full bg-white/90 p-4 text-sm text-meta-4 shadow-md backdrop-blur-md dark:bg-boxdark dark:text-white dark:shadow-none dark:backdrop-blur-none">
            <div className="flex h-full items-center justify-evenly">
                <div className="relative flex space-x-4">
                    {navItems.map((item) => {
                        const isActive = activeMenu === item.name;

                        return (
                            <Menu
                                as="div"
                                key={item.name}
                                className="relative inline-block text-nowrap"
                            >
                                <MenuButton
                                    className={`flex items-center gap-2 rounded-md px-4 py-2 ${
                                        isActive
                                            ? 'bg-blue-500 text-white'
                                            : 'hover:bg-gray-200 dark:hover:bg-boxdark dark:hover:text-secondary'
                                    }`}
                                >
                                    {item.icons &&
                                        React.cloneElement(item.icons, {
                                            className: 'h-5 w-5',
                                        })}
                                    {item.name}
                                    <HiChevronDown className="h-5 w-5 transition-transform duration-300" />
                                </MenuButton>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-300"
                                    enterFrom="opacity-0 translate-y-2 scale-95"
                                    enterTo="opacity-100 translate-y-0 scale-100"
                                    leave="transition ease-in duration-200"
                                    leaveFrom="opacity-100 translate-y-0 scale-100"
                                    leaveTo="opacity-0 translate-y-2 scale-95"
                                >
                                    <MenuItems className="absolute left-0 mt-2 w-40 origin-top-left rounded-md bg-white shadow-lg transition-all duration-200 dark:bg-boxdark">
                                        <div className="py-2">
                                            {item.dropDownItems.map(
                                                (dropDown) => (
                                                    <MenuItem
                                                        key={dropDown.name}
                                                    >
                                                        {({ active }) => (
                                                            <button
                                                                className={`block w-full rounded-md px-4 py-2 text-left transition-colors ${
                                                                    active
                                                                        ? 'text-secondary dark:bg-boxdark'
                                                                        : 'text-black dark:text-white'
                                                                }`}
                                                                onClick={() =>
                                                                    handleDropdownClick(
                                                                        dropDown.name,
                                                                    )
                                                                }
                                                            >
                                                                {dropDown.name}
                                                            </button>
                                                        )}
                                                    </MenuItem>
                                                ),
                                            )}
                                        </div>
                                    </MenuItems>
                                </Transition>
                            </Menu>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
