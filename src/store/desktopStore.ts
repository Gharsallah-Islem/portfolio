import { create } from 'zustand'

export interface WindowState {
    id: string
    title: string
    icon: string
    component: string
    isMinimized: boolean
    isMaximized: boolean
    zIndex: number
    position: { x: number; y: number }
    size: { width: number; height: number }
}

interface DesktopStore {
    windows: WindowState[]
    focusedWindowId: string | null
    isStartMenuOpen: boolean
    nextZIndex: number

    openWindow: (id: string, title: string, icon: string, component: string) => void
    closeWindow: (id: string) => void
    minimizeWindow: (id: string) => void
    maximizeWindow: (id: string) => void
    restoreWindow: (id: string) => void
    focusWindow: (id: string) => void
    updateWindowPosition: (id: string, position: { x: number; y: number }) => void
    updateWindowSize: (id: string, size: { width: number; height: number }) => void
    toggleStartMenu: () => void
    closeStartMenu: () => void
}

// Helper to detect mobile devices
const isMobileDevice = () => {
    if (typeof window === 'undefined') return false
    return window.innerWidth <= 768 ||
        ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0)
}

export const useDesktopStore = create<DesktopStore>((set, get) => ({
    windows: [],
    focusedWindowId: null,
    isStartMenuOpen: false,
    nextZIndex: 100,

    openWindow: (id, title, icon, component) => {
        const { windows, nextZIndex } = get()
        const existingWindow = windows.find(w => w.id === id)

        if (existingWindow) {
            // If window exists, just focus it
            get().focusWindow(id)
            if (existingWindow.isMinimized) {
                get().restoreWindow(id)
            }
            return
        }

        // Detect if mobile - auto maximize on mobile devices
        const isMobile = isMobileDevice()

        // Create new window with centered position
        const newWindow: WindowState = {
            id,
            title,
            icon,
            component,
            isMinimized: false,
            isMaximized: isMobile, // Auto-maximize on mobile
            zIndex: nextZIndex,
            position: isMobile ? { x: 0, y: 0 } : { x: 100 + (windows.length * 30), y: 50 + (windows.length * 30) },
            size: { width: 900, height: 600 }
        }

        set({
            windows: [...windows, newWindow],
            focusedWindowId: id,
            nextZIndex: nextZIndex + 1,
            isStartMenuOpen: false
        })
    },

    closeWindow: (id) => {
        set(state => ({
            windows: state.windows.filter(w => w.id !== id),
            focusedWindowId: state.focusedWindowId === id ? null : state.focusedWindowId
        }))
    },

    minimizeWindow: (id) => {
        set(state => ({
            windows: state.windows.map(w =>
                w.id === id ? { ...w, isMinimized: true } : w
            ),
            focusedWindowId: state.focusedWindowId === id ? null : state.focusedWindowId
        }))
    },

    maximizeWindow: (id) => {
        set(state => ({
            windows: state.windows.map(w =>
                w.id === id ? { ...w, isMaximized: true } : w
            )
        }))
    },

    restoreWindow: (id) => {
        const { nextZIndex } = get()
        set(state => ({
            windows: state.windows.map(w =>
                w.id === id ? { ...w, isMinimized: false, isMaximized: false, zIndex: nextZIndex } : w
            ),
            focusedWindowId: id,
            nextZIndex: nextZIndex + 1
        }))
    },

    focusWindow: (id) => {
        const { nextZIndex } = get()
        set(state => ({
            windows: state.windows.map(w =>
                w.id === id ? { ...w, zIndex: nextZIndex } : w
            ),
            focusedWindowId: id,
            nextZIndex: nextZIndex + 1,
            isStartMenuOpen: false
        }))
    },

    updateWindowPosition: (id, position) => {
        set(state => ({
            windows: state.windows.map(w =>
                w.id === id ? { ...w, position } : w
            )
        }))
    },

    updateWindowSize: (id, size) => {
        set(state => ({
            windows: state.windows.map(w =>
                w.id === id ? { ...w, size } : w
            )
        }))
    },

    toggleStartMenu: () => {
        set(state => ({ isStartMenuOpen: !state.isStartMenuOpen }))
    },

    closeStartMenu: () => {
        set({ isStartMenuOpen: false })
    }
}))
