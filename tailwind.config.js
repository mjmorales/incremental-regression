export default {
  // eslint-disable-next-line no-undef
  plugins: [require('daisyui')],
  mode: 'jit',
  purge: {
    enabled: true,
    content: ['./src/**/*.{html,js,vue}'],
  },
};
