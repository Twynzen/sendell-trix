# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-XX-XX

### Added

- Initial release of sendell-trix design system
- Core components:
  - `st-button` - Matrix-styled button with variants and sizes
  - `st-input` - Text input with validation and states
  - `st-card` - Content container with glow effects
  - `st-badge` - Status indicators and labels
  - `st-spinner` - Loading animations (ring, dots, pulse, matrix, bars)
  - `st-modal` - Dialog windows with backdrop
  - `st-tooltip` - Contextual help tooltips
- Effect components:
  - `st-matrix-rain` - Digital rain animation
  - `st-glitch-text` - Text distortion effect
  - `st-terminal-window` - Terminal UI with scanlines
- Design tokens package with W3C DTCG format
- React wrapper package with @lit/react
- Storybook documentation
- Full TypeScript support
- Accessibility features (WCAG 2.1)
- CSS custom properties for theming
- CSS parts for styling
- `prefers-reduced-motion` support

### Security

- All components sanitize user input
- No external dependencies with known vulnerabilities
