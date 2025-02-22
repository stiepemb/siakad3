import { ReactNode } from 'react';
import { BiSortDown, BiSortUp } from 'react-icons/bi';
import TableFooter from './TableFooter';

interface TableProps {
    title?: string;
    description?: string;
    icon?: ReactNode;
    columns: {
        label: string;
        accessor: string;
    }[];
    data: any;
    actions?: (item: any) => ReactNode;
    meta?: {
        current_page: number;
        last_page: number;
        from: number;
        to: number;
        total: number;
        per_page: number;
        sort_field?: string;
        sort_direction?: string;
    };
    search?: string;
    notFoundTitle?: string;
    notFoundDescription?: string;
    onPerPageChange?: (perPage: number) => void;
    perPageOptions?: number[];
    onSort?: (field: string) => void;
    sortable?: string[];
}

export default function Table({
    title,
    description,
    icon,
    columns,
    data,
    actions,
    meta,
    search,
    notFoundTitle,
    notFoundDescription,
    onPerPageChange,
    perPageOptions = [5, 10, 25, 50, 100],
    onSort,
    sortable = [],
}: TableProps) {
    const handleSort = (field: string) => {
        if (onSort) {
            onSort(field);
        }
    };

    const currentSortField = meta?.sort_field;
    const currentSortDirection = meta?.sort_direction;

    return (
        <div className="relative overflow-hidden rounded-xl border bg-white shadow-md dark:border-0 dark:bg-boxdark">
            {(title || description) && (
                <div className="flex items-center justify-between border-b bg-white p-6 dark:border-0 dark:bg-boxdark">
                    <div>
                        {(title || icon) && (
                            <div className="flex items-center gap-2">
                                {icon}
                                {title && (
                                    <p className="text-xl font-semibold text-gray-900 dark:text-white">
                                        {title}
                                    </p>
                                )}
                            </div>
                        )}
                        {description && (
                            <p className="mt-2 text-sm text-gray-500 dark:text-white">
                                {description}
                            </p>
                        )}
                    </div>

                    {onPerPageChange && (
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500 dark:text-white">
                                Show
                            </span>
                            <select
                                className="w-20 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 dark:border-gray-600 dark:bg-boxdark dark:text-white"
                                value={meta?.per_page}
                                onChange={(e) => {
                                    e.preventDefault();
                                    onPerPageChange(Number(e.target.value));
                                }}
                            >
                                {perPageOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                            <span className="text-sm text-gray-500 dark:text-white">
                                entries
                            </span>
                        </div>
                    )}
                </div>
            )}
            <table className="w-full text-left text-sm dark:text-white">
                <thead>
                    <tr className="border-b dark:border-0 dark:bg-boxdark">
                        <th
                            scope="col"
                            className="px-6 py-4 font-semibold text-gray-900 dark:text-white"
                        >
                            NO
                        </th>
                        {columns.map((column, index) => (
                            <th
                                key={index}
                                scope="col"
                                className={`px-6 py-4 font-semibold text-gray-900 dark:text-white ${
                                    sortable.includes(column.accessor)
                                        ? 'cursor-pointer select-none'
                                        : ''
                                }`}
                                onClick={() =>
                                    sortable.includes(column.accessor) &&
                                    handleSort(column.accessor)
                                }
                            >
                                <div className="flex items-center gap-2">
                                    {column.label}
                                    {sortable.includes(column.accessor) && (
                                        <div className="flex flex-col">
                                            {currentSortField ===
                                            column.accessor ? (
                                                currentSortDirection ===
                                                'asc' ? (
                                                    <BiSortUp className="text-primary" />
                                                ) : (
                                                    <BiSortDown className="text-primary" />
                                                )
                                            ) : (
                                                <div className="flex flex-col opacity-30">
                                                    <BiSortUp className="-mb-1" />
                                                    <BiSortDown className="-mt-1" />
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </th>
                        ))}
                        {actions && (
                            <th
                                scope="col"
                                className="px-6 py-4 font-semibold text-gray-900 dark:text-white"
                            >
                                AKSI
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {data.length === 0 ? (
                        <tr>
                            <td
                                colSpan={
                                    actions
                                        ? columns.length + 2
                                        : columns.length + 1
                                }
                                className="text-center"
                            >
                                <div className="flex flex-col items-center justify-center py-16 dark:border-strokedark">
                                    <img
                                        src="/images/empty-state.svg"
                                        alt="Not Found"
                                        className="h-36 w-36"
                                    />

                                    <p className="mb-1 text-lg font-semibold text-gray-500 dark:text-white">
                                        {notFoundTitle}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-white">
                                        {notFoundDescription}
                                    </p>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        data.map((item, index) => (
                            <tr
                                key={index}
                                className="hover:bg-gray-50 dark:hover:bg-boxdark"
                            >
                                <td className="px-6 py-4 text-gray-600 dark:text-white">
                                    {meta
                                        ? meta.per_page *
                                              (meta.current_page - 1) +
                                          index +
                                          1
                                        : index + 1}
                                </td>
                                {columns.map((column, colIndex) => (
                                    <td
                                        key={colIndex}
                                        className="px-6 py-4 text-gray-600 dark:text-white"
                                    >
                                        {item[column.accessor]}
                                    </td>
                                ))}
                                {actions && (
                                    <>
                                        <td className="px-6 py-4">
                                            {Array.isArray(actions)
                                                ? actions.map(
                                                      (action, index) => (
                                                          <span key={index}>
                                                              {action(item)}
                                                          </span>
                                                      ),
                                                  )
                                                : actions(item)}
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            {meta && data.length > 0 && (
                <TableFooter
                    data={{
                        data,
                        current_page: meta.current_page,
                        last_page: meta.last_page,
                        from: meta.from,
                        to: meta.to,
                        total: meta.total,
                        per_page: meta.per_page,
                        sort_field: meta.sort_field,
                        sort_direction: meta.sort_direction,
                    }}
                    from={meta.from}
                    to={meta.to}
                    total={meta.total}
                    search={search}
                />
            )}
        </div>
    );
}
