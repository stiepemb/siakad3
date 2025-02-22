import { Link } from '@inertiajs/react';
import { FaUniversity } from 'react-icons/fa';
interface SidebarItem {
    name: string;
    route: string;
}

interface SidebarProps {
    sideItems: SidebarItem[];
}

export default function Sidebar({ sideItems }: SidebarProps) {
    return (
        <aside className="z-60 sticky top-0 w-72 overflow-y-auto border-r border-gray-100 bg-white dark:border-gray-800 dark:bg-boxdark">
            <div className="flex h-full flex-col">
                {/* Header Sidebar */}
                <div className="flex items-center justify-between px-4 py-6">
                    <div className="flex items-center gap-2">
                        <FaUniversity className="h-8 w-8" />
                        <h1 className="text-xl font-bold">SIAKAD v3</h1>
                    </div>
                </div>

                {/* Sidebar Navigation */}
                <nav className="flex-1 overflow-y-auto px-4 py-6">
                    <ul className="space-y-3">
                        {sideItems.map((item) => {
                            const isActive = location.pathname.startsWith(
                                item.route,
                            );
                            return (
                                <li key={item.name}>
                                    <Link
                                        href={item.route}
                                        className={`group flex items-center rounded-xl p-3 text-sm font-medium transition-all duration-200 ${
                                            isActive
                                                ? 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400'
                                                : 'text-gray-700 hover:bg-gray-100/80 dark:text-gray-300 dark:hover:bg-gray-800/50'
                                        }`}
                                    >
                                        <span>{item.name}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </aside>
    );
}
