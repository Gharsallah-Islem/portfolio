import { useState, useRef, useEffect } from 'react'

interface HistoryItem {
    type: 'input' | 'output' | 'error' | 'special'
    content: string
}

// ASCII Art Logo
const ASCII_LOGO = `
   ██╗███████╗██╗     ███████╗███╗   ███╗
   ██║██╔════╝██║     ██╔════╝████╗ ████║
   ██║███████╗██║     █████╗  ██╔████╔██║
   ██║╚════██║██║     ██╔══╝  ██║╚██╔╝██║
   ██║███████║███████╗███████╗██║ ╚═╝ ██║
   ╚═╝╚══════╝╚══════╝╚══════╝╚═╝     ╚═╝
   Full Stack Developer | AI Enthusiast
`

const MATRIX_RAIN = `
  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
  ░█░█░█░░░█░█░█░░░█░█░█░░░█░█░█░░░█░█░█░░
  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
  ░█████░░░█████░░░█████░░░█████░░░█████░░
  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
  ░░█░░░░░░░█░░░░░░░█░░░░░░░█░░░░░░░█░░░░░
  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
`

const commands: Record<string, string | (() => string)> = {
    help: `
┌─────────────────────────────────────────────────┐
│              AVAILABLE COMMANDS                 │
├─────────────────────────────────────────────────┤
│  ABOUT ME                                       │
│    about      - Who am I?                       │
│    whoami     - Current user identity           │
│    skills     - Technical skillset              │
│    education  - Academic background             │
│    certs      - Certifications                  │
│                                                 │
│  PORTFOLIO                                      │
│    projects   - Featured projects               │
│    experience - Work experience                 │
│    contact    - Get in touch                    │
│                                                 │
│  SOCIAL                                         │
│    github     - Open GitHub profile             │
│    linkedin   - Open LinkedIn                   │
│    email      - Send me an email                │
│    cv         - Download my resume              │
│                                                 │
│  FUN STUFF                                      │
│    neofetch   - System info (like a pro)        │
│    matrix     - Enter the matrix                │
│    ascii      - Display ASCII logo              │
│    cowsay     - A cow says...                   │
│    fortune    - Random programming quote        │
│    joke       - Developer joke                  │
│    coffee     - Brew some coffee                │
│    sudo       - Try to get root access          │
│                                                 │
│  SYSTEM                                         │
│    clear/cls  - Clear terminal                  │
│    date       - Current date/time               │
│    uptime     - Portfolio uptime                │
│    history    - Command history                 │
│    exit       - Close terminal                  │
└─────────────────────────────────────────────────┘
`,
    about: `
╔════════════════════════════════════════════════╗
║            ISLEM GHARSALLAH                    ║
║      Full Stack Developer | AI Enthusiast      ║
╠════════════════════════════════════════════════╣
║                                                ║
║  📍 Location:  Tunisia 🇹🇳                     ║
║  🎓 Education: IT Engineering @ ISET Radès    ║
║  💼 Focus:     Full Stack & AI Development    ║
║                                                ║
║  🚀 Currently building:                        ║
║     Scalable Enterprise Solutions              ║
║                                                ║
║  ☕ Fun fact:                                  ║
║     "I debug with coffee and ship with        ║
║      confidence"                               ║
║                                                ║
╚════════════════════════════════════════════════╝
`,
    whoami: '🧑‍💻 islem@portfolio — Software Engineer from Tunisia 🇹🇳',

    skills: `
┌──────────────────────────────────────────────────┐
│                 TECHNICAL SKILLS                 │
├──────────────────────────────────────────────────┤
│  LANGUAGES     │ Java, Python, TypeScript, JS    │
│                │ Kotlin, PHP, C                  │
├────────────────┴─────────────────────────────────┤
│  FRONTEND      │ Angular, React, Next.js         │
│                │ React Native, Flutter           │
│                │ Tailwind CSS, Material Design   │
├────────────────┴─────────────────────────────────┤
│  BACKEND       │ Spring Boot, FastAPI, Node.js   │
│                │ REST, WebSocket, GraphQL        │
├────────────────┴─────────────────────────────────┤
│  AI/ML         │ TensorFlow, Keras, LSTM         │
│                │ scikit-learn, HuggingFace       │
│                │ LangChain, Pandas, NumPy        │
├────────────────┴─────────────────────────────────┤
│  DATABASES     │ PostgreSQL, MongoDB, MySQL      │
│                │ Redis, Kafka, Spark, Hadoop     │
├────────────────┴─────────────────────────────────┤
│  DEVOPS        │ Docker, Git, GitHub Actions     │
│                │ GitLab CI/CD, Linux             │
└──────────────────────────────────────────────────┘
`,

    projects: `
╔══════════════════════════════════════════════════╗
║               FEATURED PROJECTS                  ║
╠══════════════════════════════════════════════════╣
║                                                  ║
║  🧠 HYPERION ANALYTICS AI (2026)                 ║
║     Self-healing analytics engine                ║
║     Natural language → SQL/Python execution      ║
║     Docker-sandboxed runtime, RAG + pgvector     ║
║     ▸ Spring Boot 3 | Angular 19 | Gemini       ║
║                                                  ║
║  🚗 AUTOPARTS E-COMMERCE (2025)                  ║
║     Full-stack with AI visual search             ║
║     CNN EfficientNet — 97% accuracy              ║
║     Real-time GPS tracking, Stripe payments      ║
║     ▸ Spring Boot | Angular 18 | TensorFlow     ║
║                                                  ║
║  📈 AI STOCK TRADING PLATFORM (2025)             ║
║     LSTM-based price predictions                 ║
║     AAPL, MSFT, S&P 500 analysis                ║
║     Real-time WebSocket updates                  ║
║     ▸ Angular 18 | Spring Boot 3 | Keras        ║
║                                                  ║
║  💼 UPTOHIRE RECRUITMENT (2025)                  ║
║     AI resume scoring & ATS analysis             ║
║     Job scraping from 20+ platforms              ║
║     Algorithmic bias detection                   ║
║     ▸ React 18 | Spring Boot 3.4 | CoreNLP      ║
║                                                  ║
╚══════════════════════════════════════════════════╝

  Type 'github' to view all 26 repositories.
`,

    experience: `
┌──────────────────────────────────────────────────┐
│               WORK EXPERIENCE                    │
├──────────────────────────────────────────────────┤
│                                                  │
│  💼 Full Stack Developer Intern                  │
│     Office of Civil Aviation (OACA)              │
│     📅 Jan 2025 - Feb 2025 | Charguia, Tunisia  │
│     ────────────────────────────────────────     │
│     • Digital exam platform with Spring Boot     │
│     • AI question generation (Gemini API)        │
│     • Interactive chatbot + analytics dashboard  │
│                                                  │
│  🔧 IT Technician Intern                         │
│     National Sanitation Office (ONAS)            │
│     📅 Jan 2024 - Feb 2024 | Tunis, Tunisia     │
│     ────────────────────────────────────────     │
│     • Network infrastructure management          │
│     • System security optimization               │
│                                                  │
└──────────────────────────────────────────────────┘
`,

    education: `
  🎓 Bachelor's Degree in Information Technology
     Information Systems Development
     
     🏫 ISET Radès, Tunisia
     📅 Sept. 2023 — June 2026
     
     📚 Coursework:
        • Object-Oriented Programming
        • Web Frameworks
        • Mobile Development
        • Artificial Intelligence
        • Big Data Analytics
        • UML & Software Design
`,

    certs: `
  🏆 CERTIFICATIONS
  
  ├─ 🐍 Python Essentials 1 & 2
  │     Cisco Networking Academy
  │
  ├─ 🤖 Machine Learning
  │     Columbia University
  │
  └─ 🔐 Ethical Hacker
        Cisco Networking Academy

  🔹 ASSOCIATIONS
     • IEEE CS Chapter — ISET Radès
     • Securinets — CTF Competitions
`,

    contact: `
  ╔════════════════════════════════════════╗
  ║           GET IN TOUCH                 ║
  ╠════════════════════════════════════════╣
  ║                                        ║
  ║  📧  islemgharsallah86@gmail.com       ║
  ║  📱  +216 26 598 197                   ║
  ║  🔗  linkedin.com/in/islem-gharsallah-649a63305  ║
  ║  💻  github.com/Gharsallah-Islem       ║
  ║  📍  Tunisia 🇹🇳                        ║
  ║                                        ║
  ╚════════════════════════════════════════╝
  
  Type 'email' to open mail client.
`,

    neofetch: `
        ⣀⣤⣴⣶⣶⣶⣶⣶⣶⣤⣤⣀⡀
      ⣀⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⣀
    ⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄
   ⣴⣿⣿⣿⣿⣿⣿⣿⣿⠟⠛⠛⠛⠛⠻⢿⣿⣿⣿⣿⣿⣿⣿⣿⣦    islem@portfolio
  ⣼⣿⣿⣿⣿⣿⣿⡿⠋         ⠙⢿⣿⣿⣿⣿⣿⣿⣧   ─────────────────
  ⣿⣿⣿⣿⣿⣿⠟⠁            ⠈⠻⣿⣿⣿⣿⣿⣿   OS: Windows 11 (Portfolio)
  ⣿⣿⣿⣿⣿⠏              ⠹⣿⣿⣿⣿⣿   Host: React 18 + TypeScript
  ⣿⣿⣿⣿⡟               ⢻⣿⣿⣿⣿   Kernel: Vite 6.0
  ⣿⣿⣿⣿⡇               ⢸⣿⣿⣿⣿   Shell: PowerShell (Fake)
  ⣿⣿⣿⣿⣧               ⣼⣿⣿⣿⣿   DE: Windows 11 Clone
  ⣿⣿⣿⣿⣿⡀              ⢀⣿⣿⣿⣿⣿   WM: Zustand State Manager
  ⢻⣿⣿⣿⣿⣷⡀            ⢀⣾⣿⣿⣿⣿⡟   Theme: Glassmorphism Dark
  ⠸⣿⣿⣿⣿⣿⣷⣄⡀        ⢀⣠⣾⣿⣿⣿⣿⠇   Icons: Custom Fluent SVG
   ⠹⣿⣿⣿⣿⣿⣿⣿⣷⣶⣤⣤⣶⣾⣿⣿⣿⣿⣿⡿⠏    CPU: Your Brain @ ∞GHz
    ⠙⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋     RAM: ☕ Caffeine-Powered
     ⠈⠻⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠁      Uptime: Building since 2023
        ⠉⠛⠿⠿⣿⣿⣿⣿⠿⠿⠛⠉
`,

    ascii: ASCII_LOGO,

    matrix: MATRIX_RAIN + '\n  Wake up, Islem... The Matrix has you.',

    cowsay: () => {
        const messages = [
            "Moo! Did you try turning it off and on again?",
            "I'm not a bug, I'm a feature! Moo~",
            "Coffee is the answer. Moo!",
            "Git commit -m 'It works on my machine' Moo!",
        ]
        const msg = messages[Math.floor(Math.random() * messages.length)]
        return `
   ${'_'.repeat(msg.length + 2)}
  < ${msg} >
   ${'-'.repeat(msg.length + 2)}
          \\   ^__^
           \\  (oo)\\_______
              (__)\\       )\\/\\
                  ||----w |
                  ||     ||
`
    },

    fortune: () => {
        const fortunes = [
            '"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." — Martin Fowler',
            '"First, solve the problem. Then, write the code." — John Johnson',
            '"Code is like humor. When you have to explain it, it\'s bad." — Cory House',
            '"Simplicity is the soul of efficiency." — Austin Freeman',
            '"Java is to JavaScript what Car is to Carpet." — Chris Heilmann',
            '"There are only two hard things in CS: cache invalidation and naming things." — Phil Karlton',
            '"It works on my machine!" — Every Developer Ever',
            '"I don\'t always test my code, but when I do, I do it in production." — Most Dangerous Developer',
        ]
        return '\n  🔮 ' + fortunes[Math.floor(Math.random() * fortunes.length)] + '\n'
    },

    joke: () => {
        const jokes = [
            "Why do programmers prefer dark mode?\nBecause light attracts bugs! 🐛",
            "A SQL query walks into a bar, walks up to two tables and asks...\n'Can I join you?' 🍺",
            "Why do Java developers wear glasses?\nBecause they don't C# 👓",
            "!false — It's funny because it's true 😄",
            "A programmer's wife says: 'Go to the store and get a loaf of bread. If they have eggs, get a dozen.'\nHe comes back with 12 loaves of bread. 🍞",
            "What's a programmer's favorite hangout place?\nFoo Bar 🍸",
        ]
        return '\n  😂 ' + jokes[Math.floor(Math.random() * jokes.length)] + '\n'
    },

    coffee: `
          ) (
         (   ) )
          ) ( (
        _______)_
     .-'---------|  
    ( C|/\\/\\/\\/\\/|
     '-./\\/\\/\\/\\/|
       '_________'
        '-------'
  
  ☕ Brewing fresh coffee...
  ☕ Adding caffeine...
  ☕ Ready to code!
`,

    sudo: `
  ⚠️  Permission denied.

  Nice try! But this portfolio runs in user-mode only.
  
  You can't sudo your way into my heart... 
  but you CAN contact me at islemgharsallah86@gmail.com 💌
`,

    date: () => new Date().toString(),

    uptime: () => {
        const start = new Date('2023-09-01')
        const now = new Date()
        const diff = now.getTime() - start.getTime()
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        return `\n  ⏱️  Portfolio uptime: ${days} days\n  📅 Since: September 2023 (ISET Radès journey)\n`
    },
}

export default function TerminalApp() {
    const [history, setHistory] = useState<HistoryItem[]>([
        {
            type: 'output', content: `Windows PowerShell
Copyright (C) Microsoft Corporation. For portfolio use only.

  ██╗███████╗██╗     ███████╗███╗   ███╗
  ██║██╔════╝██║     ██╔════╝████╗ ████║
  ██║███████╗██║     █████╗  ██╔████╔██║
  ██║╚════██║██║     ██╔══╝  ██║╚██╔╝██║
  ██║███████║███████╗███████╗██║ ╚═╝ ██║
  ╚═╝╚══════╝╚══════╝╚══════╝╚═╝     ╚═╝

Welcome! Type "help" to see available commands.
` }
    ])
    const [input, setInput] = useState('')
    const [commandHistory, setCommandHistory] = useState<string[]>([])
    const [historyIndex, setHistoryIndex] = useState(-1)
    const inputRef = useRef<HTMLInputElement>(null)
    const terminalRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight
        }
    }, [history])

    const handleCommand = (cmd: string) => {
        const trimmedCmd = cmd.trim().toLowerCase()

        // Add to command history
        if (trimmedCmd) {
            setCommandHistory(prev => [...prev, cmd])
            setHistoryIndex(-1)
        }

        setHistory(prev => [...prev, { type: 'input', content: `PS C:\\Users\\Visitor> ${cmd}` }])

        if (trimmedCmd === 'clear' || trimmedCmd === 'cls') {
            setHistory([])
            return
        }

        if (trimmedCmd === 'exit') {
            setHistory(prev => [...prev, { type: 'output', content: 'Goodbye! 👋 (Just kidding, I\'m still here)' }])
            return
        }

        if (trimmedCmd === 'github') {
            window.open('https://github.com/Gharsallah-Islem', '_blank')
            setHistory(prev => [...prev, { type: 'output', content: '🚀 Opening GitHub profile... (26 repositories)' }])
            return
        }

        if (trimmedCmd === 'linkedin') {
            window.open('https://linkedin.com/in/islem-gharsallah-649a63305', '_blank')
            setHistory(prev => [...prev, { type: 'output', content: '🔗 Opening LinkedIn profile...' }])
            return
        }

        if (trimmedCmd === 'email') {
            window.open('mailto:islemgharsallah86@gmail.com', '_blank')
            setHistory(prev => [...prev, { type: 'output', content: '📧 Opening email client for islemgharsallah86@gmail.com...' }])
            return
        }

        if (trimmedCmd === 'cv' || trimmedCmd === 'resume') {
            window.open('/portfolio/CV_Islem_Gharsallah_eng.pdf', '_blank')
            setHistory(prev => [...prev, { type: 'output', content: '📄 Downloading CV_Islem_Gharsallah_eng.pdf...' }])
            return
        }

        if (trimmedCmd === 'history') {
            const historyOutput = commandHistory.map((c, i) => `  ${i + 1}  ${c}`).join('\n')
            setHistory(prev => [...prev, { type: 'output', content: historyOutput || '  No command history.' }])
            return
        }

        const commandHandler = commands[trimmedCmd]
        if (commandHandler) {
            const output = typeof commandHandler === 'function' ? commandHandler() : commandHandler
            setHistory(prev => [...prev, { type: 'output', content: output }])
        } else if (trimmedCmd) {
            setHistory(prev => [...prev, {
                type: 'error',
                content: `'${trimmedCmd}' is not recognized as a command.\nType 'help' for available commands.`
            }])
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleCommand(input)
            setInput('')
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            if (commandHistory.length > 0) {
                const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex
                setHistoryIndex(newIndex)
                setInput(commandHistory[commandHistory.length - 1 - newIndex] || '')
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault()
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1
                setHistoryIndex(newIndex)
                setInput(commandHistory[commandHistory.length - 1 - newIndex] || '')
            } else {
                setHistoryIndex(-1)
                setInput('')
            }
        } else if (e.key === 'l' && e.ctrlKey) {
            e.preventDefault()
            setHistory([])
        }
    }

    return (
        <div
            className="h-full bg-[#0c0c0c] text-white font-mono text-sm p-4 overflow-auto cursor-text"
            ref={terminalRef}
            onClick={() => inputRef.current?.focus()}
        >
            {history.map((item, index) => (
                <div
                    key={index}
                    className={`whitespace-pre-wrap mb-1 ${item.type === 'input' ? 'text-[#60cdff]' :
                            item.type === 'error' ? 'text-red-400' :
                                'text-white/90'
                        }`}
                >
                    {item.content}
                </div>
            ))}

            <div className="flex">
                <span className="text-[#60cdff]">PS C:\Users\Visitor&gt; </span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent outline-none caret-white"
                    autoFocus
                    spellCheck={false}
                    autoComplete="off"
                />
            </div>
        </div>
    )
}
