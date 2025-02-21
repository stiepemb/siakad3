import { Link } from '@inertiajs/react';
import Navbar from '../Navbar/Navbar';
import DarkModeSwitcher from './DarkModeSwitcher';
import DropdownNotification from './DropdownNotification';
import DropdownUser from './DropdownUser';

interface HeaderProps {
    user: string;
    userRole: string;
    avatar: string | undefined | File;
    navItems: any;
    activeMenu: string | null;
    handleDropdownClick: (dropDownName: string) => void;
}

const Header = (props: HeaderProps) => {
    return (
        <>
            <div className="sticky top-0 z-999">
                <header className="flex flex-col border-b bg-white dark:bg-boxdark">
                    <div className="flex flex-grow items-center justify-between px-4 py-6 md:px-6 2xl:px-11">
                        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
                            {/* <!-- Hamburger Toggle BTN --> */}
                            <button
                                aria-controls="sidebar"
                                className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
                            >
                                <span className="relative block h-5.5 w-5.5 cursor-pointer">
                                    <span className="du-block absolute right-0 h-full w-full">
                                        <span
                                            className={`delay-[0] relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black duration-200 ease-in-out dark:bg-white`}
                                        ></span>
                                        <span
                                            className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white`}
                                        ></span>
                                        <span
                                            className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white`}
                                        ></span>
                                    </span>
                                    <span className="absolute right-0 h-full w-full rotate-45">
                                        <span
                                            className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white`}
                                        ></span>
                                        <span
                                            className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white`}
                                        ></span>
                                    </span>
                                </span>
                            </button>
                            {/* <!-- Hamburger Toggle BTN --> */}
                        </div>
                        <div className="flex w-full items-center justify-between gap-2">
                            <div>
                                <Link href={route('dashboard')}>
                                    <p className="text-2xl font-semibold text-primary dark:text-white">
                                        SIAKAD v3 - Halo, {props.user}
                                    </p>
                                </Link>
                            </div>
                            <div className="ml-auto flex items-center gap-3 2xsm:gap-7">
                                <ul className="flex items-center gap-2 2xsm:gap-4">
                                    <DarkModeSwitcher />
                                    <DropdownNotification />
                                </ul>
                                <div className="block sm:hidden">
                                    <span className="text-xs sm:text-base">
                                        {props.user}
                                    </span>
                                </div>
                                <div className="hidden sm:block">
                                    <span className="text-xs dark:text-gray sm:text-base">
                                        {props.user} - {props.userRole}
                                    </span>
                                </div>
                                <DropdownUser />
                            </div>
                        </div>
                    </div>
                </header>
                <Navbar
                    navItems={props.navItems}
                    activeMenu={props.activeMenu}
                    handleDropdownClick={props.handleDropdownClick}
                />
            </div>
        </>
    );
};

export default Header;
