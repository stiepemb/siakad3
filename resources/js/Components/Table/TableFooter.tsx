import Pagination from './Pagination';

interface TableFooter {
    data: {
        data: unknown[];
        current_page: number;
        last_page: number;
        from: number;
        to: number;
        total: number;
        per_page: number;
        sort_field?: string;
        sort_direction?: string;
    };
    from: number;
    to: number;
    total: number;
    search?: string;
}

export default function TableFooter({
    data,
    from,
    to,
    total,
    search,
}: TableFooter) {
    return (
        <>
            <div className="flex items-center justify-between px-4">
                <div className="w-80 rounded-md bg-primary px-3 py-2">
                    <p className="text-center text-xs font-medium text-white dark:text-white">
                        Menampilkan {from} - {to} dari {total} data
                    </p>
                </div>
                <Pagination data={data} search={search} />
            </div>
        </>
    );
}
