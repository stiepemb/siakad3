import { IconType } from 'react-icons';
import {
    FaCog,
    FaDatabase,
    FaGraduationCap,
    FaMoneyBillWave,
    FaSync,
    FaUserGraduate,
    FaUsers,
} from 'react-icons/fa';

interface DropdownItem {
    name: string;
    sidebarItems?: Array<{
        name: string;
        route: string;
    }>;
}

interface NavItem {
    name: string;
    icon?: IconType;
    dropdownItems?: DropdownItem[];
}

export const navItems: NavItem[] = [
    {
        name: 'PMB',
        icon: FaUserGraduate,
    },
    {
        name: 'Data Master',
        icon: FaDatabase,
        dropdownItems: [
            {
                name: 'Mahasiswa',
            },
            {
                name: 'Dosen',
            },
            {
                name: 'Mata Kuliah',
            },
        ],
    },
    {
        name: 'Akademik',
        icon: FaGraduationCap,
    },
    {
        name: 'Kemahasiswaan',
        icon: FaUsers,
    },
    {
        name: 'Feeder',
        icon: FaSync,
    },
    {
        name: 'Keuangan',
        icon: FaMoneyBillWave,
        dropdownItems: [
            {
                name: 'Pembayaran',
            },
            {
                name: 'Pembayaran',
            },
        ],
    },
    {
        name: 'Settings',
        icon: FaCog,
        dropdownItems: [
            {
                name: 'Hak Akses',
                sidebarItems: [
                    {
                        name: 'Hak Akses',
                        route: route('system.permissions.index'),
                    },
                ],
            },
        ],
    },
];
