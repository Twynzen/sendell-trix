# sendell-trix

<p align="center">
  <img src="https://img.shields.io/npm/v/sendell-trix?color=00ff41&style=flat-square" alt="npm version" />
  <img src="https://img.shields.io/npm/l/sendell-trix?color=00ff41&style=flat-square" alt="license" />
  <img src="https://img.shields.io/badge/lit-3.x-00ff41?style=flat-square" alt="lit version" />
  <img src="https://img.shields.io/badge/web%20components-✓-00ff41?style=flat-square" alt="web components" />
</p>

<p align="center">
  <strong>A Matrix-inspired Web Components design system built with Lit 3.x</strong>
</p>

<p align="center">
  <a href="#installation">Installation</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#components">Components</a> •
  <a href="#react">React</a> •
  <a href="#design-tokens">Design Tokens</a> •
  <a href="#documentation">Documentation</a>
</p>

---

## Features

- 🎨 **Framework-agnostic** - Works with React, Vue, Angular, Svelte, or vanilla JS
- ⚡ **High Performance** - Built with Lit 3.x for optimal rendering
- ♿ **Accessible** - WCAG 2.1 compliant with full keyboard support
- 🎬 **Motion-safe** - Respects `prefers-reduced-motion`
- 📦 **Tree-shakeable** - Import only what you need
- 🎯 **TypeScript** - Full type definitions included
- 🌙 **Dark-first** - Designed for dark themes with neon aesthetics

## Installation

```bash
# npm
npm install sendell-trix

# pnpm
pnpm add sendell-trix

# yarn
yarn add sendell-trix
```

## Quick Start

### Vanilla JavaScript / HTML

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://unpkg.com/sendell-trix/dist/styles/base.css">
</head>
<body>
  <script type="module">
    import 'sendell-trix';
  </script>

  <st-terminal-window title="welcome@matrix">
    <p>Wake up, Neo...</p>
    <p>The Matrix has you...</p>
  </st-terminal-window>

  <st-button variant="filled">Take the Red Pill</st-button>
  <st-button variant="outline">Take the Blue Pill</st-button>

  <st-input label="Username" placeholder="neo"></st-input>
</body>
</html>
```

### ES Modules (tree-shaking)

```javascript
// Import specific components
import 'sendell-trix/button';
import 'sendell-trix/input';
import 'sendell-trix/terminal-window';
```

## Components

### Core Components

| Component | Tag | Description |
|-----------|-----|-------------|
| Button | `<st-button>` | Matrix-styled buttons with glow effects |
| Input | `<st-input>` | Text inputs with neon focus states |
| Card | `<st-card>` | Content containers with border glow |
| Badge | `<st-badge>` | Status indicators and labels |
| Spinner | `<st-spinner>` | Multiple loading animations |
| Modal | `<st-modal>` | Dialog windows |
| Tooltip | `<st-tooltip>` | Contextual help tooltips |

### Effect Components

| Component | Tag | Description |
|-----------|-----|-------------|
| Matrix Rain | `<st-matrix-rain>` | The iconic falling code effect |
| Glitch Text | `<st-glitch-text>` | Cyberpunk text distortion |
| Terminal Window | `<st-terminal-window>` | Retro terminal UI |

### Button

```html
<st-button>Default</st-button>
<st-button variant="filled">Filled</st-button>
<st-button variant="danger">Danger</st-button>
<st-button variant="ghost">Ghost</st-button>
<st-button size="small">Small</st-button>
<st-button size="large">Large</st-button>
<st-button loading>Loading</st-button>
<st-button disabled>Disabled</st-button>
```

### Input

```html
<st-input label="Username" placeholder="Enter username"></st-input>
<st-input type="password" label="Password"></st-input>
<st-input label="Email" type="email" required></st-input>
<st-input label="Search" clearable show-count maxlength="100"></st-input>
<st-input invalid error-message="Invalid input"></st-input>
```

### Terminal Window

```html
<st-terminal-window title="system@matrix">
  <p>Wake up, Neo...</p>
  <p>The Matrix has you...</p>
</st-terminal-window>

<st-terminal-window title="code.ts" no-flicker show-cursor>
  <pre>const matrix = new Matrix();</pre>
</st-terminal-window>
```

### Matrix Rain

```html
<st-matrix-rain style="width: 100%; height: 400px;"></st-matrix-rain>

<!-- As background overlay -->
<st-matrix-rain overlay>
  <h1>Welcome to the Matrix</h1>
</st-matrix-rain>

<!-- Customized -->
<st-matrix-rain
  speed="1.5"
  density="7"
  color="#00ff41"
  font-size="14"
></st-matrix-rain>
```

### Glitch Text

```html
<st-glitch-text>ENTER THE MATRIX</st-glitch-text>
<st-glitch-text intensity="low">Subtle</st-glitch-text>
<st-glitch-text intensity="high">SYSTEM ERROR</st-glitch-text>
<st-glitch-text intensity="extreme">CRITICAL</st-glitch-text>
```

## React

Install the React package:

```bash
npm install @sendell-trix/react
```

Usage:

```tsx
import { Button, Input, TerminalWindow, MatrixRain } from '@sendell-trix/react';

function App() {
  const [value, setValue] = useState('');

  return (
    <div>
      <TerminalWindow title="react@matrix">
        <p>Hello from React!</p>
      </TerminalWindow>

      <Input
        label="Username"
        value={value}
        onStInput={(e) => setValue(e.detail.value)}
      />

      <Button
        variant="filled"
        onStClick={() => console.log('Clicked!')}
      >
        Enter the Matrix
      </Button>

      <MatrixRain overlay>
        <h1>Background Effect</h1>
      </MatrixRain>
    </div>
  );
}
```

## Design Tokens

sendell-trix uses a comprehensive design token system:

```css
/* Import CSS variables */
@import 'sendell-trix/dist/styles/base.css';

/* Available tokens */
:root {
  /* Colors */
  --st-color-primary: #00ff41;
  --st-color-background: #000000;
  --st-color-surface: #0d0d0d;
  --st-color-text-primary: #00ff41;

  /* Typography */
  --st-font-family-mono: 'Fira Code', monospace;

  /* Effects */
  --st-shadow-glow-md: 0 0 10px rgba(0, 255, 65, 0.5);
}
```

### Using Tokens Package

```bash
npm install @sendell-trix/tokens
```

```javascript
// JavaScript
import { colorPrimary, colorBackground } from '@sendell-trix/tokens';

// CSS
@import '@sendell-trix/tokens/css/variables.css';
```

## Customization

### CSS Custom Properties

Override design tokens to customize components:

```css
st-button {
  --st-button-background: #ff0000;
  --st-button-color: #ffffff;
  --st-button-glow-color: #ff0000;
}

st-input {
  --st-input-border-color: #ff0000;
  --st-color-glow: #ff0000;
}
```

### CSS Parts

Style component internals using CSS parts:

```css
st-button::part(button) {
  border-radius: 8px;
}

st-input::part(input) {
  font-size: 18px;
}

st-terminal-window::part(header) {
  background: linear-gradient(90deg, #000, #0d0d0d);
}
```

## Accessibility

All components include:

- ✅ Proper ARIA attributes
- ✅ Keyboard navigation
- ✅ Focus management
- ✅ Screen reader support
- ✅ `prefers-reduced-motion` support
- ✅ Touch target sizes (44px minimum)
- ✅ Color contrast compliance

## Browser Support

- Chrome 90+
- Firefox 90+
- Safari 14+
- Edge 90+

## Documentation

- [Storybook Documentation](https://sendell-trix.github.io/sendell-trix)
- [API Reference](./docs/api.md)
- [Contributing Guide](./CONTRIBUTING.md)

## Development

```bash
# Clone the repository
git clone https://github.com/sendell-trix/sendell-trix.git
cd sendell-trix

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Start Storybook
pnpm storybook

# Run tests
pnpm test

# Lint
pnpm lint
```

## Packages

| Package | Description |
|---------|-------------|
| `sendell-trix` | Core Web Components |
| `@sendell-trix/react` | React wrappers |
| `@sendell-trix/tokens` | Design tokens |

## License

MIT © [Sendell Trix Team](https://github.com/sendell-trix)

---

<p align="center">
  <em>Follow the white rabbit 🐇</em>
</p>
