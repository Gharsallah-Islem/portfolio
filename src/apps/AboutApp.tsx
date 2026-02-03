import { useState } from 'react'
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaChevronRight, FaHome, FaUser, FaStar, FaBars } from 'react-icons/fa'

type Section = 'overview' | 'education' | 'certifications' | 'languages' | 'connect'

const sections: { id: Section; label: string; icon: JSX.Element }[] = [
    { id: 'overview', label: 'Overview', icon: <FaHome size={14} /> },
    { id: 'education', label: 'Education', icon: <span>🎓</span> },
    { id: 'certifications', label: 'Certifications', icon: <span>🏆</span> },
    { id: 'languages', label: 'Languages', icon: <span>🌍</span> },
    { id: 'connect', label: 'Connect', icon: <span>🔗</span> },
]

export default function AboutApp() {
    const [activeSection, setActiveSection] = useState<Section>('overview')
    const [showSidebar, setShowSidebar] = useState(false)

    return (
        <div className="h-full flex flex-col md:flex-row bg-[#191919]">
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-[#333] bg-[#202020] shrink-0">
                <div className="flex items-center gap-2 text-sm">
                    <FaUser size={12} className="text-white/60" />
                    <span className="text-white/60">/</span>
                    <span>{sections.find(s => s.id === activeSection)?.label}</span>
                </div>
                <button
                    onClick={() => setShowSidebar(!showSidebar)}
                    className="p-2 rounded-lg hover:bg-white/10"
                >
                    <FaBars size={16} />
                </button>
            </div>

            {/* Mobile Navigation Dropdown */}
            {showSidebar && (
                <div className="md:hidden absolute top-12 left-0 right-0 bg-[#202020] border-b border-[#333] z-50">
                    <nav className="p-2">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => {
                                    setActiveSection(section.id)
                                    setShowSidebar(false)
                                }}
                                className={`
                                    w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm
                                    transition-all duration-100
                                    ${activeSection === section.id
                                        ? 'bg-white/10 text-white'
                                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                                    }
                                `}
                            >
                                <span className="w-5 flex justify-center">{section.icon}</span>
                                <span>{section.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>
            )}

            {/* Sidebar - Hidden on mobile */}
            <div className="hidden md:flex w-56 bg-[#202020] border-r border-[#333] flex-col shrink-0">
                {/* Quick Access Header */}
                <div className="px-4 py-3 flex items-center gap-2 border-b border-[#333]">
                    <FaStar className="text-yellow-500" size={14} />
                    <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">Quick Access</span>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 p-2">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`
                                w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm
                                transition-all duration-100
                                ${activeSection === section.id
                                    ? 'bg-white/10 text-white'
                                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                                }
                            `}
                        >
                            <span className="w-5 flex justify-center">{section.icon}</span>
                            <span>{section.label}</span>
                            {activeSection === section.id && (
                                <FaChevronRight className="ml-auto opacity-50" size={10} />
                            )}
                        </button>
                    ))}
                </nav>

                {/* Profile Card at Bottom */}
                <div className="p-3 border-t border-[#333]">
                    <div className="bg-gradient-to-r from-[#0078d4]/20 to-[#60cdff]/10 rounded-lg p-3">
                        <div className="flex items-center gap-3">
                            <img
                                src="/portfolio/profile.jpg"
                                alt="Islem Gharsallah"
                                className="w-10 h-10 rounded-full object-cover shadow-lg ring-2 ring-[#60cdff]/30"
                            />
                            <div>
                                <p className="text-sm font-medium">Islem Gharsallah</p>
                                <p className="text-[10px] text-white/50">Full Stack Developer</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden min-h-0">
                {/* Breadcrumb Bar - Hidden on mobile */}
                <div className="hidden md:flex h-10 items-center px-4 border-b border-[#333] bg-[#1a1a1a] shrink-0">
                    <div className="flex items-center gap-1 text-sm text-white/60">
                        <FaUser size={12} />
                        <FaChevronRight size={8} className="mx-1" />
                        <span>About Me</span>
                        <FaChevronRight size={8} className="mx-1" />
                        <span className="text-white">{sections.find(s => s.id === activeSection)?.label}</span>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto p-4 md:p-6">
                    {activeSection === 'overview' && (
                        <div className="space-y-4 md:space-y-6 max-w-3xl">
                            {/* Hero Section */}
                            <div className="bg-gradient-to-r from-[#0078d4]/30 via-[#5c2d91]/20 to-[#0078d4]/30 rounded-xl p-4 md:p-6 border border-white/5">
                                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6">
                                    <img
                                        src="/portfolio/profile.jpg"
                                        alt="Islem Gharsallah"
                                        className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover shadow-2xl shrink-0 ring-4 ring-[#60cdff]/20"
                                    />
                                    <div className="flex-1 text-center sm:text-left">
                                        <h1 className="text-xl md:text-2xl font-bold mb-1">Islem Gharsallah</h1>
                                        <p className="text-[#60cdff] font-medium mb-2 md:mb-3 text-sm md:text-base">Full Stack Developer | AI Enthusiast</p>
                                        <p className="text-xs md:text-sm text-white/70 leading-relaxed">
                                            Passionate IT student building scalable enterprise solutions with modern web technologies
                                            and AI integration. Currently pursuing a Bachelor's degree in Information Technology
                                            at ISET Radès, Tunisia.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Stats Grid - 2 cols on mobile, 4 on desktop */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                                {[
                                    { label: 'Projects', value: '5+', icon: '🚀' },
                                    { label: 'GitHub Repos', value: '26', icon: '💻' },
                                    { label: 'Technologies', value: '30+', icon: '⚡' },
                                    { label: 'Certifications', value: '3', icon: '🏆' },
                                ].map((stat) => (
                                    <div key={stat.label} className="bg-[#252525] rounded-lg p-3 md:p-4 border border-[#333] hover:border-[#0078d4]/50 transition-colors">
                                        <div className="text-xl md:text-2xl mb-1 md:mb-2">{stat.icon}</div>
                                        <div className="text-lg md:text-xl font-bold text-[#60cdff]">{stat.value}</div>
                                        <div className="text-[10px] md:text-xs text-white/50">{stat.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Quick Info - Stack on mobile */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                                <div className="bg-[#252525] rounded-lg p-4 border border-[#333]">
                                    <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                                        <FaMapMarkerAlt className="text-red-400" /> Location
                                    </h3>
                                    <p className="text-white/80">Tunisia 🇹🇳</p>
                                    <p className="text-xs text-white/50 mt-1">Available for remote work</p>
                                </div>
                                <div className="bg-[#252525] rounded-lg p-4 border border-[#333]">
                                    <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                                        <span>🎯</span> Focus Areas
                                    </h3>
                                    <div className="flex flex-wrap gap-1.5">
                                        {['Full Stack', 'AI/ML', 'Enterprise Apps'].map(tag => (
                                            <span key={tag} className="px-2 py-0.5 bg-[#0078d4]/20 text-[#60cdff] rounded text-xs">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'education' && (
                        <div className="space-y-4 max-w-3xl">
                            <h2 className="text-lg font-semibold mb-4">📚 Education</h2>

                            <div className="bg-[#252525] rounded-xl p-4 md:p-5 border border-[#333] hover:border-[#0078d4]/30 transition-colors">
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                                    <div>
                                        <h3 className="font-semibold text-white text-sm md:text-base">Bachelor's Degree in Information Technology</h3>
                                        <p className="text-[#60cdff] text-xs md:text-sm">Information Systems Development</p>
                                    </div>
                                    <span className="text-xs text-white/50 bg-[#333] px-2 py-1 rounded w-fit">2023 - 2026</span>
                                </div>
                                <p className="text-xs md:text-sm text-white/60 mt-2">Higher Institute of Technological Studies of Radès (ISET Radès)</p>
                                <div className="mt-4">
                                    <p className="text-xs text-white/50 mb-2">Relevant Coursework:</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {['Object-Oriented Programming', 'Web Frameworks', 'Mobile Development', 'Artificial Intelligence', 'Big Data', 'UML'].map(course => (
                                            <span key={course} className="px-2 py-1 bg-[#333] rounded text-[10px] md:text-xs text-white/70">
                                                {course}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'certifications' && (
                        <div className="space-y-4 max-w-3xl">
                            <h2 className="text-lg font-semibold mb-4">🏆 Certifications</h2>

                            {[
                                { name: 'Python Essentials 1 & 2', issuer: 'Cisco Networking Academy', icon: '🐍', color: 'from-yellow-500/20 to-green-500/20' },
                                { name: 'Machine Learning', issuer: 'Columbia University', icon: '🤖', color: 'from-blue-500/20 to-purple-500/20' },
                                { name: 'Ethical Hacker', issuer: 'Cisco Networking Academy', icon: '🔐', color: 'from-red-500/20 to-orange-500/20' },
                            ].map((cert) => (
                                <div key={cert.name} className={`bg-gradient-to-r ${cert.color} rounded-xl p-4 md:p-5 border border-white/5 hover:border-white/10 transition-colors`}>
                                    <div className="flex items-center gap-3 md:gap-4">
                                        <span className="text-2xl md:text-3xl">{cert.icon}</span>
                                        <div>
                                            <h3 className="font-semibold text-white text-sm md:text-base">{cert.name}</h3>
                                            <p className="text-xs md:text-sm text-white/60">{cert.issuer}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="mt-6">
                                <h3 className="text-sm font-semibold mb-3 text-white/70">🔹 Associations</h3>
                                <div className="space-y-2">
                                    <div className="bg-[#252525] rounded-lg p-3 border border-[#333]">
                                        <p className="text-xs md:text-sm">IEEE CS Chapter — ISET Radès</p>
                                    </div>
                                    <div className="bg-[#252525] rounded-lg p-3 border border-[#333]">
                                        <p className="text-xs md:text-sm">Securinets — Technical workshops, CTF competitions</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'languages' && (
                        <div className="space-y-4 max-w-3xl">
                            <h2 className="text-lg font-semibold mb-4">🌍 Languages</h2>

                            {[
                                { lang: 'Arabic', level: 'Native', percent: 100, flag: '🇹🇳' },
                                { lang: 'French', level: 'Fluent', percent: 90, flag: '🇫🇷' },
                                { lang: 'English', level: 'Professional', percent: 85, flag: '🇬🇧' },
                            ].map((item) => (
                                <div key={item.lang} className="bg-[#252525] rounded-xl p-4 md:p-5 border border-[#333]">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl md:text-2xl">{item.flag}</span>
                                            <div>
                                                <h3 className="font-semibold text-sm md:text-base">{item.lang}</h3>
                                                <p className="text-[10px] md:text-xs text-white/50">{item.level}</p>
                                            </div>
                                        </div>
                                        <span className="text-[#60cdff] font-bold text-sm md:text-base">{item.percent}%</span>
                                    </div>
                                    <div className="h-2 bg-[#333] rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-[#0078d4] to-[#60cdff] rounded-full transition-all duration-500"
                                            style={{ width: `${item.percent}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeSection === 'connect' && (
                        <div className="space-y-4 max-w-3xl">
                            <h2 className="text-lg font-semibold mb-4">🔗 Let's Connect</h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                                <a
                                    href="mailto:islemgharsallah86@gmail.com"
                                    className="bg-[#252525] rounded-xl p-4 md:p-5 border border-[#333] hover:border-[#0078d4] hover:bg-[#0078d4]/10 transition-all flex items-center gap-3 md:gap-4 group"
                                >
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shrink-0">
                                        <FaEnvelope size={18} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-semibold group-hover:text-[#60cdff] transition-colors text-sm md:text-base">Email</p>
                                        <p className="text-[10px] md:text-xs text-white/50 truncate">islemgharsallah86@gmail.com</p>
                                    </div>
                                </a>

                                <a
                                    href="tel:+21626598197"
                                    className="bg-[#252525] rounded-xl p-4 md:p-5 border border-[#333] hover:border-green-500 hover:bg-green-500/10 transition-all flex items-center gap-3 md:gap-4 group"
                                >
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shrink-0">
                                        <FaPhone size={16} />
                                    </div>
                                    <div>
                                        <p className="font-semibold group-hover:text-green-400 transition-colors text-sm md:text-base">Phone</p>
                                        <p className="text-[10px] md:text-xs text-white/50">+216 26 598 197</p>
                                    </div>
                                </a>

                                <a
                                    href="https://linkedin.com/in/islem-gharsallah-649a63305/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-[#252525] rounded-xl p-4 md:p-5 border border-[#333] hover:border-[#0077b5] hover:bg-[#0077b5]/10 transition-all flex items-center gap-3 md:gap-4 group"
                                >
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-[#0077b5] flex items-center justify-center shrink-0">
                                        <FaLinkedin size={20} />
                                    </div>
                                    <div>
                                        <p className="font-semibold group-hover:text-[#0077b5] transition-colors text-sm md:text-base">LinkedIn</p>
                                        <p className="text-[10px] md:text-xs text-white/50">islem-gharsallah</p>
                                    </div>
                                </a>

                                <a
                                    href="https://github.com/Gharsallah-Islem"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-[#252525] rounded-xl p-4 md:p-5 border border-[#333] hover:border-white/30 hover:bg-white/5 transition-all flex items-center gap-3 md:gap-4 group"
                                >
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-[#24292e] flex items-center justify-center shrink-0">
                                        <FaGithub size={20} />
                                    </div>
                                    <div>
                                        <p className="font-semibold group-hover:text-white transition-colors text-sm md:text-base">GitHub</p>
                                        <p className="text-[10px] md:text-xs text-white/50">Gharsallah-Islem (26 repos)</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
