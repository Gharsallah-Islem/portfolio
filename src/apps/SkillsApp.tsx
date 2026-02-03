interface SkillCategory {
    name: string
    icon: string
    skills: { name: string; level: number }[]
}

const skillCategories: SkillCategory[] = [
    {
        name: 'Languages',
        icon: '💻',
        skills: [
            { name: 'Java', level: 92 },
            { name: 'TypeScript', level: 90 },
            { name: 'Python', level: 88 },
            { name: 'JavaScript', level: 90 },
            { name: 'Kotlin', level: 75 },
        ]
    },
    {
        name: 'Frontend',
        icon: '🎨',
        skills: [
            { name: 'Angular', level: 95 },
            { name: 'React / Next.js', level: 88 },
            { name: 'React Native / Flutter', level: 78 },
            { name: 'Tailwind CSS', level: 92 },
            { name: 'Material Design', level: 85 },
        ]
    },
    {
        name: 'Backend',
        icon: '⚙️',
        skills: [
            { name: 'Spring Boot', level: 95 },
            { name: 'FastAPI', level: 82 },
            { name: 'Node.js', level: 80 },
            { name: 'REST APIs / GraphQL', level: 90 },
            { name: 'WebSocket', level: 88 },
        ]
    },
    {
        name: 'AI/ML',
        icon: '🤖',
        skills: [
            { name: 'TensorFlow / Keras', level: 85 },
            { name: 'LSTM Networks', level: 82 },
            { name: 'scikit-learn', level: 88 },
            { name: 'HuggingFace / LangChain', level: 80 },
            { name: 'Pandas / NumPy', level: 90 },
        ]
    },
    {
        name: 'Databases',
        icon: '🗄️',
        skills: [
            { name: 'PostgreSQL', level: 92 },
            { name: 'MongoDB', level: 85 },
            { name: 'MySQL', level: 88 },
            { name: 'Redis', level: 80 },
            { name: 'Apache Kafka', level: 75 },
        ]
    },
    {
        name: 'DevOps',
        icon: '🚀',
        skills: [
            { name: 'Docker', level: 88 },
            { name: 'Git / GitHub Actions', level: 92 },
            { name: 'GitLab CI/CD', level: 85 },
            { name: 'Linux', level: 85 },
            { name: 'Spark / Hadoop', level: 70 },
        ]
    },
]

export default function SkillsApp() {
    return (
        <div className="h-full p-4 md:p-6 overflow-auto">
            <h1 className="text-xl md:text-2xl font-bold mb-2">Technical Skills</h1>
            <p className="text-white/60 text-xs md:text-sm mb-4 md:mb-6">My technology stack and proficiency levels</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {skillCategories.map(category => (
                    <div
                        key={category.name}
                        className="bg-win-surface/30 rounded-win-lg p-3 md:p-4"
                    >
                        <h2 className="text-sm md:text-base font-semibold mb-2 md:mb-3 flex items-center gap-2">
                            <span>{category.icon}</span>
                            {category.name}
                        </h2>

                        <div className="space-y-2">
                            {category.skills.map(skill => (
                                <div key={skill.name}>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-white/80">{skill.name}</span>
                                        <span className="text-white/50">{skill.level}%</span>
                                    </div>
                                    <div className="h-1.5 bg-win-dark rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-win-blue to-blue-400 rounded-full transition-all duration-500"
                                            style={{ width: `${skill.level}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Additional Tools */}
            <div className="mt-4 md:mt-6 bg-win-surface/30 rounded-win-lg p-3 md:p-4">
                <h2 className="text-sm md:text-base font-semibold mb-2 md:mb-3 flex items-center gap-2">
                    <span>🛠️</span>
                    Other Tools & Technologies
                </h2>
                <div className="flex flex-wrap gap-2">
                    {['GSAP', 'Chart.js', 'Zustand', 'RxJS', 'JPA/Hibernate', 'JWT', 'OAuth2',
                        'Symfony', 'PHP', 'C', 'Leaflet Maps', 'Stripe', 'pgvector', 'Stanford CoreNLP',
                        'Google Gemini API', 'Figma', 'Postman', 'VS Code', 'IntelliJ IDEA'].map(tool => (
                            <span
                                key={tool}
                                className="px-3 py-1 bg-win-hover rounded-full text-xs hover:bg-win-active transition-colors cursor-default"
                            >
                                {tool}
                            </span>
                        ))}
                </div>
            </div>

            {/* Certifications */}
            <div className="mt-4 md:mt-6 bg-gradient-to-r from-win-blue/20 to-purple-500/20 rounded-win-lg p-3 md:p-4">
                <h2 className="text-sm md:text-base font-semibold mb-2 md:mb-3 flex items-center gap-2">
                    <span>🏆</span>
                    Certifications
                </h2>
                <div className="flex flex-wrap gap-3">
                    <div className="bg-win-dark/50 rounded-win px-3 py-2">
                        <p className="text-sm font-medium">Python Essentials 1 & 2</p>
                        <p className="text-xs text-white/50">Cisco</p>
                    </div>
                    <div className="bg-win-dark/50 rounded-win px-3 py-2">
                        <p className="text-sm font-medium">Machine Learning</p>
                        <p className="text-xs text-white/50">Columbia University</p>
                    </div>
                    <div className="bg-win-dark/50 rounded-win px-3 py-2">
                        <p className="text-sm font-medium">Ethical Hacker</p>
                        <p className="text-xs text-white/50">Cisco</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
