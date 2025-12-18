import { create } from '@storybook/theming/create';

export default create({
  base: 'dark',

  // Brand
  brandTitle: 'sendell-trix Design System',
  brandUrl: 'https://github.com/sendell-trix/sendell-trix',
  brandTarget: '_self',

  // Colors
  colorPrimary: '#00ff41',
  colorSecondary: '#008f11',

  // UI
  appBg: '#0d0d0d',
  appContentBg: '#1a1a1a',
  appPreviewBg: '#000000',
  appBorderColor: '#00ff41',
  appBorderRadius: 4,

  // Text colors
  textColor: '#00ff41',
  textInverseColor: '#0d0d0d',
  textMutedColor: '#006400',

  // Toolbar
  barTextColor: '#00ff41',
  barSelectedColor: '#00ff41',
  barHoverColor: '#33ff66',
  barBg: '#1a1a1a',

  // Form colors
  inputBg: '#0d0d0d',
  inputBorder: '#00ff41',
  inputTextColor: '#00ff41',
  inputBorderRadius: 4,

  // Typography
  fontBase: '"Fira Code", "Source Code Pro", monospace',
  fontCode: '"Fira Code", monospace',
});
