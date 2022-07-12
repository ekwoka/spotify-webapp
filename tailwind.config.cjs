module.exports = {
  content: ['dist/**/*.{js,html}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['ml', 'ui-monospace', 'SFMono-Regular'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
  ],
};
