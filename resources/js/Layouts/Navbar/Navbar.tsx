import { useEffect, useRef, useState } from 'react';
import { IconType } from 'react-icons';
import { MdKeyboardArrowDown } from 'react-icons/md';

interface NavItem {
    name: string;
    icon?: IconType;
    dropdownItems?: Array<{
        name: string;
    }>;
}

interface NavbarProps {
    navItems: NavItem[];
    onNavItemClick: (itemName: string, dropdownName?: string) => void;
    onMenuClick: () => void;
}

export const Navbar = ({ navItems, onNavItemClick }: NavbarProps) => {
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setActiveDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleDropdownClick = (itemName: string) => {
        setActiveDropdown(activeDropdown === itemName ? null : itemName);
    };

    const handleDropdownItemClick = (
        navItemName: string,
        dropdownItemName: string,
    ) => {
        setActiveDropdown(null);
        onNavItemClick(navItemName, dropdownItemName);
    };

    return (
        <nav className="sticky top-0 z-30 flex justify-evenly bg-white py-6 shadow dark:bg-gray-800">
            <div className="px-4">
                <div className="flex items-center justify-between">
                    <div className="flex space-x-4" ref={dropdownRef}>
                        {navItems.map((item) => (
                            <div key={item.name} className="relative">
                                <button
                                    onClick={() =>
                                        handleDropdownClick(item.name)
                                    }
                                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-secondary dark:text-gray-200"
                                >
                                    {item.icon && (
                                        <item.icon className="mr-2 h-4 w-4" />
                                    )}
                                    {item.name}
                                    {item.dropdownItems && (
                                        <MdKeyboardArrowDown
                                            className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                                                activeDropdown === item.name
                                                    ? 'rotate-180'
                                                    : ''
                                            }`}
                                        />
                                    )}
                                </button>
                                {item.dropdownItems &&
                                    activeDropdown === item.name && (
                                        <div className="absolute left-0 mt-2 w-48 rounded-md bg-white py-2 shadow-lg transition-all duration-300 ease-in-out dark:bg-gray-700">
                                            {item.dropdownItems.map(
                                                (dropdownItem) => (
                                                    <button
                                                        key={dropdownItem.name}
                                                        onClick={() =>
                                                            handleDropdownItemClick(
                                                                item.name,
                                                                dropdownItem.name,
                                                            )
                                                        }
                                                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-primary dark:text-gray-200"
                                                    >
                                                        {dropdownItem.name}
                                                    </button>
                                                ),
                                            )}
                                        </div>
                                    )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};
