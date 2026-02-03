import { useState, useRef } from 'react'
import { FaLinkedin, FaGithub, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaPhone, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'
import emailjs from '@emailjs/browser'

// ============================================
// EMAILJS SETUP INSTRUCTIONS:
// ============================================
// 1. Go to https://www.emailjs.com/ and create a free account
// 2. Add an Email Service (Gmail recommended):
//    - Dashboard → Email Services → Add New Service → Gmail
//    - Connect your Gmail account
//    - Copy the "Service ID" (e.g., "service_xxxxxxx")
// 3. Create an Email Template:
//    - Dashboard → Email Templates → Create New Template
//    - Use these template variables in your template:
//      {{from_name}} - Sender's name
//      {{from_email}} - Sender's email
//      {{subject}} - Email subject
//      {{message}} - Message content
//    - Copy the "Template ID" (e.g., "template_xxxxxxx")
// 4. Get your Public Key:
//    - Dashboard → Account → API Keys → Copy "Public Key"
// 5. Replace the values below with your credentials:
// ============================================

const EMAILJS_CONFIG = {
    serviceId: 'YOUR_SERVICE_ID',      // Replace with your Service ID
    templateId: 'YOUR_TEMPLATE_ID',    // Replace with your Template ID  
    publicKey: 'YOUR_PUBLIC_KEY'       // Replace with your Public Key
}

export default function ContactApp() {
    const formRef = useRef<HTMLFormElement>(null)
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
    const [isSending, setIsSending] = useState(false)
    const [showSidebar, setShowSidebar] = useState(false)
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [statusMessage, setStatusMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSending(true)
        setStatus('idle')

        // Check if EmailJS is configured
        if (EMAILJS_CONFIG.serviceId === 'YOUR_SERVICE_ID') {
            // Fallback to mailto if EmailJS not configured
            const mailtoLink = `mailto:islemgharsallah86@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`
            window.open(mailtoLink, '_blank')
            setFormData({ name: '', email: '', subject: '', message: '' })
            setIsSending(false)
            setStatus('success')
            setStatusMessage('Opening your email client...')
            return
        }

        try {
            await emailjs.send(
                EMAILJS_CONFIG.serviceId,
                EMAILJS_CONFIG.templateId,
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    to_email: 'islemgharsallah86@gmail.com'
                },
                EMAILJS_CONFIG.publicKey
            )

            setStatus('success')
            setStatusMessage('Message sent successfully! I\'ll get back to you soon.')
            setFormData({ name: '', email: '', subject: '', message: '' })
        } catch (error) {
            console.error('EmailJS Error:', error)
            setStatus('error')
            setStatusMessage('Failed to send message. Please try again or use the email link.')
        } finally {
            setIsSending(false)
            // Clear status after 5 seconds
            setTimeout(() => {
                setStatus('idle')
                setStatusMessage('')
            }, 5000)
        }
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
                        disabled={isSending || !formData.name || !formData.email || !formData.message}
                        className="flex items-center gap-2 px-4 py-1.5 bg-win-blue rounded text-sm hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FaPaperPlane size={12} />
                        {isSending ? 'Sending...' : 'Send'}
                    </button>
                    <span className="text-white/30 hidden sm:inline">|</span>
                    <span className="text-xs text-white/50 hidden sm:inline">New Message</span>

                    {/* Status Message */}
                    {status !== 'idle' && (
                        <div className={`ml-auto flex items-center gap-2 text-xs ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                            {status === 'success' ? <FaCheckCircle /> : <FaExclamationCircle />}
                            <span className="hidden sm:inline">{statusMessage}</span>
                        </div>
                    )}
                </div>

                {/* Form */}
                <form ref={formRef} onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0 overflow-auto">
                    <div className="border-b border-win-border shrink-0">
                        <div className="flex flex-col sm:flex-row sm:items-center px-4 py-2 border-b border-win-border/50">
                            <span className="text-sm text-white/50 sm:w-20 mb-1 sm:mb-0">To:</span>
                            <span className="text-sm break-all">islemgharsallah86@gmail.com</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center px-4 py-2 border-b border-win-border/50">
                            <span className="text-sm text-white/50 sm:w-20 mb-1 sm:mb-0">Your Name:</span>
                            <input
                                type="text"
                                name="from_name"
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
                                name="from_email"
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
                                name="subject"
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
                        name="message"
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
