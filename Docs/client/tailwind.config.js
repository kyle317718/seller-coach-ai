module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'purple-heart': '#8A4FFF',
        'deep-blue': '#2563EB',
        'success-green': '#10B981'
      },
      boxShadow: {
        'soft-xl': '0 15px 30px -10px rgba(138, 79, 255, 0.15)'
      }
    }
  },
  plugins: [],
}
