import type { Preview } from '@storybook/web-components';
import MatrixTheme from './MatrixTheme';

// Import global styles
import 'sendell-trix/dist/styles/base.css';
import 'sendell-trix/dist/styles/neon.css';

const preview: Preview = {
  parameters: {
    // Actions
    actions: { argTypesRegex: '^on[A-Z].*|^st-.*' },

    // Controls
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    // Docs theme
    docs: {
      theme: MatrixTheme,
    },

    // Backgrounds
    backgrounds: {
      default: 'matrix-black',
      values: [
        { name: 'matrix-black', value: '#000000' },
        { name: 'matrix-dark', value: '#0d0d0d' },
        { name: 'matrix-surface', value: '#1a1a1a' },
      ],
    },

    // Viewport presets
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: { width: '375px', height: '667px' },
        },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
        },
        desktop: {
          name: 'Desktop',
          styles: { width: '1440px', height: '900px' },
        },
      },
    },

    // Layout
    layout: 'centered',
  },

  // Global decorators
  decorators: [
    (story) => {
      // Ensure Matrix styling is applied
      const storyContent = story();

      const wrapper = document.createElement('div');
      wrapper.style.cssText = `
        font-family: 'Fira Code', monospace;
        color: #00ff41;
        padding: 20px;
      `;

      if (typeof storyContent === 'string') {
        wrapper.innerHTML = storyContent;
      } else {
        wrapper.appendChild(storyContent as Node);
      }

      return wrapper;
    },
  ],

  // Global types for toolbar
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'matrix-green',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'matrix-green', title: 'Matrix Green' },
          { value: 'matrix-red', title: 'Matrix Red' },
          { value: 'matrix-blue', title: 'Matrix Blue' },
        ],
        showName: true,
      },
    },
  },
};

export default preview;
