import { useState } from 'react'
import { FaGithub, FaExternalLinkAlt, FaChevronRight, FaSearch, FaStar, FaCode, FaRocket, FaFilter, FaArrowLeft } from 'react-icons/fa'

interface Project {
    id: string
    name: string
    description: string
    longDescription: string
    year: string
    tech: string[]
    features: string[]
    github?: string
    demo?: string
    icon: string
    gradient: string
    featured: boolean
}

const projects: Project[] = [
    {
        id: 'hyperion',
        name: 'Hyperion Analytics AI',
        description: 'Self-healing analytics engine with natural language processing',
        longDescription: 'An AI-powered platform that converts natural language queries into SQL/Python execution with automatic error recovery and Docker-sandboxed runtime.',
        year: '2026',
        tech: ['Spring Boot 3', 'Angular 19', 'Google Gemini', 'Docker', 'PostgreSQL', 'WebSocket', 'pgvector'],
        features: [
            'Natural language to SQL/Python conversion',
            'Secure Docker-sandboxed execution',
            'RAG with pgvector for semantic search',
            'Self-healing error recovery',
            'Real-time analytics dashboard'
        ],
        github: 'https://github.com/Gharsallah-Islem',
        icon: '🧠',
        gradient: 'from-purple-600 to-blue-600',
        featured: true
    },
    {
        id: 'autoparts',
        name: 'AutoParts E-Commerce',
        description: 'Full-stack platform with AI-powered visual search',
        longDescription: 'Complete e-commerce solution for auto parts with CNN-based visual search achieving 97% accuracy and real-time delivery tracking.',
        year: '2025',
        tech: ['Spring Boot', 'Angular 18', 'TensorFlow', 'PostgreSQL', 'Kotlin', 'Leaflet Maps', 'Stripe'],
        features: [
            'AI visual search (97% accuracy)',
            'CNN EfficientNet model',
            'Real-time GPS delivery tracking',
            'Stripe payment integration',
            'Mobile app with Kotlin'
        ],
        github: 'https://github.com/Gharsallah-Islem',
        icon: '🚗',
        gradient: 'from-orange-500 to-red-500',
        featured: true
    },
    {
        id: 'medtrack',
        name: 'MedTrack Healthcare',
        description: 'Comprehensive healthcare management platform',
        longDescription: 'Full-stack healthcare management system connecting patients, doctors, and administrators with appointment scheduling, real-time chat, and medical record management.',
        year: '2025',
        tech: ['Spring Boot 3.4', 'Angular 18', 'MySQL', 'JWT', 'Chart.js', 'Leaflet', 'Three.js', 'GSAP'],
        features: [
            'Real-time patient-doctor chat',
            'Appointment scheduling system',
            'Medication tracking & reminders',
            'Medical report PDF generation',
            'Doctor rating & review system',
            'Analytics dashboards for all roles'
        ],
        github: 'https://github.com/Gharsallah-Islem/Medtrack',
        icon: '🏥',
        gradient: 'from-teal-500 to-cyan-600',
        featured: true
    },
    {
        id: 'santeconnect',
        name: 'Santé Connect',
        description: 'Medical prescription management mobile app',
        longDescription: 'Modern cross-platform mobile application connecting patients with pharmacists for prescription fulfillment, with real-time order tracking and inventory management.',
        year: '2025',
        tech: ['React Native', 'Expo', 'TypeScript', 'AsyncStorage', 'React Navigation'],
        features: [
            'Patient prescription browsing',
            'One-tap medication ordering',
            'Real-time order status tracking',
            'Pharmacist inventory management',
            'Order return requests',
            'Premium glassmorphism UI'
        ],
        github: 'https://github.com/Gharsallah-Islem/Sant-Connect',
        icon: '💊',
        gradient: 'from-pink-500 to-rose-600',
        featured: true
    },
    {
        id: 'bookhaven',
        name: 'Book Haven E-Commerce',
        description: 'Sophisticated book e-commerce platform',
        longDescription: 'Modern book e-commerce platform built with Symfony featuring beautiful UI, comprehensive catalog management, and seamless Stripe payment integration.',
        year: '2025',
        tech: ['PHP 8.2', 'Symfony 6', 'Doctrine ORM', 'Tailwind CSS', 'MySQL', 'Stripe', 'Twig'],
        features: [
            'Advanced book catalog & filtering',
            'Glassmorphism UI design',
            'Shopping cart with real-time updates',
            'Stripe payment integration',
            'Wishlist functionality',
            'Admin CRUD panel'
        ],
        github: 'https://github.com/Gharsallah-Islem/Book-e-commerece-project',
        icon: '📚',
        gradient: 'from-violet-500 to-purple-600',
        featured: false
    },
    {
        id: 'trading',
        name: 'AI Stock Trading Platform',
        description: 'LSTM-based stock price predictions',
        longDescription: 'Trading platform with machine learning predictions for major stocks using LSTM neural networks and real-time market data.',
        year: '2025',
        tech: ['Angular 18', 'Spring Boot 3', 'TensorFlow/Keras', 'Chart.js', 'WebSocket'],
        features: [
            'LSTM price predictions',
            'AAPL, MSFT, S&P 500 analysis',
            'Real-time market data',
            'Interactive charts',
            'Portfolio management'
        ],
        github: 'https://github.com/Gharsallah-Islem',
        icon: '📈',
        gradient: 'from-green-500 to-emerald-600',
        featured: true
    },
    {
        id: 'uptohire',
        name: 'UpToHire Recruitment',
        description: 'AI recruitment with ATS scoring',
        longDescription: 'Intelligent recruitment platform with AI-powered resume analysis, ATS scoring, and semantic candidate matching.',
        year: '2025',
        tech: ['React 18', 'Spring Boot 3.4', 'Stanford CoreNLP', 'HuggingFace', 'PostgreSQL'],
        features: [
            'AI ATS scoring system',
            'Semantic candidate matching',
            'Resume parsing with NLP',
            'Job scraping (20+ platforms)',
            'Bias detection algorithms'
        ],
        github: 'https://github.com/Gharsallah-Islem',
        icon: '💼',
        gradient: 'from-blue-500 to-cyan-500',
        featured: false
    },
    {
        id: 'oaca',
        name: 'OACA Exam Platform',
        description: 'Digital exam management with AI',
        longDescription: 'Comprehensive exam platform for the Office of Civil Aviation with automated result analysis and AI-powered question generation.',
        year: '2024',
        tech: ['Angular 17', 'Spring Boot 3', 'MySQL', 'Chart.js', 'Gemini API'],
        features: [
            'AI question generation',
            'Automated exam correction',
            'Performance analytics',
            'Candidate management',
            'PDF certificate generation'
        ],
        github: 'https://github.com/Gharsallah-Islem',
        icon: '✈️',
        gradient: 'from-sky-500 to-blue-600',
        featured: false
    },
]

export default function ProjectsApp() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(projects[0])
    const [searchQuery, setSearchQuery] = useState('')
    const [filter, setFilter] = useState<'all' | 'featured'>('all')
    const [showList, setShowList] = useState(true)

    const filteredProjects = projects.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
        const matchesFilter = filter === 'all' || (filter === 'featured' && p.featured)
        return matchesSearch && matchesFilter
    })

    const handleProjectSelect = (project: Project) => {
        setSelectedProject(project)
        setShowList(false) // On mobile, show details when project selected
    }

    return (
        <div className="h-full flex flex-col md:flex-row bg-[#191919]">
            {/* Sidebar - Project List */}
            <div className={`${showList ? 'flex' : 'hidden'} md:flex w-full md:w-72 bg-[#202020] border-r border-[#333] flex-col shrink-0`}>
                {/* Header with Search */}
                <div className="p-3 border-b border-[#333]">
                    <div className="flex items-center gap-2 bg-[#2d2d2d] rounded-md px-3 py-2 border border-[#404040] focus-within:border-[#0078d4]">
                        <FaSearch size={12} className="text-white/40" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search projects..."
                            className="flex-1 bg-transparent text-sm outline-none placeholder:text-white/30"
                        />
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-1 px-3 py-2 border-b border-[#333]">
                    <button
                        onClick={() => setFilter('all')}
                        className={`flex-1 py-1.5 text-xs rounded-md transition-colors ${filter === 'all' ? 'bg-[#0078d4] text-white' : 'bg-[#2d2d2d] text-white/60 hover:bg-[#333]'}`}
                    >
                        All Projects
                    </button>
                    <button
                        onClick={() => setFilter('featured')}
                        className={`flex-1 py-1.5 text-xs rounded-md transition-colors flex items-center justify-center gap-1 ${filter === 'featured' ? 'bg-[#0078d4] text-white' : 'bg-[#2d2d2d] text-white/60 hover:bg-[#333]'}`}
                    >
                        <FaStar size={10} /> Featured
                    </button>
                </div>

                {/* Project List */}
                <div className="flex-1 overflow-auto p-2">
                    {filteredProjects.map((project) => (
                        <button
                            key={project.id}
                            onClick={() => handleProjectSelect(project)}
                            className={`
                                w-full text-left p-3 rounded-lg mb-1 transition-all
                                ${selectedProject?.id === project.id
                                    ? 'bg-[#0078d4]/20 border border-[#0078d4]/50'
                                    : 'hover:bg-white/5 border border-transparent'
                                }
                            `}
                        >
                            <div className="flex items-start gap-3">
                                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${project.gradient} flex items-center justify-center text-lg shrink-0`}>
                                    {project.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5">
                                        <h3 className="text-sm font-medium truncate">{project.name}</h3>
                                        {project.featured && <FaStar size={10} className="text-yellow-500 shrink-0" />}
                                    </div>
                                    <p className="text-[11px] text-white/50 truncate">{project.description}</p>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <span className="text-[10px] text-[#60cdff]">{project.year}</span>
                                        <span className="text-white/20">•</span>
                                        <span className="text-[10px] text-white/40">{project.tech.slice(0, 2).join(', ')}</span>
                                    </div>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Stats Footer */}
                <div className="p-3 border-t border-[#333] bg-[#1a1a1a]">
                    <div className="flex items-center justify-between text-xs text-white/50">
                        <span>{filteredProjects.length} projects</span>
                        <a
                            href="https://github.com/Gharsallah-Islem"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-[#60cdff] hover:underline"
                        >
                            <FaGithub size={12} /> View all 26 repos
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Content - Project Details */}
            <div className={`${showList ? 'hidden' : 'flex'} md:flex flex-1 flex-col overflow-hidden min-h-0`}>
                {/* Mobile Back Button + Breadcrumb */}
                <div className="h-10 flex items-center px-4 border-b border-[#333] bg-[#1a1a1a] shrink-0">
                    <button
                        onClick={() => setShowList(true)}
                        className="md:hidden flex items-center gap-2 text-sm text-[#60cdff] mr-3"
                    >
                        <FaArrowLeft size={12} />
                        <span>Back</span>
                    </button>
                    <div className="hidden md:flex items-center gap-1 text-sm text-white/60">
                        <FaCode size={12} />
                        <FaChevronRight size={8} className="mx-1" />
                        <span>Projects</span>
                        {selectedProject && (
                            <>
                                <FaChevronRight size={8} className="mx-1" />
                                <span className="text-white truncate max-w-[150px]">{selectedProject.name}</span>
                            </>
                        )}
                    </div>
                    {/* Mobile title */}
                    <span className="md:hidden text-sm text-white truncate">{selectedProject?.name}</span>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-auto">
                    {selectedProject ? (
                        <div className="p-4 md:p-6">
                            {/* Hero */}
                            <div className={`bg-gradient-to-r ${selectedProject.gradient} rounded-xl md:rounded-2xl p-4 md:p-6 mb-4 md:mb-6`}>
                                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-5">
                                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl md:text-4xl shadow-xl shrink-0">
                                        {selectedProject.icon}
                                    </div>
                                    <div className="flex-1 text-center sm:text-left">
                                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 mb-1">
                                            <h1 className="text-xl md:text-2xl font-bold">{selectedProject.name}</h1>
                                            {selectedProject.featured && (
                                                <span className="px-2 py-0.5 bg-yellow-500/30 text-yellow-200 rounded text-xs flex items-center gap-1">
                                                    <FaStar size={10} /> Featured
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-white/80 text-sm md:text-base mb-3">{selectedProject.longDescription}</p>
                                        <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                                            {selectedProject.github && (
                                                <a
                                                    href={selectedProject.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-md text-sm transition-colors"
                                                >
                                                    <FaGithub /> View Code
                                                </a>
                                            )}
                                            {selectedProject.demo && (
                                                <a
                                                    href={selectedProject.demo}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-white/90 text-black rounded-md text-sm transition-colors"
                                                >
                                                    <FaExternalLinkAlt size={12} /> Live Demo
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tech Stack */}
                            <div className="mb-4 md:mb-6">
                                <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
                                    <FaRocket className="text-[#60cdff]" /> Tech Stack
                                </h2>
                                <div className="flex flex-wrap gap-1.5 md:gap-2">
                                    {selectedProject.tech.map(tech => (
                                        <span
                                            key={tech}
                                            className="px-2 md:px-3 py-1 md:py-1.5 bg-[#252525] border border-[#333] rounded-lg text-xs md:text-sm hover:border-[#0078d4] transition-colors"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Features */}
                            <div>
                                <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
                                    <span>✨</span> Key Features
                                </h2>
                                <div className="grid grid-cols-1 gap-2">
                                    {selectedProject.features.map((feature, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-3 p-3 bg-[#252525] rounded-lg border border-[#333] hover:border-[#0078d4]/30 transition-colors"
                                        >
                                            <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-[#0078d4]/20 flex items-center justify-center text-[#60cdff] font-bold text-xs md:text-sm shrink-0">
                                                {i + 1}
                                            </div>
                                            <span className="text-xs md:text-sm text-white/80">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Empty State */
                        <div className="h-full flex flex-col items-center justify-center text-center p-8">
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-[#252525] border border-[#333] flex items-center justify-center mb-4">
                                <FaCode size={32} className="text-white/20" />
                            </div>
                            <h2 className="text-lg font-semibold mb-2">Select a Project</h2>
                            <p className="text-sm text-white/50 max-w-xs">
                                Choose a project from the sidebar to view its details, tech stack, and features.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
