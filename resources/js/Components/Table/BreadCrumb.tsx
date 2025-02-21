import { Link } from '@inertiajs/react';

export default function BreadCrumb({ pathnames }: { pathnames: string[] }) {
    const formatBreadcrumbName = (name: string) => {
        const cleanName = name.split('?')[0];

        return cleanName
            .replace(/-/g, ' ')
            .replace(/\b\w/g, (char) => char.toUpperCase());
    };

    return (
        <>
            <nav
                className="mb-4 ml-auto flex w-fit rounded-lg border border-gray-200 bg-gray-50 px-5 py-3 text-gray-700 dark:border-gray-700 dark:bg-gray-800"
                aria-label="Breadcrumb"
            >
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    {/* Link ke Home */}
                    <li className="inline-flex items-center">
                        <Link
                            href="/dashboard"
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

                    {/* Dynamic Breadcrumb */}
                    {pathnames.length > 0 && (
                        <>
                            <svg
                                className="mx-2 h-3 w-3 text-gray-400"
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

                            {/* Ambil segmen terakhir dan sebelum terakhir */}
                            {(() => {
                                const lastSegment =
                                    pathnames[pathnames.length - 1]; // Segmen terakhir
                                const secondLastSegment =
                                    pathnames[pathnames.length - 2]; // Segmen sebelum terakhir

                                const formattedLast =
                                    formatBreadcrumbName(lastSegment);
                                const formattedSecondLast = secondLastSegment
                                    ? formatBreadcrumbName(secondLastSegment)
                                    : '';

                                const showSecondLast = lastSegment === 'create'; // Jika "create", tampilkan sebelum terakhir

                                return (
                                    <>
                                        {showSecondLast && (
                                            <>
                                                <Link
                                                    href={`/${pathnames
                                                        .slice(
                                                            0,
                                                            pathnames.length -
                                                                1,
                                                        )
                                                        .join('/')}`}
                                                    className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                                                >
                                                    {formattedSecondLast}
                                                </Link>

                                                <svg
                                                    className="mx-2 h-3 w-3 text-gray-400"
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
                                            </>
                                        )}

                                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            {formattedLast}
                                        </span>
                                    </>
                                );
                            })()}
                        </>
                    )}
                </ol>
            </nav>
        </>
    );
}
