import Table from '@/Components/Table/Table';
import TableHeader from '@/Components/Table/TableHeader';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import { GiSecurityGate } from 'react-icons/gi';
import Swal from 'sweetalert2';

type Permission = {
    id: number;
    name: string;
    guard_name: string;
};

interface Index {
    dataPermissions: Permission[];
    search: string;
    meta: {
        total: number;
        current_page: number;
        last_page: number;
        per_page: number;
        from: number;
        to: number;
        per_page_options: number[];
        per_page_default: number;
        per_page_label: string;
    };
}
export default function PermissionIndex({
    dataPermissions,
    search,
    meta,
}: Index) {
    const { data, setData, get } = useForm({
        search: search || '',
        per_page: meta.per_page || meta.per_page_default,
        sort_field: '',
        sort_direction: 'asc' as 'asc' | 'desc',
    });

    const [isOpen, setIsOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        get(route('system.permissions.index'), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDelete = (id: number) => {
        setSelectedId(id);
        setIsOpen(true);
    };

    const confirmDelete = () => {
        if (selectedId) {
            setIsOpen(false);
            router.delete(route('system.permissions.destroy', selectedId), {
                onSuccess: () => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil',
                        text: `Permission ${
                            dataPermissions.find(
                                (permission) => permission.id === selectedId,
                            )?.name
                        } berhasil dihapus`,
                        showConfirmButton: false,
                        timer: 1500,
                        toast: true,
                        position: 'top-right',
                        theme: 'light',
                    });
                },
                onError: () => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Gagal',
                        text: `Gagal menghapus permission ${
                            dataPermissions.find(
                                (permission) => permission.id === selectedId,
                            )?.name
                        }`,
                    });
                },
            });
        }
    };

    const handlePerPageChange = (newPerPage: number) => {
        setData((prev) => ({
            ...prev,
            per_page: newPerPage,
        }));

        router.get(
            route('system.permissions.index'),
            {
                search: data.search,
                per_page: newPerPage,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const handleSort = (field: string) => {
        const direction =
            data.sort_field === field && data.sort_direction === 'asc'
                ? 'desc'
                : 'asc';

        setData((prev) => ({
            ...prev,
            sort_field: field,
            sort_direction: direction,
        }));

        router.get(
            route('system.permissions.index'),
            {
                search: data.search,
                per_page: data.per_page,
                sort_field: field,
                sort_direction: direction,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const columns = [
        { label: 'ID', accessor: 'id' },
        { label: 'NAMA HAK AKSES', accessor: 'name' },
        { label: 'GUARD', accessor: 'guard_name' },
    ];

    const actions = [
        (item: Permission) => (
            <button
                key="delete"
                className="rounded-lg p-2 text-red-500 transition-colors hover:bg-red-50 dark:text-red-500 dark:hover:bg-red-500/10"
                onClick={() => handleDelete(item.id)}
            >
                <BsTrash size={18} />
            </button>
        ),
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Hak Akses" />
            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="relative z-50"
            >
                <div
                    className="fixed inset-0 bg-black/50 transition-opacity"
                    aria-hidden="true"
                />
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                                <BsTrash className="h-5 w-5 text-red-600" />
                            </div>
                            <DialogTitle
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900"
                            >
                                Hapus Hak Akses
                            </DialogTitle>
                        </div>

                        <div className="mt-4">
                            <p className="text-sm text-gray-500">
                                Apakah Anda yakin ingin menghapus permission{' '}
                                <span className="font-bold text-red">
                                    {
                                        dataPermissions.find(
                                            (permission) =>
                                                permission.id === selectedId,
                                        )?.name
                                    }
                                </span>
                                ?
                            </p>
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                className="inline-flex w-18 justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                onClick={() => setIsOpen(false)}
                            >
                                Tidak
                            </button>
                            <button
                                type="button"
                                className="inline-flex w-18 justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                onClick={confirmDelete}
                            >
                                Ya
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
            <TableHeader
                value={data.search}
                onChange={(e) =>
                    setData({
                        search: e.target.value,
                        per_page: data.per_page,
                        sort_field: data.sort_field,
                        sort_direction: data.sort_direction,
                    })
                }
                onSubmit={handleSearch}
            >
                <Link
                    href={route('system.permissions.create')}
                    className="flex rounded-md bg-primary px-4 py-2 text-white duration-300 hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                >
                    <AiOutlineUsergroupAdd size={20} className="mr-2" />
                    <p className="text-sm font-semibold">Tambah Hak Akses</p>
                </Link>
            </TableHeader>
            <Table
                title="Hak Akses"
                description="Pengelolaan hak akses user untuk mengatur akses ke menu dan fitur di aplikasi."
                icon={
                    <GiSecurityGate
                        className="text-primary dark:text-white"
                        size={24}
                    />
                }
                columns={columns}
                data={dataPermissions}
                actions={(item) => actions.map((action) => action(item))}
                meta={meta}
                search={search}
                notFoundTitle="Hak akses tidak ditemukan"
                notFoundDescription="Tambahkan hak akses baru untuk mengatur akses ke menu dan fitur di aplikasi."
                onPerPageChange={handlePerPageChange}
                perPageOptions={meta.per_page_options}
                onSort={handleSort}
                sortable={['id', 'name', 'guard_name']}
            />
        </AuthenticatedLayout>
    );
}
