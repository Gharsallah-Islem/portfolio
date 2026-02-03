interface Experience {
    id: string
    title: string
    company: string
    location: string
    period: string
    description: string[]
    type: 'work' | 'education'
}

const experiences: Experience[] = [
    {
        id: '1',
        title: 'Full Stack Developer Intern',
        company: 'Office of Civil Aviation and Airports (OACA)',
        location: 'Charguia, Tunisia',
        period: 'Jan. 2025 - Feb. 2025',
        description: [
            'Developed a digital exam management platform with automated result analysis using Spring Boot and Angular',
            'Integrated AI modules using Google Gemini API for automatic exam question generation',
            'Designed an interactive chatbot and analytics dashboard with data visualization'
        ],
        type: 'work'
    },
    {
        id: '2',
        title: 'IT Technician Intern',
        company: 'National Sanitation Office (ONAS)',
        location: 'Tunis, Tunisia',
        period: 'Jan. 2024 - Feb. 2024',
        description: [
            'Managed network infrastructure and performed system maintenance across the organization',
            'Improved system security and performance through configuration optimization'
        ],
        type: 'work'
    },
    {
        id: '3',
        title: "Bachelor's Degree in Information Technology",
        company: 'Higher Institute of Technological Studies of Radès (ISET Radès)',
        location: 'Radès, Tunisia',
        period: 'Sept. 2023 - June 2026',
        description: [
            'Specialization: Information Systems Development',
            'Coursework: OOP, Web Frameworks, Mobile Development, AI, Big Data, UML'
        ],
        type: 'education'
    },
]

export default function ExperienceApp() {
    return (
        <div className="h-full bg-[#1e1e1e] font-mono">
            {/* VS Code style header - Hidden on mobile */}
            <div className="hidden sm:flex items-center gap-4 px-4 py-2 bg-[#2d2d2d] border-b border-[#3d3d3d]">
                <span className="text-xs text-white/60">File</span>
                <span className="text-xs text-white/60">Edit</span>
                <span className="text-xs text-white/60">View</span>
            </div>

            {/* Tab */}
            <div className="flex bg-[#252526] border-b border-[#3d3d3d]">
                <div className="px-4 py-2 bg-[#1e1e1e] text-sm flex items-center gap-2 border-r border-[#3d3d3d]">
                    <span className="text-yellow-400">⚡</span>
                    experience.ts
                </div>
            </div>

            {/* Content */}
            <div className="p-4 md:p-6 overflow-auto h-[calc(100%-40px)] sm:h-[calc(100%-80px)]">
                <pre className="text-xs md:text-sm text-white/90 whitespace-pre-wrap">
                    {`/* ============================================
   ISLEM GHARSALLAH - Experience & Education
   Last Modified: ${new Date().toLocaleDateString()}
   ============================================ */

`}
                </pre>

                {experiences.map((exp, index) => (
                    <div key={exp.id} className="mb-4 md:mb-6">
                        <pre className="text-[10px] sm:text-xs md:text-sm overflow-x-auto">
                            <span className="text-gray-500">{'// '}{exp.type === 'work' ? '💼 Work Experience' : '🎓 Education'}</span>
                            {'\n'}
                            <span className="text-purple-400">{'interface '}</span>
                            <span className="text-yellow-300">{exp.type === 'work' ? 'WorkExperience' : 'Education'}_{index + 1}</span>
                            <span className="text-white">{' {'}</span>
                            {'\n'}
                            <span className="text-white">{'  '}</span>
                            <span className="text-blue-300">title</span>
                            <span className="text-white">{': '}</span>
                            <span className="text-orange-300">"{exp.title}"</span>
                            <span className="text-white">{';\n'}</span>
                            <span className="text-white">{'  '}</span>
                            <span className="text-blue-300">{exp.type === 'work' ? 'company' : 'institution'}</span>
                            <span className="text-white">{': '}</span>
                            <span className="text-orange-300">"{exp.company}"</span>
                            <span className="text-white">{';\n'}</span>
                            <span className="text-white">{'  '}</span>
                            <span className="text-blue-300">location</span>
                            <span className="text-white">{': '}</span>
                            <span className="text-orange-300">"{exp.location}"</span>
                            <span className="text-white">{';\n'}</span>
                            <span className="text-white">{'  '}</span>
                            <span className="text-blue-300">period</span>
                            <span className="text-white">{': '}</span>
                            <span className="text-orange-300">"{exp.period}"</span>
                            <span className="text-white">{';\n'}</span>
                            <span className="text-white">{'  '}</span>
                            <span className="text-blue-300">highlights</span>
                            <span className="text-white">{': [\n'}</span>
                            {exp.description.map((desc, i) => (
                                <span key={i}>
                                    <span className="text-white">{'    '}</span>
                                    <span className="text-orange-300">"{desc}"</span>
                                    <span className="text-white">{i < exp.description.length - 1 ? ',\n' : '\n'}</span>
                                </span>
                            ))}
                            <span className="text-white">{'  ];\n'}</span>
                            <span className="text-white">{'}'}</span>
                        </pre>
                    </div>
                ))}

                <pre className="text-sm text-gray-500 mt-8">
                    {`/* ============================================
   EOF - View Projects for more details
   ============================================ */`}
                </pre>
            </div>
        </div>
    )
}
