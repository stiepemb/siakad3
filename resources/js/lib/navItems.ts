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
    link: string;
    sidebarItems?: string[];
}

interface NavItem {
    name: string;
    link: string;
    icon?: IconType;
    dropdownItems?: DropdownItem[];
}

export const navItems: NavItem[] = [
    {
        name: 'PMB',
        link: '/pmb',
        icon: FaUserGraduate,
        dropdownItems: [
            {
                name: 'Pendaftaran',
                link: '/pmb/pendaftaran',
                sidebarItems: [
                    'Form Pendaftaran Baru',
                    'Upload Berkas',
                    'Cetak Formulir',
                    'Jadwal Ujian',
                    'Pembayaran Pendaftaran',
                ],
            },
            {
                name: 'Status',
                link: '/pmb/status',
                sidebarItems: [
                    'Status Pendaftaran',
                    'Hasil Seleksi',
                    'Pengumuman Kelulusan',
                    'Daftar Ulang',
                ],
            },
        ],
    },
    {
        name: 'Data Master',
        link: '/data-master',
        icon: FaDatabase,
        dropdownItems: [
            {
                name: 'Mahasiswa',
                link: '/data-master/mahasiswa',
                sidebarItems: [
                    'Data Pribadi',
                    'Riwayat Akademik',
                    'Dokumen Mahasiswa',
                    'Status Aktif',
                ],
            },
            {
                name: 'Dosen',
                link: '/data-master/dosen',
                sidebarItems: [
                    'Data Pribadi Dosen',
                    'Riwayat Mengajar',
                    'Penelitian',
                    'Jadwal Mengajar',
                ],
            },
            {
                name: 'Mata Kuliah',
                link: '/data-master/mata-kuliah',
                sidebarItems: [
                    'Daftar Mata Kuliah',
                    'Silabus',
                    'Materi Kuliah',
                    'Jadwal Kuliah',
                ],
            },
        ],
    },
    {
        name: 'Akademik',
        link: '/akademik',
        icon: FaGraduationCap,
        dropdownItems: [
            { name: 'Jadwal Kuliah', link: '/akademik/jadwal-kuliah' },
            { name: 'Nilai', link: '/akademik/nilai' },
        ],
    },
    {
        name: 'Kemahasiswaan',
        link: '/kemahasiswaan',
        icon: FaUsers,
        dropdownItems: [
            { name: 'Aktivitas', link: '/kemahasiswaan/aktivitas' },
            { name: 'Organisasi', link: '/kemahasiswaan/organisasi' },
        ],
    },
    {
        name: 'Feeder',
        link: '/feeder',
        icon: FaSync,
        dropdownItems: [
            { name: 'Jadwal Kuliah', link: '/feeder/jadwal-kuliah' },
            { name: 'Nilai', link: '/feeder/nilai' },
        ],
    },
    {
        name: 'Keuangan',
        link: '/keuangan',
        icon: FaMoneyBillWave,
    },
    {
        name: 'Settings',
        link: '/settings',
        icon: FaCog,
    },
];
