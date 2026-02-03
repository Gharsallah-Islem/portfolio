import { useRef, useEffect, useState } from 'react'
import { useDesktopStore } from '../store/desktopStore'
import { getStartMenuApps, apps } from '../config/apps'
import gsap from 'gsap'

// Icon paths for Start Menu
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

// Windows 11 Search Icon
const SearchIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="opacity-50">
        <path d="M6.5 1C9.538 1 12 3.462 12 6.5c0 1.248-.422 2.396-1.126 3.318l3.904 3.893-.707.707-3.904-3.893A5.473 5.473 0 016.5 12C3.462 12 1 9.538 1 6.5S3.462 1 6.5 1zm0 1C4.015 2 2 4.015 2 6.5S4.015 11 6.5 11 11 8.985 11 6.5 8.985 2 6.5 2z" />
    </svg>
)

export default function StartMenu() {
    const { isStartMenuOpen, closeStartMenu, openWindow } = useDesktopStore()
    const menuRef = useRef<HTMLDivElement>(null)
    const startMenuApps = getStartMenuApps()
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        if (menuRef.current) {
            if (isStartMenuOpen) {
                gsap.fromTo(menuRef.current,
                    { y: 20, opacity: 0, scale: 0.96 },
                    { y: 0, opacity: 1, scale: 1, duration: 0.2, ease: 'power2.out' }
                )
            }
        }
        if (!isStartMenuOpen) setSearchQuery('')
    }, [isStartMenuOpen])

    const handleAppClick = (appId: string) => {
        const app = apps.find(a => a.id === appId)
        if (!app) return

        if (appId === 'github') {
            window.open('https://github.com/Gharsallah-Islem', '_blank')
        } else {
            openWindow(appId, app.title, app.icon, app.component)
        }
        closeStartMenu()
    }

    const filteredApps = searchQuery
        ? startMenuApps.filter(app => app.title.toLowerCase().includes(searchQuery.toLowerCase()))
        : startMenuApps

    if (!isStartMenuOpen) return null

    return (
        <>
            <div className="fixed inset-0 z-[9998]" onClick={closeStartMenu} />

            <div
                ref={menuRef}
                className="fixed bottom-14 left-1/2 -translate-x-1/2 w-[640px] rounded-xl overflow-hidden z-[9999]"
                style={{
                    background: 'rgba(32,32,32,0.96)',
                    backdropFilter: 'blur(40px) saturate(180%)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    boxShadow: '0 32px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset',
                }}
            >
                {/* Search Bar */}
                <div className="p-5 pb-3">
                    <div className="flex items-center gap-3 bg-[#383838] rounded-full px-4 py-2.5 border border-white/[0.05] focus-within:border-[#60cdff] transition-colors">
                        <SearchIcon />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Type to search"
                            className="flex-1 bg-transparent text-sm outline-none placeholder:text-white/40"
                        />
                    </div>
                </div>

                {/* Pinned Section */}
                <div className="px-6 py-4">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold">Pinned</h3>
                        <button className="text-xs text-white/50 hover:text-white hover:bg-white/[0.08] px-3 py-1.5 rounded-md transition-colors flex items-center gap-1">
                            All apps
                            <span className="text-[10px]">→</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-6 gap-1">
                        {filteredApps.map(app => (
                            <button
                                key={app.id}
                                onClick={() => handleAppClick(app.id)}
                                className="flex flex-col items-center gap-2 p-3 rounded-md hover:bg-white/[0.06] active:bg-white/[0.04] active:scale-[0.98] transition-all"
                            >
                                <img src={iconPaths[app.id] || '/portfolio/icons/explorer.ico'} alt={app.title} className="w-9 h-9" />
                                <span className="text-[11px] text-white/80 truncate w-full text-center">{app.title}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Recommended Section */}
                <div className="px-6 py-4 border-t border-white/[0.06]">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold">Recommended</h3>
                        <button className="text-xs text-white/50 hover:text-white hover:bg-white/[0.08] px-3 py-1.5 rounded-md transition-colors">
                            More →
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-1">
                        <button
                            onClick={() => handleAppClick('resume')}
                            className="flex items-center gap-3 p-2.5 rounded-md hover:bg-white/[0.06] transition-colors text-left"
                        >
                            <img src="/portfolio/icons/resume.ico" alt="Resume" className="w-10 h-10" />
                            <div>
                                <p className="text-sm">CV_Islem_Gharsallah.pdf</p>
                                <p className="text-[11px] text-white/40">Recently opened</p>
                            </div>
                        </button>
                        <button
                            onClick={() => handleAppClick('projects')}
                            className="flex items-center gap-3 p-2.5 rounded-md hover:bg-white/[0.06] transition-colors text-left"
                        >
                            <img src="/portfolio/icons/projects.ico" alt="Projects" className="w-10 h-10" />
                            <div>
                                <p className="text-sm">Hyperion Analytics AI</p>
                                <p className="text-[11px] text-white/40">Latest project</p>
                            </div>
                        </button>
                        <button
                            onClick={() => { window.open('https://github.com/Gharsallah-Islem', '_blank'); closeStartMenu() }}
                            className="flex items-center gap-3 p-2.5 rounded-md hover:bg-white/[0.06] transition-colors text-left"
                        >
                            <img src="/portfolio/icons/explorer.ico" alt="GitHub" className="w-10 h-10" />
                            <div>
                                <p className="text-sm">GitHub Profile</p>
                                <p className="text-[11px] text-white/40">26 repositories</p>
                            </div>
                        </button>
                        <button
                            onClick={() => handleAppClick('terminal')}
                            className="flex items-center gap-3 p-2.5 rounded-md hover:bg-white/[0.06] transition-colors text-left"
                        >
                            <img src="/portfolio/icons/terminal.ico" alt="Terminal" className="w-10 h-10" />
                            <div>
                                <p className="text-sm">Terminal</p>
                                <p className="text-[11px] text-white/40">Try 'neofetch' command!</p>
                            </div>
                        </button>
                    </div>
                </div>

                {/* User Section */}
                <div className="px-6 py-3 bg-black/20 flex items-center justify-between border-t border-white/[0.04]">
                    <div className="flex items-center gap-3">
                        <img
                            src="/portfolio/profile.jpg"
                            alt="Islem Gharsallah"
                            className="w-9 h-9 rounded-full object-cover shadow-lg ring-2 ring-[#60cdff]/30"
                        />
                        <span className="text-sm">Islem Gharsallah</span>
                    </div>
                    <button
                        className="p-2.5 rounded-md hover:bg-white/[0.08] transition-colors"
                        title="Power options"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="opacity-70">
                            <path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z" />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    )
}
