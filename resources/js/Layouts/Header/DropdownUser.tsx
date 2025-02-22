import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { FaSignOutAlt, FaUserAlt } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import ClickOutside from '../ClickOutside';

const DropdownUser = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <ClickOutside
            onClick={() => setDropdownOpen(false)}
            className="relative"
        >
            <Link
                onClick={(e) => {
                    e.preventDefault();
                    setDropdownOpen(!dropdownOpen);
                }}
                className="flex items-center gap-4"
                href="#"
            >
                <div className="h-8 w-8 overflow-hidden rounded-full sm:h-8 sm:w-8">
                    <img
                        src={'https://placehold.co/200x200'}
                        alt="User"
                        className="h-full w-full object-cover"
                    />
                </div>
                <IoIosArrowDown />
            </Link>

            {/* <!-- Dropdown Start --> */}
            {dropdownOpen && (
                <div
                    className={`absolute right-0 z-10 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark`}
                >
                    <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
                        <li>
                            <Link
                                href={route('profile.edit')}
                                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary dark:text-gray dark:hover:text-white lg:text-base"
                            >
                                <FaUserAlt />
                                My Profile
                            </Link>
                        </li>
                    </ul>
                    <Link
                        href={route('logout')}
                        method="post"
                        className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary dark:text-gray dark:hover:text-white lg:text-base"
                    >
                        <FaSignOutAlt />
                        Log Out
                    </Link>
                </div>
            )}
            {/* <!-- Dropdown End --> */}
        </ClickOutside>
    );
};

export default DropdownUser;
