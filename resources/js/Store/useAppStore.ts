import { create } from 'zustand';

interface AppState {
    sideItems: { name: string; route: string }[];
    setSideItems: (items: { name: string; route: string }[]) => void;
    activeMenu: string | null;
    setActiveMenu: (menu: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
    // SET DEFAULT SIDEBAR KE DASHBOARD
    sideItems: [{ name: 'Dashboard', route: '/' }],
    setSideItems: (items) => set({ sideItems: items }),
    activeMenu: 'Dashboard',
    setActiveMenu: (menu) => set({ activeMenu: menu }),
}));
