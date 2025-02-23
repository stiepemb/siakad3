import InputField from '@/Components/Form/InputField';
import SubmitButton from '@/Components/Form/SubmitButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { GiSecurityGate } from 'react-icons/gi';
import Swal from 'sweetalert2';
export default function PermissionCreate() {
    const { data, setData, post, errors, processing } = useForm({
        name: '',
        group: 0,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('system.permissions.store'), {
            onSuccess: () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: `Permission ${data.name} berhasil dibuat`,
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true,
                    position: 'top-right',
                });
            },
        });
    };

    return (
        <>
            <Head title="Buat Hak Akses" />
            <AuthenticatedLayout>
                <div className="mx-auto min-w-full">
                    <div className="rounded-xl border bg-white shadow-md dark:border-none dark:border-boxdark dark:bg-boxdark">
                        <div className="flex items-center justify-between border-b dark:border-none">
                            <div className="border-b p-6 dark:border-boxdark">
                                <div className="flex items-center gap-2">
                                    <GiSecurityGate
                                        className="text-primary dark:text-secondary"
                                        size={24}
                                    />
                                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        Buat Hak Akses Baru
                                    </h1>
                                </div>
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                    Silakan isi form berikut untuk membuat hak
                                    akses baru
                                </p>
                            </div>
                            <Link
                                href={route('system.permissions.index')}
                                className="mx-6 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 focus:duration-300 dark:border-boxdark dark:bg-boxdark-2 dark:text-white"
                            >
                                Kembali
                            </Link>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="overflow-hidden p-6 dark:bg-boxdark"
                        >
                            <div className="space-y-4">
                                <InputField
                                    label="Nama Hak Akses"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    inputType="text"
                                    id="name"
                                    placeholder="Masukkan nama hak akses"
                                    errors={errors.name}
                                />

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="mr-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-0 focus:ring-primary dark:border-boxdark dark:bg-boxdark-2 dark:outline-none dark:focus:ring-secondary dark:focus:ring-opacity-50"
                                        checked={Boolean(data.group)}
                                        onChange={(e) =>
                                            setData(
                                                'group',
                                                Number(e.target.checked),
                                            )
                                        }
                                    />
                                    <label className="text-sm text-gray-700 dark:text-white">
                                        Group
                                    </label>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <SubmitButton
                                    title="Simpan"
                                    disabled={processing}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
