interface SidebarItemProps {
    item: string;
    pageName: string;
    setPageName: (name: string) => void;
}

const SidebarItem = ({ item, pageName, setPageName }: SidebarItemProps) => {
    const handleClick = () => {
        if (item) {
            setPageName(item.toLowerCase());
        }
    };

    return (
        <li
            className={`cursor-pointer ${
                pageName === item.toLowerCase() ? 'active' : ''
            }`}
            onClick={handleClick}
        >
            {item}
        </li>
    );
};

export default SidebarItem;
