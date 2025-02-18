import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { BsTrash } from 'react-icons/bs';
import { GiSecurityGate } from 'react-icons/gi';
export default function PermissionIndex() {
    const exampleData = [
        {
            no: 1,
            id: 421,
            guard: 'web',
            namaHakAkses: 'AKADEMIK-DULANG-AKTIF_BROWSE',
        },
    ];
    return (
        <>
            <AuthenticatedLayout>
                <Head title="Permissions" />
                <Link href={route('system.permissions.create')}>
                    <button className="mb-4 rounded-md bg-blue-500 px-4 py-2 text-white">
                        Tambah Hak Akses
                    </button>
                </Link>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
                        <caption className="bg-white p-5 text-left text-lg font-semibold text-gray-900 dark:bg-gray-800 dark:text-white rtl:text-right">
                            <div className="flex items-center gap-2">
                                <GiSecurityGate />
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Hak Akses
                                </p>
                            </div>
                            <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                                Pengelolaan hak akses user untuk mengatur akses
                                ke menu dan fitur di aplikasi.
                            </p>
                        </caption>
                        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    NO
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    ID
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    NAMA HAK AKSES
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    GUARD
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    AKSI
                                </th>
                            </tr>
                        </thead>
                        {exampleData.map((item) => (
                            <tr key={item.id}>
                                <td className="px-6 py-4">{item.no}</td>
                                <td className="px-6 py-4">{item.id}</td>
                                <td className="px-6 py-4">
                                    {item.namaHakAkses}
                                </td>
                                <td className="px-6 py-4">{item.guard}</td>
                                <td className="px-6 py-4">
                                    <button
                                        className="p-2 text-white"
                                        onClick={() => {
                                            alert('Data berhasil dihapus');
                                        }}
                                    >
                                        <BsTrash className="text-red-500" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
