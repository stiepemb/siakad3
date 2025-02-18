import InputField from '@/Components/Form/InputField';
import SubmitButton from '@/Components/Form/SubmitButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import toast from 'react-hot-toast';

export default function PermissionCreate() {
    const { data, setData, post, errors, processing } = useForm({
        name: '',
        group: null,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('system.permissions.store'), {
            onSuccess: () => {
                toast.success('Permission created successfully');
            },
            onError: () => {
                toast.error('Permission creation failed');
            },
        });
    };

    return (
        <>
            <AuthenticatedLayout>
                <Head title="Permissions" />
                <form onSubmit={handleSubmit}>
                    <InputField
                        name="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        inputType="text"
                        id="name"
                        errors={errors.name}
                    />
                    <SubmitButton title="Simpan" disabled={processing} />
                </form>
            </AuthenticatedLayout>
        </>
    );
}
