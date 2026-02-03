import Desktop from './components/Desktop'
import Taskbar from './components/Taskbar'
import Window from './components/Window'
import { useDesktopStore } from './store/desktopStore'

// App Components
import AboutApp from './apps/AboutApp'
import ProjectsApp from './apps/ProjectsApp'
import ExperienceApp from './apps/ExperienceApp'
import SkillsApp from './apps/SkillsApp'
import ContactApp from './apps/ContactApp'
import ResumeApp from './apps/ResumeApp'
import TerminalApp from './apps/TerminalApp'

const appComponents: Record<string, React.FC> = {
    AboutApp,
    ProjectsApp,
    ExperienceApp,
    SkillsApp,
    ContactApp,
    ResumeApp,
    TerminalApp,
}

function App() {
    const { windows, closeStartMenu } = useDesktopStore()

    const handleDesktopClick = () => {
        closeStartMenu()
    }

    return (
        <div
            className="w-screen h-screen overflow-hidden relative bg-black"
            onClick={handleDesktopClick}
        >
            {/* Desktop Background & Icons */}
            <Desktop />

            {/* Windows */}
            <div className="absolute inset-0 pb-12 pointer-events-none">
                <div className="relative w-full h-full pointer-events-auto">
                    {windows.map(window => {
                        const AppComponent = appComponents[window.component]
                        if (!AppComponent) return null

                        return (
                            <Window key={window.id} window={window}>
                                <AppComponent />
                            </Window>
                        )
                    })}
                </div>
            </div>

            {/* Taskbar */}
            <Taskbar />
        </div>
    )
}

export default App
