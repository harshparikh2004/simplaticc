/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src//*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                mont: ['Montserrat', 'ui-sans-serif', 'system-ui'],
                syne: ['Syne', 'ui-sans-serif', 'system-ui'],
                oswald: ['Oswald', 'ui-sans-serif', 'system-ui'],
                dastin: ['Dastin', 'ui-sans-serif', 'system-ui'],
                cav: ['CaviarDreams', 'ui-sans-serif', 'system-ui'],
            },
        },
    },
    plugins: [],
};