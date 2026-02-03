// App Registry - Maps app IDs to their configurations
export interface AppConfig {
    id: string
    title: string
    icon: string
    component: string
    desktopIcon?: boolean
    pinnedToTaskbar?: boolean
    pinnedToStart?: boolean
}

export const apps: AppConfig[] = [
    {
        id: 'about',
        title: 'About Me',
        icon: '👤',
        component: 'AboutApp',
        desktopIcon: true,
        pinnedToTaskbar: true,
        pinnedToStart: true
    },
    {
        id: 'projects',
        title: 'Projects',
        icon: '💼',
        component: 'ProjectsApp',
        desktopIcon: true,
        pinnedToTaskbar: true,
        pinnedToStart: true
    },
    {
        id: 'experience',
        title: 'Experience',
        icon: '📝',
        component: 'ExperienceApp',
        desktopIcon: true,
        pinnedToStart: true
    },
    {
        id: 'skills',
        title: 'Skills',
        icon: '🛠️',
        component: 'SkillsApp',
        desktopIcon: true,
        pinnedToStart: true
    },
    {
        id: 'contact',
        title: 'Contact',
        icon: '✉️',
        component: 'ContactApp',
        desktopIcon: true,
        pinnedToTaskbar: true,
        pinnedToStart: true
    },
    {
        id: 'resume',
        title: 'Resume',
        icon: '📄',
        component: 'ResumeApp',
        desktopIcon: true,
        pinnedToStart: true
    },
    {
        id: 'terminal',
        title: 'Terminal',
        icon: '⬛',
        component: 'TerminalApp',
        desktopIcon: true,
        pinnedToStart: true
    },
    {
        id: 'github',
        title: 'GitHub',
        icon: '🐙',
        component: 'ExternalLink',
        pinnedToStart: true
    }
]

export const getAppById = (id: string): AppConfig | undefined => {
    return apps.find(app => app.id === id)
}

export const getDesktopApps = (): AppConfig[] => {
    return apps.filter(app => app.desktopIcon)
}

export const getTaskbarApps = (): AppConfig[] => {
    return apps.filter(app => app.pinnedToTaskbar)
}

export const getStartMenuApps = (): AppConfig[] => {
    return apps.filter(app => app.pinnedToStart)
}
