import { Link, usePage } from '@inertiajs/react';

export default function BreadCrumb() {
    const currentPath = usePage().url;
    const segments = currentPath.split('/').filter(Boolean);

    // Ambil indeks "permissions"
    const permissionIndex = segments.indexOf('permissions');

    if (permissionIndex === -1) return null;

    const isCreateOrEdit =
        segments.includes('create') || segments.includes('edit');

    return (
        <nav
            className="mx-6 ml-auto mt-4 flex w-fit rounded-lg border border-gray-200 bg-gray-50 px-5 py-3 text-gray-700 dark:border-gray-700 dark:bg-gray-800"
            aria-label="Breadcrumb"
        >
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                    <Link
                        href={route('dashboard')}
                        className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                    >
                        <svg
                            className="me-2.5 h-3 w-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                        </svg>
                        Home
                    </Link>
                </li>

                {/* Permissions */}
                <li className="flex items-center">
                    <svg
                        className="mx-1 block h-3 w-3 text-gray-400 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 9 4-4-4-4"
                        />
                    </svg>
                    <Link
                        href="/settings/system/users/permissions"
                        className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white md:ms-2"
                    >
                        Permissions
                    </Link>
                </li>

                {/* Jika Create/Edit */}
                {isCreateOrEdit && (
                    <li className="flex items-center">
                        <svg
                            className="mx-1 block h-3 w-3 text-gray-400 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 9 4-4-4-4"
                            />
                        </svg>
                        <span className="ms-1 text-sm font-medium text-gray-700 dark:text-gray-400 md:ms-2">
                            {segments.includes('create') ? 'Create' : 'Edit'}
                        </span>
                    </li>
                )}
            </ol>
        </nav>
    );
}
