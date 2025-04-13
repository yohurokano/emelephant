module.exports = {
  // ...
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class', // Only apply styles to elements with specific classes
    }),
    require('daisyui'),
  ],
};
