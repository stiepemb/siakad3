import { AiOutlineCloudSync } from 'react-icons/ai';
import { BsDatabaseLock } from 'react-icons/bs';
import { FaUniversity } from 'react-icons/fa';
import { GrMoney } from 'react-icons/gr';
import { PiStudentDuotone, PiUsersFourDuotone } from 'react-icons/pi';
import { VscSettings } from 'react-icons/vsc';

export const navItems = [
    {
        name: 'Data Master',
        icons: <BsDatabaseLock />,
        dropDownItems: [
            {
                name: 'Mahasiswa',
                sidebarItems: [
                    {
                        name: 'Daftar Mahasiswa',
                        route: '/data-master/daftar-mahasiswa',
                    },
                    {
                        name: 'Calon Wisuda',
                        route: '/data-master/calon-wisuda',
                    },
                ],
            },
            {
                name: 'Dosen',
                sidebarItems: [
                    {
                        name: 'Daftar Dosen',
                        route: '/data-master/daftar-dosen',
                    },
                    {
                        name: 'Calon Wisuda',
                        route: '/data-master/calon-wisuda',
                    },
                ],
            },
        ],
    },
    {
        name: 'PMB',
        icons: <PiUsersFourDuotone />,
        dropDownItems: [
            {
                name: 'Pendaftaran Ulang',
                sidebarItems: [
                    {
                        name: 'Daftar Mahasiswa',
                        route: '/pmb/pendaftaran-ulang',
                    },
                    {
                        name: 'Calon Wisuda',
                        route: '/pmb/pendaftaran-ulang',
                    },
                ],
            },
        ],
    },
    {
        name: 'Akademik',
        icons: <FaUniversity />,
        dropDownItems: [
            {
                name: 'Tahun Akademik',
                sidebarItems: [
                    {
                        name: 'Daftar Tahun Akademik',
                        route: '/akademik/tahun-akademik',
                    },
                    {
                        name: 'Jadwal Kuliah',
                        route: '/akademik/tahun-akademik/jadwal-kuliah',
                    },
                ],
            },
        ],
    },
    {
        name: 'Kemahasiswaan',
        icons: <PiStudentDuotone />,
        dropDownItems: [
            {
                name: 'BEM',
                sidebarItems: [
                    {
                        name: 'Daftar BEM',
                        route: '/kemahasiswaan/bem',
                    },
                ],
            },
        ],
    },
    {
        name: 'Feeder',
        icons: <AiOutlineCloudSync />,
        dropDownItems: [
            {
                name: 'Daftar Feeder',
                sidebarItems: [
                    {
                        name: 'Daftar Feeder',
                        route: '/feeder/daftar-feeder',
                    },
                ],
            },
        ],
    },
    {
        name: 'Keuangan',
        icons: <GrMoney />,
        dropDownItems: [
            {
                name: 'Daftar Keuangan',
                sidebarItems: [
                    {
                        name: 'Daftar Keuangan',
                        route: '/keuangan/daftar-keuangan',
                    },
                ],
            },
        ],
    },
    {
        name: 'Settings',
        icons: <VscSettings />,
        dropDownItems: [
            {
                name: 'Roles',
                sidebarItems: [
                    {
                        name: 'Hak Akses',
                        route: '/settings/system/users/permissions',
                    },
                    { name: 'Roles', route: '/settings/system/users/roles' },
                ],
            },
        ],
    },
];
