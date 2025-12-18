import { addons } from '@storybook/manager-api';
import MatrixTheme from './MatrixTheme';

addons.setConfig({
  theme: MatrixTheme,
  sidebar: {
    showRoots: true,
  },
  toolbar: {
    title: { hidden: false },
    zoom: { hidden: false },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },
});
