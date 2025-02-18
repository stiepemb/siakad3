import { Link, usePage } from '@inertiajs/react';

interface SidebarDropdownProps {
    item: {
        label: string;
        route: string;
    }[];
}

const SidebarDropdown = ({ item }: SidebarDropdownProps) => {
    const { url } = usePage().props as unknown as { url: string };

    return (
        <>
            <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                {item.map((item, index) => (
                    <li key={index}>
                        <Link
                            href={item.route}
                            className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-primary ${
                                url === item.route ? 'text-black' : ''
                            }`}
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default SidebarDropdown;
