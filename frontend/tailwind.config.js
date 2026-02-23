/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f0fdfa',
                    100: '#ccfbf1',
                    500: '#14b8a6',
                    600: '#0d9488',
                    900: '#134e4a',
                },
                surface: {
                    light: '#ffffff',
                    dark: '#1e293b',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            keyframes: {
                'fade-in-up': {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'emergency-flash': {
                    '0%, 100%': { backgroundColor: 'transparent' },
                    '50%': { backgroundColor: 'rgba(239, 68, 68, 0.4)' },
                },
                'danger-pulse': {
                    '0%, 100%': { opacity: '1', transform: 'scale(1)' },
                    '50%': { opacity: '0.6', transform: 'scale(1.05)' },
                },
                'flood-flash': {
                    '0%, 100%': { backgroundColor: 'transparent' },
                    '50%': { backgroundColor: 'rgba(59, 130, 246, 0.4)' }, // Blue-500 with opacity
                }
            },
            animation: {
                'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
                'emergency-flash': 'emergency-flash 0.5s infinite',
                'flood-flash': 'flood-flash 0.5s infinite',
                'danger-pulse': 'danger-pulse 0.8s infinite',
            }
        },
    },
    plugins: [],
}
