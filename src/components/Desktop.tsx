import { useState, useRef, useEffect } from 'react'
import { useDesktopStore } from '../store/desktopStore'
import { getDesktopApps, apps } from '../config/apps'
import WelcomeText from './WelcomeText'

// Icon paths from Windows 11 icon pack
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

interface IconPosition {
    x: number
    y: number
}

interface ContextMenuState {
    visible: boolean
    x: number
    y: number
}

export default function Desktop() {
    const { openWindow } = useDesktopStore()
    const desktopApps = getDesktopApps()
    const [contextMenu, setContextMenu] = useState<ContextMenuState>({ visible: false, x: 0, y: 0 })
    const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
    const [draggingIcon, setDraggingIcon] = useState<string | null>(null)
    const [iconPositions, setIconPositions] = useState<Record<string, IconPosition>>({})
    const desktopRef = useRef<HTMLDivElement>(null)
    const dragStartPos = useRef<{ x: number; y: number; iconX: number; iconY: number } | null>(null)

    // Initialize icon positions in a grid
    useEffect(() => {
        const savedPositions = localStorage.getItem('desktopIconPositions')
        if (savedPositions) {
            setIconPositions(JSON.parse(savedPositions))
        } else {
            const initialPositions: Record<string, IconPosition> = {}
            desktopApps.forEach((app, index) => {
                const row = Math.floor(index / 1) // 1 column
                const col = index % 1
                initialPositions[app.id] = {
                    x: 12 + col * 90,
                    y: 12 + row * 90
                }
            })
            setIconPositions(initialPositions)
        }
    }, [])

    // Save positions to localStorage
    useEffect(() => {
        if (Object.keys(iconPositions).length > 0) {
            localStorage.setItem('desktopIconPositions', JSON.stringify(iconPositions))
        }
    }, [iconPositions])

    const handleMouseDown = (e: React.MouseEvent, appId: string) => {
        if (e.button !== 0) return // Only left click
        e.preventDefault()
        e.stopPropagation()

        setSelectedIcon(appId)
        setDraggingIcon(appId)

        const pos = iconPositions[appId] || { x: 0, y: 0 }
        dragStartPos.current = {
            x: e.clientX,
            y: e.clientY,
            iconX: pos.x,
            iconY: pos.y
        }

        const handleMouseMove = (moveEvent: MouseEvent) => {
            if (!dragStartPos.current || !desktopRef.current) return

            const deltaX = moveEvent.clientX - dragStartPos.current.x
            const deltaY = moveEvent.clientY - dragStartPos.current.y

            const desktopRect = desktopRef.current.getBoundingClientRect()
            const iconWidth = 74
            const iconHeight = 82

            // Calculate new position with bounds checking
            let newX = dragStartPos.current.iconX + deltaX
            let newY = dragStartPos.current.iconY + deltaY

            // Keep within desktop bounds
            newX = Math.max(0, Math.min(newX, desktopRect.width - iconWidth))
            newY = Math.max(0, Math.min(newY, desktopRect.height - iconHeight - 48)) // Account for taskbar

            setIconPositions(prev => ({
                ...prev,
                [appId]: { x: newX, y: newY }
            }))
        }

        const handleMouseUp = () => {
            setDraggingIcon(null)
            dragStartPos.current = null
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
    }

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault()
        setContextMenu({ visible: true, x: e.clientX, y: e.clientY })
    }

    const handleClick = () => {
        if (contextMenu.visible) {
            setContextMenu({ ...contextMenu, visible: false })
        }
        setSelectedIcon(null)
    }

    const handleDoubleClick = (appId: string) => {
        if (draggingIcon) return // Don't open if we were dragging

        const app = apps.find(a => a.id === appId)
        if (!app) return

        if (appId === 'github') {
            window.open('https://github.com/Gharsallah-Islem', '_blank')
        } else {
            openWindow(appId, app.title, app.icon, app.component)
        }
    }

    // Context menu actions
    const handleRefresh = () => {
        setContextMenu({ ...contextMenu, visible: false })
        window.location.reload()
    }

    const handlePersonalize = () => {
        setContextMenu({ ...contextMenu, visible: false })
        openWindow('about', 'About Me', '👤', 'AboutApp')
    }

    const handleOpenTerminal = () => {
        setContextMenu({ ...contextMenu, visible: false })
        openWindow('terminal', 'Terminal', '⌨️', 'TerminalApp')
    }

    const handleResetIcons = () => {
        setContextMenu({ ...contextMenu, visible: false })
        localStorage.removeItem('desktopIconPositions')
        const initialPositions: Record<string, IconPosition> = {}
        desktopApps.forEach((app, index) => {
            initialPositions[app.id] = {
                x: 12,
                y: 12 + index * 90
            }
        })
        setIconPositions(initialPositions)
    }

    return (
        <div
            ref={desktopRef}
            className="absolute inset-0 pb-12 overflow-hidden select-none"
            onContextMenu={handleContextMenu}
            onClick={handleClick}
        >
            {/* Windows 11 Background - Local Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('/portfolio/background.jpg')`,
                    backgroundColor: '#202020',
                }}
            />

            {/* Interactive Welcome Text */}
            <WelcomeText />

            {/* Desktop Icons - Freely Draggable */}
            <div className="relative z-10 w-full h-full">
                {desktopApps.map(app => {
                    const pos = iconPositions[app.id] || { x: 12, y: 12 }

                    return (
                        <div
                            key={app.id}
                            className={`
                absolute flex flex-col items-center justify-start gap-1.5 
                w-[74px] h-[82px] pt-2 rounded-[4px] cursor-pointer
                transition-shadow duration-75
                ${selectedIcon === app.id
                                    ? 'bg-white/15 ring-1 ring-[#60cdff]/50'
                                    : 'hover:bg-white/8'
                                }
                ${draggingIcon === app.id ? 'opacity-80 shadow-lg scale-105' : ''}
              `}
                            style={{
                                left: pos.x,
                                top: pos.y,
                                zIndex: draggingIcon === app.id ? 100 : 1
                            }}
                            onMouseDown={(e) => handleMouseDown(e, app.id)}
                            onDoubleClick={() => handleDoubleClick(app.id)}
                        >
                            {/* Windows 11 Icon from .ico file */}
                            <img
                                src={iconPaths[app.id] || '/portfolio/icons/explorer.ico'}
                                alt={app.title}
                                className="w-12 h-12 object-contain drop-shadow-lg pointer-events-none"
                                draggable={false}
                            />

                            {/* Label */}
                            <span
                                className="text-[11px] text-white text-center leading-tight max-w-[68px] line-clamp-2 font-normal drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)] pointer-events-none"
                            >
                                {app.title}
                            </span>
                        </div>
                    )
                })}
            </div>

            {/* Context Menu - Windows 11 Style */}
            {contextMenu.visible && (
                <div
                    className="fixed rounded-lg py-1 min-w-[280px] z-[10000] overflow-hidden"
                    style={{
                        left: Math.min(contextMenu.x, window.innerWidth - 300),
                        top: Math.min(contextMenu.y, window.innerHeight - 400),
                        background: 'rgba(44,44,44,0.94)',
                        backdropFilter: 'blur(20px) saturate(180%)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                    }}
                >
                    <button className="w-full px-3 py-2 text-left text-[13px] hover:bg-white/[0.06] flex items-center gap-3 transition-colors">
                        <span className="w-5 text-center text-base">👁️</span>
                        <span>View</span>
                        <span className="ml-auto text-white/30 text-xs">▸</span>
                    </button>
                    <button className="w-full px-3 py-2 text-left text-[13px] hover:bg-white/[0.06] flex items-center gap-3 transition-colors">
                        <span className="w-5 text-center text-base">↕️</span>
                        <span>Sort by</span>
                        <span className="ml-auto text-white/30 text-xs">▸</span>
                    </button>
                    <button
                        onClick={handleRefresh}
                        className="w-full px-3 py-2 text-left text-[13px] hover:bg-white/[0.06] flex items-center gap-3 transition-colors"
                    >
                        <span className="w-5 text-center text-base">🔄</span>
                        <span>Refresh</span>
                    </button>
                    <button
                        onClick={handleResetIcons}
                        className="w-full px-3 py-2 text-left text-[13px] hover:bg-white/[0.06] flex items-center gap-3 transition-colors"
                    >
                        <span className="w-5 text-center text-base">📐</span>
                        <span>Reset icon positions</span>
                    </button>

                    <div className="border-t border-white/[0.06] my-1" />

                    <button className="w-full px-3 py-2 text-left text-[13px] hover:bg-white/[0.06] flex items-center gap-3 transition-colors">
                        <span className="w-5 text-center text-base">📋</span>
                        <span>Paste</span>
                        <span className="ml-auto text-white/30 text-xs">Ctrl+V</span>
                    </button>

                    <div className="border-t border-white/[0.06] my-1" />

                    <button
                        onClick={handlePersonalize}
                        className="w-full px-3 py-2 text-left text-[13px] hover:bg-white/[0.06] flex items-center gap-3 transition-colors"
                    >
                        <span className="w-5 text-center text-base">🎨</span>
                        <span>Personalize</span>
                    </button>
                    <button className="w-full px-3 py-2 text-left text-[13px] hover:bg-white/[0.06] flex items-center gap-3 transition-colors">
                        <span className="w-5 text-center text-base">🖥️</span>
                        <span>Display settings</span>
                    </button>

                    <div className="border-t border-white/[0.06] my-1" />

                    <button
                        onClick={handleOpenTerminal}
                        className="w-full px-3 py-2 text-left text-[13px] hover:bg-white/[0.06] flex items-center gap-3 transition-colors"
                    >
                        <span className="w-5 text-center text-base">⬛</span>
                        <span>Open in Terminal</span>
                    </button>

                    <div className="border-t border-white/[0.06] my-1" />

                    <button className="w-full px-3 py-2 text-left text-[13px] hover:bg-white/[0.06] flex items-center gap-3 transition-colors">
                        <span className="w-5 text-center text-base">📄</span>
                        <span>Show more options</span>
                        <span className="ml-auto text-white/30 text-xs">Shift+F10</span>
                    </button>
                </div>
            )}
        </div>
    )
}
