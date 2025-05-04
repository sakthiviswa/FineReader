// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        shootingStar: {
          '0%': { transform: 'translateX(0) translateY(0)', opacity: '1' },
          '100%': { transform: 'translateX(100vw) translateY(50px)', opacity: '0' },
        },
        orbitHorizontal: {
          '0%': { transform: 'rotate(0deg) translateX(60px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(60px) rotate(-360deg)' },
        },
        orbitVertical: {
          '0%': { transform: 'rotate(0deg) translateY(60px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateY(60px) rotate(-360deg)' },
        },
      },
      animation: {
        twinkle: 'twinkle 2s ease-in-out infinite',
        shootingStar: 'shootingStar 8s linear infinite',
        orbitHorizontal: 'orbitHorizontal 4s linear infinite',
        orbitVertical: 'orbitVertical 4s linear infinite',
      },
     
    },
  },
}
