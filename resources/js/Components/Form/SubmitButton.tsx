interface SubmitButton {
    disabled: boolean;
    title: string;
    width?: string;
    buttonColor?: string;
    focusRingColor?: string;
}

export default function SubmitButton({
    disabled,
    title,
    width = 'w-full',
    buttonColor = 'bg-primary',
    focusRingColor = 'focus:ring-primary',
}: SubmitButton) {
    return (
        <>
            <button
                type="submit"
                disabled={disabled}
                className={`${width} mt-4 rounded-md ${buttonColor} p-2 font-semibold text-white duration-300 hover:bg-opacity-90 focus:outline-none focus:ring-4 ${focusRingColor} focus:ring-opacity-50`}
            >
                {title}
            </button>
        </>
    );
}
