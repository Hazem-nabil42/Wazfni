/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/home.ejs',
    './index.html'
  ],
  theme: {
    extend: {
      fontFamily: {
        gadm: ['El Messiri'] 
      },
      backgroundImage: {
        // "hero": "url('https://img.freepik.com/premium-photo/black-wallpaper-that-says-black-wallpapers-black-wallpaper-black-wallpaper-black-wallpaper-black-wallpaper-black-wallpaper-black-wallpaper-black-wallpaper-black_916626-1681.jpg')",
        "SEO": "url('https://assets.entrepreneur.com/content/3x2/2000/1648113590-new4.jpg')",
      },
      keyframes: {
        scale: {
          '0%, 100%': { filter: 'brightness(1.5);' },
          '50%': { filter: 'brightness(0.25);' },
        }
      },
      animation: {
        scale: 'scale 1s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}

