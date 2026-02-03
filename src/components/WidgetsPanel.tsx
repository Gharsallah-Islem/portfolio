import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa'

interface WidgetsPanelProps {
    isOpen: boolean
    onClose: () => void
}

export default function WidgetsPanel({ isOpen, onClose }: WidgetsPanelProps) {
    const panelRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (panelRef.current) {
            if (isOpen) {
                gsap.fromTo(panelRef.current,
                    { x: -20, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.25, ease: 'power2.out' }
                )
            }
        }
    }, [isOpen])

    if (!isOpen) return null

    return (
        <>
            <div className="fixed inset-0 z-[9996]" onClick={onClose} />

            <div
                ref={panelRef}
                className="fixed left-3 bottom-14 w-[380px] rounded-xl overflow-hidden z-[9997]"
                style={{
                    maxHeight: 'calc(100vh - 70px)',
                    background: 'rgba(32,32,32,0.94)',
                    backdropFilter: 'blur(40px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: '0 24px 48px rgba(0,0,0,0.4)',
                }}
            >
                <div className="overflow-auto max-h-[calc(100vh-70px)] p-4 space-y-3">
                    {/* Weather Widget */}
                    <div className="bg-gradient-to-br from-[#1a4d8c] to-[#0d2444] rounded-xl p-4">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-2xl font-light">12°C</p>
                                <p className="text-sm text-white/70">Tunis, Tunisia</p>
                                <p className="text-xs text-white/50 mt-1">Partly Cloudy</p>
                            </div>
                            <span className="text-5xl">⛅</span>
                        </div>
                    </div>

                    {/* Profile Widget */}
                    <div className="bg-[#252525] rounded-xl p-4 border border-[#333]">
                        <div className="flex items-center gap-4 mb-3">
                            <img
                                src="/portfolio/profile.jpg"
                                alt="Islem Gharsallah"
                                className="w-14 h-14 rounded-full object-cover shadow-lg ring-2 ring-[#60cdff]/30"
                            />
                            <div>
                                <h3 className="font-semibold">Islem Gharsallah</h3>
                                <p className="text-xs text-white/50">Full Stack Developer | AI Enthusiast</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <a
                                href="https://github.com/Gharsallah-Islem"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 py-2 bg-[#24292e] rounded-lg text-xs hover:bg-[#333] transition-colors"
                            >
                                <FaGithub size={14} /> GitHub
                            </a>
                            <a
                                href="https://linkedin.com/in/islem-gharsallah-649a63305/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 py-2 bg-[#0077b5] rounded-lg text-xs hover:bg-[#006699] transition-colors"
                            >
                                <FaLinkedin size={14} /> LinkedIn
                            </a>
                        </div>
                    </div>

                    {/* Tech Stack Widget */}
                    <div className="bg-[#252525] rounded-xl p-4 border border-[#333]">
                        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                            <span>⚡</span> Tech Stack
                        </h3>
                        <div className="flex flex-wrap gap-1.5">
                            {['Java', 'Python', 'TypeScript', 'Angular', 'React', 'Spring Boot', 'TensorFlow', 'Docker'].map(tech => (
                                <span key={tech} className="px-2.5 py-1 bg-[#333] rounded-md text-xs text-white/80">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Latest Project Widget */}
                    <div className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-xl p-4 border border-purple-500/20">
                        <div className="flex items-start gap-3">
                            <span className="text-3xl">🧠</span>
                            <div>
                                <h3 className="font-semibold text-sm">Hyperion Analytics AI</h3>
                                <p className="text-xs text-white/60 mt-1">Self-healing analytics engine with NL→SQL/Python</p>
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {['Spring Boot', 'Angular 19', 'Gemini'].map(tech => (
                                        <span key={tech} className="px-2 py-0.5 bg-white/10 rounded text-[10px]">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Widget */}
                    <div className="bg-[#252525] rounded-xl p-4 border border-[#333]">
                        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                            <span>📬</span> Quick Contact
                        </h3>
                        <div className="space-y-2">
                            <a
                                href="mailto:islemgharsallah86@gmail.com"
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                            >
                                <FaEnvelope className="text-red-400" size={14} />
                                <span className="text-xs">islemgharsallah86@gmail.com</span>
                            </a>
                            <a
                                href="tel:+21626598197"
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                            >
                                <FaPhone className="text-green-400" size={14} />
                                <span className="text-xs">+216 26 598 197</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
