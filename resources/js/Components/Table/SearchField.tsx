import { VscSearchFuzzy } from 'react-icons/vsc';

interface SearchField {
    onSubmit: (e: React.FormEvent) => void;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchField({
    onSubmit,
    value,
    onChange,
}: SearchField) {
    return (
        <>
            <div className="py-4">
                <div className="flex items-center justify-end">
                    <form onSubmit={onSubmit} className="flex gap-2">
                        <input
                            type="text"
                            name="search"
                            value={value}
                            onChange={onChange}
                            placeholder="Cari..."
                            className="rounded-md border border-gray-300 px-4 py-2 text-sm outline-none duration-300 focus:border-transparent focus:ring-2 focus:ring-primary focus:ring-opacity-50 dark:border-gray-700 dark:bg-boxdark dark:text-white md:w-150"
                        />
                        <button
                            type="submit"
                            className="rounded-md bg-primary px-4 py-2 text-white duration-300 hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                        >
                            <VscSearchFuzzy
                                size={20}
                                className="font-semibold"
                            />
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
