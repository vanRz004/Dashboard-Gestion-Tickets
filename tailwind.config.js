/** @type {import('tailwindcss').Config} */
module.exports = {
  // Archivos donde Tailwind va a buscar clases
  content: [
    "./index.html",
    "./src/**/*.{js,ts,vue}"
  ],
  theme: {
    extend: {
      // Aquí agregas colores, fuentes, tamaños, etc.
      colors: {
        primary: '#1d4ed8',       // azul principal
        primaryDark: '#1e40af',   // azul oscuro
        button: '#1e3a8a',
        buttonHover: '#1e40af'
      },
      spacing: {
        '128': '32rem',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    }
  },
  plugins: [],
}
