import { FaDownload, FaSearchPlus, FaSearchMinus, FaPrint, FaExpand } from 'react-icons/fa'
import { useState } from 'react'

export default function ResumeApp() {
    const [zoom, setZoom] = useState(100)

    const handleDownload = () => {
        window.open('/portfolio/CV_Islem_Gharsallah_eng.pdf', '_blank')
    }

    return (
        <div className="h-full flex flex-col bg-[#1e1e1e]">
            {/* PDF Viewer Toolbar */}
            <div className="h-10 flex items-center justify-between px-2 md:px-3 bg-[#2d2d30] border-b border-[#3d3d3d] shrink-0">
                <div className="flex items-center gap-2 min-w-0">
                    <div className="flex items-center gap-1 bg-[#3d3d3d] rounded px-2 py-1">
                        <span className="text-xs text-white/70">📄</span>
                        <span className="text-xs truncate max-w-[100px] sm:max-w-none">CV_Islem_Gharsallah.pdf</span>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    {/* Zoom controls - hidden on mobile */}
                    <div className="hidden sm:flex items-center gap-1">
                        <button
                            onClick={() => setZoom(Math.max(50, zoom - 10))}
                            className="p-1.5 hover:bg-white/10 rounded transition-colors"
                            title="Zoom out"
                        >
                            <FaSearchMinus size={12} />
                        </button>
                        <span className="text-xs px-2 min-w-[40px] text-center">{zoom}%</span>
                        <button
                            onClick={() => setZoom(Math.min(150, zoom + 10))}
                            className="p-1.5 hover:bg-white/10 rounded transition-colors"
                            title="Zoom in"
                        >
                            <FaSearchPlus size={12} />
                        </button>
                        <div className="w-px h-4 bg-white/20 mx-1" />
                        <button className="p-1.5 hover:bg-white/10 rounded transition-colors" title="Print">
                            <FaPrint size={12} />
                        </button>
                        <button className="hidden sm:block p-1.5 hover:bg-white/10 rounded transition-colors" title="Fullscreen">
                            <FaExpand size={12} />
                        </button>
                    </div>
                    <div className="hidden sm:block w-px h-4 bg-white/20 mx-1" />
                    <button
                        onClick={handleDownload}
                        className="flex items-center gap-1.5 px-3 py-1 bg-[#0078d4] rounded text-xs hover:bg-[#006cbd] transition-colors"
                    >
                        <FaDownload size={10} />
                        Download
                    </button>
                </div>
            </div>

            {/* PDF Preview Area */}
            <div className="flex-1 bg-[#525659] overflow-auto">
                <div className="min-h-full p-6 flex justify-center">
                    <div
                        className="bg-white text-black shadow-2xl origin-top transition-transform"
                        style={{
                            width: `${6.5 * zoom}px`,
                            minHeight: `${9.2 * zoom}px`,
                            transform: `scale(${zoom / 100})`,
                            transformOrigin: 'top center',
                            padding: `${0.4 * zoom}px`,
                            fontSize: `${0.11 * zoom}px`,
                            lineHeight: '1.5',
                        }}
                    >
                        {/* Resume Header */}
                        <div className="text-center mb-4 pb-3 border-b-2 border-gray-800">
                            <h1 style={{ fontSize: `${0.22 * zoom}px` }} className="font-bold text-gray-900 tracking-wide">ISLEM GHARSALLAH</h1>
                            <p style={{ fontSize: `${0.12 * zoom}px` }} className="text-blue-700 font-medium mt-1">Information Technology Student | Full Stack Developer | AI Enthusiast</p>
                            <div className="flex justify-center flex-wrap gap-3 mt-2 text-gray-600" style={{ fontSize: `${0.09 * zoom}px` }}>
                                <span>📱 +216 26 598 197</span>
                                <span>📧 islemgharsallah86@gmail.com</span>
                                <span>🔗 linkedin.com/in/islem-gharsallah-649a63305</span>
                                <span>💻 github.com/Gharsallah-Islem</span>
                            </div>
                        </div>

                        {/* Education */}
                        <div className="mb-4">
                            <h2 style={{ fontSize: `${0.11 * zoom}px` }} className="font-bold text-gray-800 border-b border-gray-300 pb-1 mb-2 uppercase tracking-wider">Education</h2>
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-semibold text-gray-800">Higher Institute of Technological Studies of Radès (ISET Radès)</p>
                                    <p className="text-gray-600 italic">Bachelor's Degree in Information Technology — Information Systems Development</p>
                                </div>
                                <div className="text-right text-gray-500 whitespace-nowrap" style={{ fontSize: `${0.09 * zoom}px` }}>
                                    <p>Radès, Tunisia</p>
                                    <p>Sept. 2023 – June 2026</p>
                                </div>
                            </div>
                            <p className="mt-1 text-gray-600">• Relevant Coursework: Object-Oriented Programming, Web Frameworks, Mobile Development, Artificial Intelligence, Big Data, UML</p>
                        </div>

                        {/* Experience */}
                        <div className="mb-4">
                            <h2 style={{ fontSize: `${0.11 * zoom}px` }} className="font-bold text-gray-800 border-b border-gray-300 pb-1 mb-2 uppercase tracking-wider">Experience</h2>

                            <div className="mb-3">
                                <div className="flex justify-between">
                                    <span className="font-semibold text-gray-800">Full Stack Developer Intern</span>
                                    <span className="text-gray-500" style={{ fontSize: `${0.09 * zoom}px` }}>Jan. 2025 – Feb. 2025</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 italic">Office of Civil Aviation and Airports (OACA)</span>
                                    <span className="text-gray-500" style={{ fontSize: `${0.09 * zoom}px` }}>Charguia, Tunisia</span>
                                </div>
                                <ul className="mt-1 text-gray-700 list-disc list-inside space-y-0.5">
                                    <li>Developed a digital exam management platform with automated result analysis using Spring Boot and Angular</li>
                                    <li>Integrated AI modules using Google Gemini API for automatic exam question generation</li>
                                    <li>Designed an interactive chatbot and analytics dashboard with data visualization</li>
                                </ul>
                            </div>

                            <div>
                                <div className="flex justify-between">
                                    <span className="font-semibold text-gray-800">IT Technician Intern</span>
                                    <span className="text-gray-500" style={{ fontSize: `${0.09 * zoom}px` }}>Jan. 2024 – Feb. 2024</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 italic">National Sanitation Office (ONAS)</span>
                                    <span className="text-gray-500" style={{ fontSize: `${0.09 * zoom}px` }}>Tunis, Tunisia</span>
                                </div>
                                <ul className="mt-1 text-gray-700 list-disc list-inside space-y-0.5">
                                    <li>Managed network infrastructure and performed system maintenance across the organization</li>
                                    <li>Improved system security and performance through configuration optimization</li>
                                </ul>
                            </div>
                        </div>

                        {/* Projects */}
                        <div className="mb-4">
                            <h2 style={{ fontSize: `${0.11 * zoom}px` }} className="font-bold text-gray-800 border-b border-gray-300 pb-1 mb-2 uppercase tracking-wider">Projects</h2>

                            <div className="mb-2">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-gray-800">Hyperion Analytics AI</span>
                                    <span className="text-gray-500" style={{ fontSize: `${0.09 * zoom}px` }}>2026</span>
                                </div>
                                <p className="text-blue-600" style={{ fontSize: `${0.085 * zoom}px` }}>Spring Boot 3, Angular 19, Google Gemini, Docker, PostgreSQL, WebSocket</p>
                                <ul className="text-gray-700 list-disc list-inside">
                                    <li>Built an AI-powered self-healing analytics engine that converts natural language to SQL/Python execution</li>
                                    <li>Implemented secure Docker-sandboxed Python runtime with memory limits and network isolation</li>
                                </ul>
                            </div>

                            <div className="mb-2">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-gray-800">AutoParts E-Commerce Platform</span>
                                    <span className="text-gray-500" style={{ fontSize: `${0.09 * zoom}px` }}>2025</span>
                                </div>
                                <p className="text-blue-600" style={{ fontSize: `${0.085 * zoom}px` }}>Spring Boot, Angular 18, TensorFlow, PostgreSQL, Kotlin</p>
                                <ul className="text-gray-700 list-disc list-inside">
                                    <li>Full-stack e-commerce with AI-powered visual search using CNN EfficientNet (97% accuracy)</li>
                                    <li>Real-time delivery tracking with WebSocket and Leaflet Maps, Stripe payment integration</li>
                                </ul>
                            </div>

                            <div className="mb-2">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-gray-800">AI Stock Trading Platform</span>
                                    <span className="text-gray-500" style={{ fontSize: `${0.09 * zoom}px` }}>2025</span>
                                </div>
                                <p className="text-blue-600" style={{ fontSize: `${0.085 * zoom}px` }}>Angular 18, Spring Boot 3, TensorFlow/Keras, Chart.js</p>
                                <ul className="text-gray-700 list-disc list-inside">
                                    <li>Trading platform with LSTM-based stock price predictions for AAPL, MSFT, and S&P 500</li>
                                </ul>
                            </div>

                            <div>
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-gray-800">UpToHire Recruitment Platform</span>
                                    <span className="text-gray-500" style={{ fontSize: `${0.09 * zoom}px` }}>2025</span>
                                </div>
                                <p className="text-blue-600" style={{ fontSize: `${0.085 * zoom}px` }}>React 18, Spring Boot 3.4, Stanford CoreNLP, HuggingFace</p>
                                <ul className="text-gray-700 list-disc list-inside">
                                    <li>AI recruitment platform with ATS scoring and semantic candidate matching</li>
                                </ul>
                            </div>
                        </div>

                        {/* Technical Skills */}
                        <div className="mb-3">
                            <h2 style={{ fontSize: `${0.11 * zoom}px` }} className="font-bold text-gray-800 border-b border-gray-300 pb-1 mb-2 uppercase tracking-wider">Technical Skills</h2>
                            <div className="text-gray-700 space-y-0.5">
                                <p><strong>Languages:</strong> Java, Python, TypeScript, JavaScript, Kotlin, PHP, C</p>
                                <p><strong>Frontend:</strong> Angular, React, Next.js, React Native, Flutter, Tailwind CSS, Material Design</p>
                                <p><strong>Backend:</strong> Spring Boot, FastAPI, Node.js, Symfony, REST APIs, WebSocket, GraphQL</p>
                                <p><strong>Databases:</strong> PostgreSQL, MongoDB, MySQL, Redis, Apache Kafka, Spark, Hadoop</p>
                                <p><strong>AI/ML:</strong> TensorFlow, Keras, LSTM, scikit-learn, Pandas, NumPy, HuggingFace, LangChain</p>
                                <p><strong>DevOps:</strong> Docker, Git, GitHub Actions, GitLab CI/CD, Linux</p>
                            </div>
                        </div>

                        {/* Certifications */}
                        <div>
                            <h2 style={{ fontSize: `${0.11 * zoom}px` }} className="font-bold text-gray-800 border-b border-gray-300 pb-1 mb-2 uppercase tracking-wider">Certifications & Activities</h2>
                            <p className="text-gray-700"><strong>Certifications:</strong> Python Essentials 1 & 2 (Cisco) · Machine Learning (Columbia University) · Ethical Hacker (Cisco)</p>
                            <p className="text-gray-700"><strong>Associations:</strong> IEEE CS Chapter & Securinets ISET Radès — Technical workshops, CTF competitions</p>
                            <p className="text-gray-700"><strong>Languages:</strong> Arabic (Native), French (Fluent), English (Professional)</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
