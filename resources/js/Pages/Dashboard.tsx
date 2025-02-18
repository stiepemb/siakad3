import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout processing={false}>
            <Head title="Dashboard" />
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-semibold text-primary dark:text-white">
                    Dashboard
                </h1>
            </div>
        </AuthenticatedLayout>
    );
}
