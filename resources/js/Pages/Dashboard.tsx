import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout processing={false}>
            <Head title="Dashboard" />
        </AuthenticatedLayout>
    );
}
