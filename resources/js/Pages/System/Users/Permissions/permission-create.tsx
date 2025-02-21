import InputField from '@/Components/Form/InputField';
import SubmitButton from '@/Components/Form/SubmitButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { GiSecurityGate } from 'react-icons/gi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function PermissionCreate() {
    const { data, setData, post, errors, processing } = useForm({
        name: '',
        group: 0,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('system.permissions.store'), {
            onSuccess: () => {
                console.log('Success triggered');
                toast.success(`Nama permission berhasil disimpan`, {
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            },
            onError: (errors) => {
                console.log('Error triggered', errors);
                toast.error(`Gagal menyimpan permission ${data.name}`, {
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Buat Hak Akses" />
            <div className="mx-auto min-w-full">
                <div className="rounded-xl border bg-white shadow-md">
                    <div className="flex items-center justify-between border-b">
                        <div className="border-b p-6">
                            <div className="flex items-center gap-2">
                                <GiSecurityGate
                                    className="text-primary"
                                    size={24}
                                />
                                <h1 className="text-xl font-semibold text-gray-900">
                                    Buat Hak Akses Baru
                                </h1>
                            </div>
                            <p className="mt-2 text-sm text-gray-500">
                                Silakan isi form berikut untuk membuat hak akses
                                baru
                            </p>
                        </div>
                        <Link
                            href={route('system.permissions.index')}
                            className="mx-6 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 focus:duration-300"
                        >
                            Kembali
                        </Link>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 p-6">
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
                                    className="mr-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-0 focus:ring-primary"
                                    checked={Boolean(data.group)}
                                    onChange={(e) =>
                                        setData(
                                            'group',
                                            Number(e.target.checked),
                                        )
                                    }
                                />
                                <label>Group</label>
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
    );
}
