// tailwind.config.js

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        'custom-gray': '#636363', 
        'custom-border': '#e1e1e1', 
      },
      backgroundImage: {
        'brand-footer': "url('/public/images/brand-footer.png')", 
      },
      backgroundPosition: {
        'brand-1': '-391px 5px', 
        'brand-2': '-160px 5px',
        'brand-3': '-236px 5px',
        'brand-4': '-292px 5px',
        'brand-5': '-82px 5px',
        'brand-6': '2px 3px',
        'brand-7': '-572px 3px',
        'brand-8': '-435px 2px',
        'brand-9': '-604px 2px',
        'brand-10': '-675px 3px',
        'brand-11': '-785px 3px',
        'brand-12': '-891px 2px',
      },
    },
  },
  plugins: [],
}
