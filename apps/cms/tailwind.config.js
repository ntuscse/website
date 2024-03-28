/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{tsx,ts}'],
  theme: {
    extend: {
	colors: {
		error: 'var(--theme-error-400)',
	},
    },
  },
  plugins: [require("daisyui")],
}

