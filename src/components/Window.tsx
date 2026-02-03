import { useRef, useEffect, useState } from 'react'
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable'
import { useDesktopStore, WindowState } from '../store/desktopStore'
import gsap from 'gsap'

// Windows 11 Fluent Icons (SVG)
const MinimizeIcon = () => (
    <svg width="10" height="10" viewBox="0 0 12 12">
        <rect x="0" y="5" width="12" height="1" fill="currentColor" />
    </svg>
)

const MaximizeIcon = () => (
    <svg width="10" height="10" viewBox="0 0 12 12">
        <rect x="1" y="1" width="10" height="10" stroke="currentColor" strokeWidth="1" fill="none" />
    </svg>
)

const RestoreIcon = () => (
    <svg width="10" height="10" viewBox="0 0 12 12">
        <rect x="3" y="0" width="8" height="8" stroke="currentColor" strokeWidth="1" fill="none" />
        <rect x="0" y="3" width="8" height="8" stroke="currentColor" strokeWidth="1" fill="var(--win-surface, #2d2d30)" />
    </svg>
)

const CloseIcon = () => (
    <svg width="10" height="10" viewBox="0 0 12 12">
        <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.2" />
    </svg>
)

interface WindowProps {
    window: WindowState
    children: React.ReactNode
}

export default function Window({ window, children }: WindowProps) {
    const {
        focusWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        restoreWindow,
        updateWindowPosition,
        focusedWindowId
    } = useDesktopStore()

    const nodeRef = useRef<HTMLDivElement>(null)
    const [isClosing, setIsClosing] = useState(false)
    const isFocused = focusedWindowId === window.id

    // Window open animation
    useEffect(() => {
        if (nodeRef.current && !window.isMinimized && !isClosing) {
            gsap.fromTo(nodeRef.current,
                { opacity: 0, scale: 0.95, y: 20 },
                { opacity: 1, scale: 1, y: 0, duration: 0.2, ease: 'power2.out' }
            )
        }
    }, [])

    // Handle restore from minimize
    useEffect(() => {
        if (nodeRef.current && !window.isMinimized && !isClosing) {
            gsap.fromTo(nodeRef.current,
                { opacity: 0, scale: 0.9, y: 30 },
                { opacity: 1, scale: 1, y: 0, duration: 0.25, ease: 'power2.out' }
            )
        }
    }, [window.isMinimized])

    const handleDragStop = (_e: DraggableEvent, data: DraggableData) => {
        updateWindowPosition(window.id, { x: data.x, y: data.y })
    }

    const handleClose = () => {
        if (nodeRef.current) {
            setIsClosing(true)
            gsap.to(nodeRef.current, {
                opacity: 0,
                scale: 0.95,
                duration: 0.15,
                ease: 'power2.in',
                onComplete: () => closeWindow(window.id)
            })
        } else {
            closeWindow(window.id)
        }
    }

    const handleMinimize = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (nodeRef.current) {
            gsap.to(nodeRef.current, {
                opacity: 0,
                scale: 0.8,
                y: 50,
                duration: 0.2,
                ease: 'power2.in',
                onComplete: () => minimizeWindow(window.id)
            })
        } else {
            minimizeWindow(window.id)
        }
    }

    const handleMaximize = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (window.isMaximized) {
            restoreWindow(window.id)
        } else {
            maximizeWindow(window.id)
        }
    }

    // Don't render if minimized
    if (window.isMinimized) return null

    const windowStyle = window.isMaximized
        ? {
            position: 'fixed' as const,
            top: 0,
            left: 0,
            right: 0,
            bottom: 48,
            zIndex: window.zIndex,
            width: '100%',
            height: 'calc(100vh - 48px)'
        }
        : {
            zIndex: window.zIndex,
            width: window.size.width,
            height: window.size.height
        }

    const WindowContent = (
        <div
            ref={nodeRef}
            className={`
        absolute overflow-hidden flex flex-col
        rounded-lg shadow-2xl
        ${isFocused ? 'ring-1 ring-white/20' : 'ring-1 ring-white/10'}
      `}
            style={{
                ...windowStyle,
                background: 'rgba(32,32,32,0.95)',
                backdropFilter: 'blur(20px)',
            }}
            onMouseDown={() => focusWindow(window.id)}
        >
            {/* Title Bar */}
            <div
                className="h-8 flex items-center justify-between px-3 shrink-0 window-drag-handle"
                style={{ background: isFocused ? 'rgba(45,45,45,0.9)' : 'rgba(40,40,40,0.9)' }}
                onDoubleClick={handleMaximize}
            >
                {/* Left: Icon & Title */}
                <div className="flex items-center gap-2 pointer-events-none">
                    <span className="text-sm">{window.icon}</span>
                    <span className="text-xs text-white/80 truncate max-w-[200px]">{window.title}</span>
                </div>

                {/* Right: Window Controls */}
                <div className="flex items-center -mr-1">
                    <button
                        onClick={handleMinimize}
                        className="w-11 h-8 flex items-center justify-center hover:bg-white/10 transition-colors text-white/80 hover:text-white"
                        title="Minimize"
                    >
                        <MinimizeIcon />
                    </button>
                    <button
                        onClick={handleMaximize}
                        className="w-11 h-8 flex items-center justify-center hover:bg-white/10 transition-colors text-white/80 hover:text-white"
                        title={window.isMaximized ? 'Restore' : 'Maximize'}
                    >
                        {window.isMaximized ? <RestoreIcon /> : <MaximizeIcon />}
                    </button>
                    <button
                        onClick={handleClose}
                        className="w-11 h-8 flex items-center justify-center hover:bg-[#c42b1c] transition-colors text-white/80 hover:text-white rounded-tr-lg"
                        title="Close"
                    >
                        <CloseIcon />
                    </button>
                </div>
            </div>

            {/* Window Content */}
            <div className="flex-1 overflow-hidden bg-[#1e1e1e]">
                {children}
            </div>
        </div>
    )

    // If maximized, don't wrap with Draggable
    if (window.isMaximized) {
        return WindowContent
    }

    return (
        <Draggable
            nodeRef={nodeRef}
            handle=".window-drag-handle"
            defaultPosition={window.position}
            bounds="parent"
            onStop={handleDragStop}
            onStart={() => focusWindow(window.id)}
        >
            {WindowContent}
        </Draggable>
    )
}
