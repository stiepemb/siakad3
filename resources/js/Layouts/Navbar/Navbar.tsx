import { useState } from 'react';

interface NavbarProps {
    setActiveMenu: (menu: string | null) => void;
}

export default function Navbar({ setActiveMenu }: NavbarProps) {
    const [openMenu, setOpenMenu] = useState<string | null>(null);

    const menuItems = {
        ['Data Master']: {
            children: ['Mahasiswa', 'Dosen', 'Prodi', 'Jurusan'],
        },
        PMB: {
            children: ['Pendaftaran', 'Seleksi', 'Daftar Ulang'],
        },
        Akademik: {
            children: ['Perkuliahan', 'Nilai', 'KRS', 'Jadwal'],
        },
        Kemahasiswaan: {
            children: ['Organisasi', 'Beasiswa', 'Prestasi'],
        },
        Keuangan: {
            children: ['Pembayaran', 'Tagihan', 'Riwayat'],
        },
        Settings: {
            children: ['Users', 'Roles', 'Permissions'],
        },
    };

    const handleMenuClick = (menu: string) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    const handleSubMenuClick = (subMenu: string) => {
        setActiveMenu(subMenu);
        console.log(subMenu);
    };

    return (
        <>
            <nav className="border-t border-gray-200 py-4 dark:border-gray-700">
                <div className="flex items-center justify-evenly gap-8 px-4 py-2 md:px-6 2xl:px-11">
                    {Object.entries(menuItems).map(([menu, { children }]) => (
                        <div className="relative" key={menu}>
                            <button
                                onClick={() => handleMenuClick(menu)}
                                className="flex items-center gap-1 text-sm font-medium text-gray-700 transition-all hover:text-secondary dark:text-gray-200 dark:hover:text-blue-400"
                            >
                                {menu}
                                <svg
                                    className={`h-4 w-4 transition-transform duration-200 ${
                                        openMenu === menu ? 'rotate-180' : ''
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            {openMenu === menu && (
                                <div className="absolute left-0 top-full mt-1 w-48 rounded-sm border border-stroke bg-white py-3 shadow-default dark:border-strokedark dark:bg-boxdark">
                                    {children.map((subMenu) => (
                                        <button
                                            key={subMenu}
                                            onClick={() =>
                                                handleSubMenuClick(subMenu)
                                            }
                                            className="flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-secondary dark:text-gray-200 dark:hover:bg-meta-4 dark:hover:text-blue-400"
                                        >
                                            {subMenu}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </nav>
        </>
    );
}
