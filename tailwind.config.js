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
                mont: ['Montserrat', ...defaultTheme.fontFamily.sans],
                syne: ['Syne', ...defaultTheme.fontFamily.sans],
                oswald: ['Oswald', ...defaultTheme.fontFamily.sans],
                caviar: ['CaviarDreams', ...defaultTheme.fontFamily.sans],
                dastin: ['Dastin', ...defaultTheme.fontFamily.sans],
                adam: ['Adam', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [],
};