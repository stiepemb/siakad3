interface SelectFieldProps {
    label?: string;
    id: string;
    name: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string | number; label: string }[];
    errors?: string;
    placeholder?: string;
}

export default function SelectField({
    label,
    id,
    name,
    value,
    onChange,
    options,
    errors,
    placeholder = 'Pilih opsi',
}: SelectFieldProps) {
    return (
        <div>
            <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
                {label}
            </label>
            <select
                name={name}
                id={id}
                value={value}
                onChange={onChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm duration-300 focus:border-primary focus:border-transparent focus:ring-2 focus:ring-primary focus:ring-opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {errors && (
                <div className="mt-1 text-sm text-red-600">{errors}</div>
            )}
        </div>
    );
}
