import SearchField from './SearchField';

interface TableHeader {
    children?: React.ReactNode;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    justify?: string;
    showSearch?: boolean;
}

export default function TableHeader({
    children,
    value,
    onChange,
    onSubmit,
    justify = 'justify-between',
    showSearch = true,
}: TableHeader) {
    return (
        <div className={`flex items-center gap-4 ${justify}`}>
            <div className="flex items-center gap-2">{children}</div>

            {showSearch && (
                <SearchField
                    onChange={onChange}
                    onSubmit={onSubmit}
                    value={value}
                />
            )}
        </div>
    );
}
