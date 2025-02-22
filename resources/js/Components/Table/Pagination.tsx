import { Link } from '@inertiajs/react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

export default function Pagination({
    data,
    search,
}: {
    data: {
        current_page: number;
        last_page: number;
        from: number;
        to: number;
        total: number;
        per_page?: number;
        sort_field?: string;
        sort_direction?: string;
    };
    search?: string;
}) {
    const getPageUrl = (pageNumber: number | string) => {
        const params = new URLSearchParams();
        params.append('page', pageNumber.toString());
        if (search) {
            params.append('search', search);
        }
        if (data.per_page) {
            params.append('per_page', data.per_page.toString());
        }
        if (data.sort_field) {
            params.append('sort_field', data.sort_field);
        }
        if (data.sort_direction) {
            params.append('sort_direction', data.sort_direction);
        }
        return `?${params.toString()}`;
    };

    const renderPagination = () => {
        const { current_page, last_page } = data;
        const pageNumbers: (number | string)[] = [];
        const maxPagesToShow = 5;

        if (last_page <= maxPagesToShow) {
            for (let i = 1; i <= last_page; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (current_page <= 3) {
                pageNumbers.push(1, 2, 3, 4, '...', last_page);
            } else if (current_page > last_page - 3) {
                pageNumbers.push(
                    1,
                    '...',
                    last_page - 3,
                    last_page - 2,
                    last_page - 1,
                    last_page,
                );
            } else {
                pageNumbers.push(
                    1,
                    '...',
                    current_page - 1,
                    current_page,
                    current_page + 1,
                    '...',
                    last_page,
                );
            }
        }

        return pageNumbers.map((pageNumber, index) => {
            if (pageNumber === '...') {
                return (
                    <span
                        key={`ellipsis-${index}`}
                        className="bg-gray-100 px-3 py-1 text-xs text-gray-500 dark:bg-boxdark-2 dark:text-white"
                    >
                        ...
                    </span>
                );
            }
            return (
                <Link
                    key={`page-${pageNumber}-${index}`}
                    href={getPageUrl(pageNumber)}
                    preserveScroll={true}
                    className={`mx-1 flex h-4 w-4 items-center justify-center rounded-full p-3.5 text-xs ${
                        pageNumber === current_page
                            ? 'border border-primary text-primary dark:border-white dark:text-white'
                            : 'text-primary dark:text-white'
                    }`}
                >
                    {pageNumber}
                </Link>
            );
        });
    };
    return (
        <>
            <div className="mr-6 flex items-center justify-end py-4">
                <Link
                    href={getPageUrl(Math.max(data.current_page - 1, 1))}
                    className={`mx-1 flex h-6 w-6 items-center justify-center rounded-full ${
                        data.current_page === 1
                            ? 'cursor-not-allowed bg-gray-300 text-gray-500'
                            : 'bg-primary text-white'
                    }`}
                    aria-disabled={data.current_page === 1}
                    preserveScroll={true}
                    preserveState={true}
                >
                    <IoIosArrowBack size={20} />
                </Link>
                <div className="flex items-center rounded-full bg-gray-100 px-2 py-1 dark:bg-black">
                    {renderPagination()}
                </div>
                <Link
                    href={getPageUrl(
                        Math.min(data.current_page + 1, data.last_page),
                    )}
                    preserveState={true}
                    className={`mx-1 flex h-6 w-6 items-center justify-center rounded-full ${
                        data.current_page === data.last_page
                            ? 'cursor-not-allowed bg-gray-300 text-gray-500'
                            : 'bg-primary text-white'
                    }`}
                    aria-disabled={data.current_page === data.last_page}
                    preserveScroll={true}
                >
                    <IoIosArrowForward size={20} />
                </Link>
            </div>
        </>
    );
}
