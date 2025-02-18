import { NavItems, SidebarMenus } from '@/types/menuItems';

export const sidebarMenus: SidebarMenus = {
    // Menu sidebar khusus untuk Mahasiswa
    mahasiswa: [
        { label: 'Data Pribadi Mahasiswa', route: '/mahasiswa/data-pribadi' },
        { label: 'Kartu Mahasiswa', route: '/mahasiswa/kartu' },
        { label: 'Transkrip Nilai', route: '/mahasiswa/transkrip' },
        { label: 'Status Akademik', route: '/mahasiswa/status' },
        { label: 'Riwayat Perkuliahan', route: '/mahasiswa/riwayat' },
    ],
    // Menu sidebar khusus untuk Dosen
    dosen: [
        { label: 'Data Pribadi Dosen', route: '/dosen/data-pribadi' },
        { label: 'SK Mengajar', route: '/dosen/sk-mengajar' },
        { label: 'Jadwal Mengajar', route: '/dosen/jadwal' },
        { label: 'Penelitian', route: '/dosen/penelitian' },
        { label: 'Penilaian Kinerja', route: '/dosen/kinerja' },
    ],
    // Menu sidebar khusus untuk Prodi
    prodi: [
        { label: 'Profil Prodi', route: '/prodi/profil' },
        { label: 'Kurikulum', route: '/prodi/kurikulum' },
        { label: 'Daftar Mata Kuliah', route: '/prodi/matakuliah' },
        { label: 'Akreditasi', route: '/prodi/akreditasi' },
    ],
    // Dan seterusnya untuk menu lainnya...
};

export const navItems: NavItems = {
    'Data Master': [
        { label: 'Mahasiswa', route: 'mahasiswa' },
        { label: 'Dosen', route: 'dosen' },
        { label: 'Prodi', route: 'prodi' },
        { label: 'Jurusan', route: 'jurusan' },
    ],
    PMB: [
        { label: 'Pendaftaran', route: '/pendaftaran' },
        { label: 'Seleksi', route: '/seleksi' },
        { label: 'Daftar Ulang', route: '/daftar-ulang' },
    ],
    Akademik: [
        { label: 'Perkuliahan', route: '/perkuliahan' },
        { label: 'Nilai', route: '/nilai' },
        { label: 'KRS', route: '/krs' },
        { label: 'Jadwal', route: '/jadwal' },
    ],
    Kemahasiswaan: [
        { label: 'Organisasi', route: '/organisasi' },
        { label: 'Beasiswa', route: '/beasiswa' },
        { label: 'Prestasi', route: '/prestasi' },
    ],
    Keuangan: [
        { label: 'Pembayaran', route: '/pembayaran' },
        { label: 'Tagihan', route: '/tagihan' },
        { label: 'Riwayat', route: '/riwayat' },
    ],
    'Hak Akses': [
        { label: 'Users', route: '/users' },
        { label: 'Roles', route: '/roles' },
        { label: 'Permissions', route: '/permissions' },
    ],
};
