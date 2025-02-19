interface InputField {
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    id: string;
    name: string;
    inputType: string;
    mb?: string;
    labelColor?: string;
    errors?: string;
    mt?: string;
    placeholder?: string;
    readOnly?: boolean;
}

export default function InputField({
    value,
    onChange,
    label,
    id,
    name,
    inputType,
    mb = 'mb-5',
    mt = '',
    labelColor = 'text-gray-600',
    errors,
    placeholder,
    readOnly = false,
}: InputField) {
    return (
        <>
            <div className={`${mb} ${mt}`}>
                <label
                    htmlFor="name"
                    className={`block ${labelColor} text-sm dark:text-white`}
                >
                    {label}
                </label>
                <input
                    readOnly={readOnly}
                    type={inputType}
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2 duration-500 focus:border-primary focus:border-opacity-50 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    autoComplete="off"
                    value={value}
                    onChange={onChange}
                />
                {errors && (
                    <p className="mt-1 text-sm text-red-500">{errors}</p>
                )}
            </div>
        </>
    );
}
