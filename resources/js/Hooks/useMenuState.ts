import { getMenuFromPath } from '@/Constants/menuMapping';
import useLocalStorage from '@/Hooks/useLocalStorage';
import { useEffect } from 'react';

export const useMenuState = () => {
    const [activeMenu, setActiveMenu] = useLocalStorage<string>(
        'activeMenu',
        'Dashboard',
    );

    useEffect(() => {
        const currentPath = window.location.pathname;
        const menuName = getMenuFromPath(currentPath);
        setActiveMenu(menuName);
    }, [setActiveMenu]);

    const updateMenuFromPath = () => {
        const currentPath = window.location.pathname;
        const menuName = getMenuFromPath(currentPath);
        setActiveMenu(menuName);
    };

    return {
        activeMenu,
        setActiveMenu,
        updateMenuFromPath,
    };
};
