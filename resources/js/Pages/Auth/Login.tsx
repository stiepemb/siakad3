import Banner from '@/Components/Form/Banner';
import InputField from '@/Components/Form/InputField';
import Loader from '@/Components/Form/Loader';
import SelectField from '@/Components/Form/SelectField';
import SubmitButton from '@/Components/Form/SubmitButton';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        role: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    const options = [
        {
            label: 'Super Admin',
            value: 'superadmin',
        },
        {
            label: 'Admin',
            value: 'admin',
        },
        {
            label: 'Dosen',
            value: 'dosen',
        },
        {
            label: 'Mahasiswa',
            value: 'mahasiswa',
        },
    ];

    return (
        <>
            <Head>
                <title>Login</title>
                <meta
                    name="description"
                    content="
            Ini adalah halaman login dari website Sistem Skripsi dan Kerja Praktek (SKKP) dari Sekolah Tinggi Teknologi Indonesia Tanjung Pinang (STTI Tanjung Pinang)
            "
                />
            </Head>
            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
            <div className="relative flex h-screen bg-gray-100 dark:bg-gray-900">
                <Banner />
                <div className="sm:20 w-full p-8 md:p-52 lg:w-1/2 lg:p-36">
                    <h1 className="mb-4 text-2xl font-semibold text-primary dark:text-white">
                        Login
                    </h1>
                    <form onSubmit={submit}>
                        <InputField
                            id="email"
                            inputType="email"
                            label="Email"
                            name="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            errors={errors.email}
                        />
                        <InputField
                            id="password"
                            inputType="password"
                            label="Password"
                            name="password"
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            errors={errors.password}
                        />

                        <SelectField
                            id="role"
                            label="Login sebagai"
                            name="role"
                            value={data.role}
                            onChange={(e) => setData('role', e.target.value)}
                            options={options}
                        />

                        <div className="mb-6 mt-2 text-primary dark:text-white">
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="hover:underline dark:text-white"
                                >
                                    Lupa password?
                                </Link>
                            )}
                        </div>

                        <SubmitButton title="Login" disabled={processing} />
                    </form>
                    <div className="mt-6 text-center text-primary dark:text-white">
                        <Link
                            href={route('register')}
                            className="hover:underline dark:text-white"
                        >
                            Belum punya akun? Daftar disini
                        </Link>
                    </div>
                </div>
                <Loader processing={processing} />
            </div>
        </>
    );
}
