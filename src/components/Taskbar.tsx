import { useState, useEffect, useRef } from 'react'
import { useDesktopStore } from '../store/desktopStore'
import { getTaskbarApps, apps } from '../config/apps'
import StartMenu from './StartMenu'
import WidgetsPanel from './WidgetsPanel'

// Icon paths for taskbar
const iconPaths: Record<string, string> = {
    about: '/portfolio/icons/about.ico',
    projects: '/portfolio/icons/projects.ico',
    experience: '/portfolio/icons/experience.ico',
    skills: '/portfolio/icons/skills.ico',
    contact: '/portfolio/icons/contact.ico',
    resume: '/portfolio/icons/resume.ico',
    terminal: '/portfolio/icons/terminal.ico',
    github: '/portfolio/icons/explorer.ico',
}

export default function Taskbar() {
    const { windows, isStartMenuOpen, toggleStartMenu, focusWindow, restoreWindow, minimizeWindow } = useDesktopStore()
    const [currentTime, setCurrentTime] = useState(new Date())
    const [isWidgetsOpen, setIsWidgetsOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const taskbarApps = getTaskbarApps()
    const searchInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus()
        }
        if (!isSearchOpen) setSearchQuery('')
    }, [isSearchOpen])

    const formatTime = (date: Date) => date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    const formatDate = (date: Date) => date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })

    const handleAppClick = (appId: string) => {
        const app = apps.find(a => a.id === appId)
        if (!app) return

        const existingWindow = windows.find(w => w.id === appId)
        if (existingWindow) {
            if (existingWindow.isMinimized) {
                restoreWindow(appId)
            } else {
                const { focusedWindowId } = useDesktopStore.getState()
                if (focusedWindowId === appId) {
                    minimizeWindow(appId)
                } else {
                    focusWindow(appId)
                }
            }
        } else {
            useDesktopStore.getState().openWindow(appId, app.title, app.icon, app.component)
        }
    }

    const handleSearchClick = () => {
        setIsSearchOpen(!isSearchOpen)
        setIsWidgetsOpen(false)
        if (isStartMenuOpen) useDesktopStore.getState().closeStartMenu()
    }

    const handleWidgetsClick = () => {
        setIsWidgetsOpen(!isWidgetsOpen)
        setIsSearchOpen(false)
        if (isStartMenuOpen) useDesktopStore.getState().closeStartMenu()
    }

    const handleStartClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        toggleStartMenu()
        setIsSearchOpen(false)
        setIsWidgetsOpen(false)
    }

    const isAppOpen = (appId: string) => windows.some(w => w.id === appId && !w.isMinimized)
    const isAppInTaskbar = (appId: string) => windows.some(w => w.id === appId)

    // Filter apps based on search
    const filteredApps = searchQuery
        ? apps.filter(app => app.title.toLowerCase().includes(searchQuery.toLowerCase()))
        : apps.slice(0, 6)

    return (
        <>
            <StartMenu />
            <WidgetsPanel isOpen={isWidgetsOpen} onClose={() => setIsWidgetsOpen(false)} />

            {/* Search Panel - Windows 11 Style with bottom search field */}
            {isSearchOpen && (
                <>
                    <div className="fixed inset-0 z-[9997]" onClick={() => setIsSearchOpen(false)} />
                    <div
                        className="fixed bottom-14 left-1/2 -translate-x-1/2 w-[calc(100vw-16px)] sm:w-[480px] md:w-[620px] max-h-[70vh] sm:max-h-[520px] rounded-xl z-[9998] overflow-hidden flex flex-col"
                        style={{
                            background: 'rgba(243,243,243,0.98)',
                            backdropFilter: 'blur(40px)',
                            border: '1px solid rgba(0,0,0,0.1)',
                            boxShadow: '0 16px 48px rgba(0,0,0,0.2)',
                        }}
                    >
                        {/* Top Apps Section */}
                        <div className="flex-1 overflow-auto">
                            <div className="px-4 sm:px-5 py-3 sm:py-4">
                                <h3 className="text-xs text-black/50 mb-2 sm:mb-3 font-medium">{searchQuery ? 'SEARCH RESULTS' : 'TOP APPS'}</h3>
                                <div className="grid grid-cols-4 sm:grid-cols-6 gap-1">
                                    {filteredApps.map(app => (
                                        <button
                                            key={app.id}
                                            onClick={() => { handleAppClick(app.id); setIsSearchOpen(false) }}
                                            className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-black/[0.04] transition-colors"
                                        >
                                            <img src={iconPaths[app.id] || '/portfolio/icons/explorer.ico'} alt={app.title} className="w-10 h-10" />
                                            <span className="text-[10px] text-black/70">{app.title}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Access / Recent */}
                            <div className="px-5 py-4 border-t border-black/[0.06]">
                                <h3 className="text-xs text-black/50 mb-3 font-medium">RECENT</h3>
                                <div className="space-y-1">
                                    <button
                                        onClick={() => { handleAppClick('resume'); setIsSearchOpen(false) }}
                                        className="w-full flex items-center gap-3 p-2.5 rounded-md hover:bg-black/[0.04] transition-colors text-left"
                                    >
                                        <img src="/portfolio/icons/resume.ico" alt="Resume" className="w-8 h-8" />
                                        <div className="flex-1">
                                            <p className="text-sm text-black/80">CV_Islem_Gharsallah.pdf</p>
                                            <p className="text-[11px] text-black/40">Recently opened</p>
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => { handleAppClick('projects'); setIsSearchOpen(false) }}
                                        className="w-full flex items-center gap-3 p-2.5 rounded-md hover:bg-black/[0.04] transition-colors text-left"
                                    >
                                        <img src="/portfolio/icons/projects.ico" alt="Projects" className="w-8 h-8" />
                                        <div className="flex-1">
                                            <p className="text-sm text-black/80">Hyperion Analytics AI</p>
                                            <p className="text-[11px] text-black/40">Latest project</p>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Search Bar - Windows 11 Style */}
                        <div className="p-4 border-t border-black/[0.08] bg-white/50">
                            <div className="flex items-center gap-3 bg-white rounded-full px-4 py-3 border border-black/10 shadow-sm focus-within:border-[#0078d4] focus-within:ring-2 focus-within:ring-[#0078d4]/20 transition-all">
                                <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" className="text-black/40">
                                    <path d="M8.5 3a5.5 5.5 0 014.383 8.823l4.147 4.147a.75.75 0 01-1.06 1.06l-4.147-4.147A5.5 5.5 0 118.5 3zm0 1.5a4 4 0 100 8 4 4 0 000-8z" />
                                </svg>
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search"
                                    className="flex-1 bg-transparent outline-none text-sm text-black placeholder:text-black/40"
                                    autoFocus
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Taskbar - Windows 11 Light Theme */}
            <div className="fixed bottom-0 left-0 right-0 h-12 z-[9999]">
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'rgba(243,243,243,0.85)',
                        backdropFilter: 'blur(30px) saturate(180%)',
                        borderTop: '1px solid rgba(0,0,0,0.06)',
                    }}
                />

                <div className="relative h-full flex items-center justify-center px-2">
                    {/* Center Section */}
                    <div className="flex items-center">
                        {/* Start */}
                        <button
                            onClick={handleStartClick}
                            className={`w-10 h-10 flex items-center justify-center rounded-lg mx-px transition-all duration-75 ${isStartMenuOpen ? 'bg-black/[0.08]' : 'hover:bg-black/[0.04] active:scale-95'}`}
                            title="Start"
                        >
                            <img src="/portfolio/icons/start.ico" alt="Start" className="w-6 h-6" />
                        </button>

                        {/* Search - Hidden text on mobile */}
                        <button
                            onClick={handleSearchClick}
                            className={`h-8 flex items-center gap-2 rounded-full mx-1 px-2 sm:px-3 transition-all duration-75 bg-white border border-black/10 shadow-sm ${isSearchOpen ? 'ring-2 ring-[#0078d4]' : 'hover:bg-white/80'}`}
                            title="Search"
                        >
                            <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" className="text-black/40">
                                <path d="M8.5 3a5.5 5.5 0 014.383 8.823l4.147 4.147a.75.75 0 01-1.06 1.06l-4.147-4.147A5.5 5.5 0 118.5 3zm0 1.5a4 4 0 100 8 4 4 0 000-8z" />
                            </svg>
                            <span className="hidden sm:inline text-xs text-black/40 pr-4 md:pr-8">Search</span>
                        </button>

                        {/* Task View - Hidden on small mobile */}
                        <button
                            className="hidden sm:flex w-10 h-10 items-center justify-center rounded-lg mx-px hover:bg-black/[0.04] active:scale-95 transition-all duration-75"
                            title="Task View"
                        >
                            <img src="/portfolio/icons/taskview.ico" alt="Task View" className="w-6 h-6" />
                        </button>

                        {/* Widgets - Hidden on small mobile */}
                        <button
                            onClick={handleWidgetsClick}
                            className={`hidden sm:flex w-10 h-10 items-center justify-center rounded-lg mx-px transition-all duration-75 ${isWidgetsOpen ? 'bg-black/[0.08]' : 'hover:bg-black/[0.04] active:scale-95'}`}
                            title="Widgets"
                        >
                            <img src="/portfolio/icons/widgets.ico" alt="Widgets" className="w-6 h-6" />
                        </button>

                        <div className="hidden sm:block w-px h-6 bg-black/10 mx-2" />

                        {/* Pinned Apps */}
                        {taskbarApps.map(app => {
                            const isOpen = isAppOpen(app.id)
                            const isInTaskbar = isAppInTaskbar(app.id)

                            return (
                                <button
                                    key={app.id}
                                    onClick={() => handleAppClick(app.id)}
                                    className={`relative w-10 h-10 flex items-center justify-center rounded-lg mx-px transition-all duration-75 ${isOpen ? 'bg-black/[0.08]' : 'hover:bg-black/[0.04] active:scale-95'}`}
                                    title={app.title}
                                >
                                    <img src={iconPaths[app.id] || '/portfolio/icons/explorer.ico'} alt={app.title} className="w-6 h-6" />
                                    {isInTaskbar && (
                                        <div className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[3px] rounded-full transition-all ${isOpen ? 'w-4 bg-[#0078d4]' : 'w-1 bg-black/30'}`} />
                                    )}
                                </button>
                            )
                        })}

                        {/* Dynamic Windows */}
                        {windows.filter(w => !taskbarApps.find(a => a.id === w.id)).map(w => (
                            <button
                                key={w.id}
                                onClick={() => w.isMinimized ? restoreWindow(w.id) : focusWindow(w.id)}
                                className={`relative w-10 h-10 flex items-center justify-center rounded-lg mx-px transition-all duration-75 ${!w.isMinimized ? 'bg-black/[0.08]' : 'hover:bg-black/[0.04]'}`}
                                title={w.title}
                            >
                                <img src={iconPaths[w.id] || '/portfolio/icons/explorer.ico'} alt={w.title} className="w-6 h-6" />
                                <div className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[3px] rounded-full ${!w.isMinimized ? 'w-4 bg-[#0078d4]' : 'w-1 bg-black/30'}`} />
                            </button>
                        ))}
                    </div>

                    {/* Right Section - System Tray */}
                    <div className="absolute right-2 flex items-center text-black/80">
                        <button className="p-1.5 rounded hover:bg-black/[0.04] transition-colors">
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" className="opacity-60">
                                <path d="M8 0l2 2L8 4 6 2l2-2zM2 6l2-2 2 2-2 2-2-2zm12 0l-2 2-2-2 2-2 2 2zM8 12l2 2-2 2-2-2 2-2zm-4-2l2-2 2 2-2 2-2-2zm8 0l-2 2-2-2 2-2 2 2z" />
                            </svg>
                        </button>

                        {/* Hidden on mobile: WiFi icons */}
                        <div className="hidden sm:flex items-center gap-1 px-2 py-1.5 rounded hover:bg-black/[0.04] cursor-pointer transition-colors">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="opacity-60">
                                <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
                            </svg>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="opacity-60">
                                <path d="M7 10l5 5 5-5H7z" />
                            </svg>
                        </div>

                        <div className="flex flex-col items-end px-2 py-1 rounded hover:bg-black/[0.04] cursor-pointer transition-colors">
                            <span className="text-[11px] leading-tight">{formatTime(currentTime)}</span>
                            <span className="text-[11px] text-black/50 leading-tight">{formatDate(currentTime)}</span>
                        </div>

                        <button className="w-1.5 h-10 hover:bg-black/[0.06] rounded-r transition-colors" title="Show desktop" />
                    </div>
                </div>
            </div>
        </>
    )
}
