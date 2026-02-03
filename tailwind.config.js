/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'segoe': ['"Segoe UI Variable"', '"Segoe UI"', 'system-ui', 'sans-serif'],
            },
            colors: {
                'win-blue': '#0078D4',
                'win-dark': '#202020',
                'win-taskbar': 'rgba(32, 32, 32, 0.85)',
                'win-surface': 'rgba(40, 40, 40, 0.95)',
                'win-hover': 'rgba(255, 255, 255, 0.08)',
                'win-active': 'rgba(255, 255, 255, 0.12)',
                'win-border': 'rgba(255, 255, 255, 0.1)',
            },
            backdropBlur: {
                'win': '20px',
            },
            borderRadius: {
                'win': '8px',
                'win-lg': '12px',
            },
            boxShadow: {
                'win': '0 8px 32px rgba(0, 0, 0, 0.4)',
                'win-lg': '0 24px 80px rgba(0, 0, 0, 0.5)',
            }
        },
    },
    plugins: [],
}
