import DarkModeSwitcher from './DarkModeSwitcher';
import DropdownNotification from './DropdownNotification';
import DropdownUser from './DropdownUser';

interface HeaderProps {
    sidebarOpen: boolean;
    setSidebarOpen: (arg: boolean) => void;
    user: string;
    userRole: string;
    avatar: string | undefined | File;
}

const Header = (props: HeaderProps) => {
    return (
        <>
            <header className="sticky top-0 z-999 flex flex-col bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
                <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
                    <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
                        {/* <!-- Hamburger Toggle BTN --> */}
                        <button
                            aria-controls="sidebar"
                            onClick={(e) => {
                                e.stopPropagation();
                                props.setSidebarOpen(!props.sidebarOpen);
                            }}
                            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
                        >
                            <span className="relative block h-5.5 w-5.5 cursor-pointer">
                                <span className="du-block absolute right-0 h-full w-full">
                                    <span
                                        className={`delay-[0] relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                                            !props.sidebarOpen &&
                                            '!w-full delay-300'
                                        }`}
                                    ></span>
                                    <span
                                        className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                                            !props.sidebarOpen &&
                                            'delay-400 !w-full'
                                        }`}
                                    ></span>
                                    <span
                                        className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                                            !props.sidebarOpen &&
                                            '!w-full delay-500'
                                        }`}
                                    ></span>
                                </span>
                                <span className="absolute right-0 h-full w-full rotate-45">
                                    <span
                                        className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                                            !props.sidebarOpen &&
                                            '!delay-[0] !h-0'
                                        }`}
                                    ></span>
                                    <span
                                        className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                                            !props.sidebarOpen &&
                                            '!h-0 !delay-200'
                                        }`}
                                    ></span>
                                </span>
                            </span>
                        </button>
                        {/* <!-- Hamburger Toggle BTN --> */}
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
            </header>
        </>
    );
};

export default Header;
