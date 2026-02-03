import { useState } from 'react'
import { FaLinkedin, FaGithub, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaPhone } from 'react-icons/fa'

export default function ContactApp() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
    const [isSending, setIsSending] = useState(false)
    const [showSidebar, setShowSidebar] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSending(true)

        // Open mailto link
        const mailtoLink = `mailto:islemgharsallah86@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`
        window.open(mailtoLink, '_blank')

        setTimeout(() => {
            setFormData({ name: '', email: '', subject: '', message: '' })
            setIsSending(false)
        }, 1000)
    }

    return (
        <div className="h-full flex flex-col md:flex-row">
            {/* Mobile Header - Toggle Contact Info */}
            <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-win-border bg-win-surface/30">
                <h2 className="text-sm font-semibold">New Message</h2>
                <button
                    onClick={() => setShowSidebar(!showSidebar)}
                    className="px-3 py-1.5 text-xs bg-win-blue rounded-md"
                >
                    {showSidebar ? 'Compose' : 'Contact Info'}
                </button>
            </div>

            {/* Sidebar - Hidden on mobile by default */}
            <div className={`${showSidebar ? 'block' : 'hidden'} md:block w-full md:w-64 bg-win-surface/30 border-r border-win-border p-4 shrink-0 overflow-auto`}>
                <h2 className="text-sm font-semibold text-white/50 mb-4">CONTACT INFO</h2>

                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <FaEnvelope className="text-win-blue mt-1 shrink-0" />
                        <div className="min-w-0">
                            <p className="text-xs text-white/50">Email</p>
                            <a href="mailto:islemgharsallah86@gmail.com" className="text-sm hover:text-win-blue break-all">
                                islemgharsallah86@gmail.com
                            </a>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <FaPhone className="text-green-400 mt-1 shrink-0" />
                        <div>
                            <p className="text-xs text-white/50">Phone</p>
                            <a href="tel:+21626598197" className="text-sm hover:text-win-blue">
                                +216 26 598 197
                            </a>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <FaMapMarkerAlt className="text-red-400 mt-1 shrink-0" />
                        <div>
                            <p className="text-xs text-white/50">Location</p>
                            <p className="text-sm">Tunisia 🇹🇳</p>
                        </div>
                    </div>

                    <hr className="border-win-border" />

                    <div className="flex items-start gap-3">
                        <FaLinkedin className="text-blue-500 mt-1 shrink-0" />
                        <div className="min-w-0">
                            <p className="text-xs text-white/50">LinkedIn</p>
                            <a
                                href="https://linkedin.com/in/islem-gharsallah-649a63305/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-win-blue hover:underline"
                            >
                                islem-gharsallah
                            </a>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <FaGithub className="mt-1 shrink-0" />
                        <div>
                            <p className="text-xs text-white/50">GitHub</p>
                            <a
                                href="https://github.com/Gharsallah-Islem"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-win-blue hover:underline"
                            >
                                Gharsallah-Islem
                            </a>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-6">
                    <h2 className="text-sm font-semibold text-white/50 mb-3">QUICK ACTIONS</h2>
                    <div className="space-y-2">
                        <a
                            href="mailto:islemgharsallah86@gmail.com"
                            className="flex items-center gap-2 px-3 py-2 bg-win-blue rounded-win text-sm hover:bg-blue-600 transition-colors w-full"
                        >
                            <FaEnvelope size={14} />
                            Send Email
                        </a>
                        <a
                            href="https://linkedin.com/in/islem-gharsallah-649a63305/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-2 bg-[#0077B5] rounded-win text-sm hover:opacity-90 transition-colors w-full"
                        >
                            <FaLinkedin size={14} />
                            Connect on LinkedIn
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Content - Email Compose */}
            <div className={`${showSidebar ? 'hidden' : 'flex'} md:flex flex-1 flex-col min-h-0`}>
                {/* Toolbar */}
                <div className="h-12 flex items-center gap-2 px-4 border-b border-win-border bg-win-surface/20 shrink-0">
                    <button
                        onClick={handleSubmit}
                        disabled={isSending}
                        className="flex items-center gap-2 px-4 py-1.5 bg-win-blue rounded text-sm hover:bg-blue-600 transition-colors disabled:opacity-50"
                    >
                        <FaPaperPlane size={12} />
                        {isSending ? 'Opening...' : 'Send'}
                    </button>
                    <span className="text-white/30 hidden sm:inline">|</span>
                    <span className="text-xs text-white/50 hidden sm:inline">New Message</span>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0 overflow-auto">
                    <div className="border-b border-win-border shrink-0">
                        <div className="flex flex-col sm:flex-row sm:items-center px-4 py-2 border-b border-win-border/50">
                            <span className="text-sm text-white/50 sm:w-20 mb-1 sm:mb-0">To:</span>
                            <span className="text-sm break-all">islemgharsallah86@gmail.com</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center px-4 py-2 border-b border-win-border/50">
                            <span className="text-sm text-white/50 sm:w-20 mb-1 sm:mb-0">Your Name:</span>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                placeholder="John Doe"
                                className="flex-1 bg-transparent outline-none text-sm placeholder:text-white/30"
                                required
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center px-4 py-2 border-b border-win-border/50">
                            <span className="text-sm text-white/50 sm:w-20 mb-1 sm:mb-0">Your Email:</span>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                placeholder="you@example.com"
                                className="flex-1 bg-transparent outline-none text-sm placeholder:text-white/30"
                                required
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center px-4 py-2">
                            <span className="text-sm text-white/50 sm:w-20 mb-1 sm:mb-0">Subject:</span>
                            <input
                                type="text"
                                value={formData.subject}
                                onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                placeholder="Job Opportunity / Collaboration"
                                className="flex-1 bg-transparent outline-none text-sm placeholder:text-white/30"
                                required
                            />
                        </div>
                    </div>

                    {/* Message Body */}
                    <textarea
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Write your message here..."
                        className="flex-1 p-4 bg-transparent outline-none text-sm resize-none placeholder:text-white/30 min-h-[150px]"
                        required
                    />
                </form>
            </div>
        </div>
    )
}
