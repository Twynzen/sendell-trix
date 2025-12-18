import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import 'sendell-trix/matrix-rain';

interface MatrixRainArgs {
  fps: number;
  fontSize: number;
  color: string;
  overlay: boolean;
  opacity: number;
  speed: number;
  density: number;
  paused: boolean;
}

const meta: Meta<MatrixRainArgs> = {
  title: 'Effects/MatrixRain',
  tags: ['autodocs'],
  component: 'st-matrix-rain',
  argTypes: {
    fps: {
      control: { type: 'range', min: 10, max: 60, step: 5 },
      description: 'Frames per second',
    },
    fontSize: {
      control: { type: 'range', min: 8, max: 32, step: 2 },
      description: 'Character font size',
    },
    color: {
      control: 'color',
      description: 'Rain color',
    },
    overlay: {
      control: 'boolean',
      description: 'Use as overlay background',
    },
    opacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Rain opacity',
    },
    speed: {
      control: { type: 'range', min: 0.5, max: 3, step: 0.1 },
      description: 'Fall speed multiplier',
    },
    density: {
      control: { type: 'range', min: 1, max: 10, step: 1 },
      description: 'Character density (1-10)',
    },
    paused: {
      control: 'boolean',
      description: 'Pause the animation',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
Matrix digital rain animation component.
Creates the iconic falling green characters effect from The Matrix.

## Features
- Configurable speed, density, and color
- Can be used as background overlay
- Respects \`prefers-reduced-motion\`
- Canvas-based for performance

## Usage
\`\`\`html
<st-matrix-rain></st-matrix-rain>
<st-matrix-rain overlay>
  <h1>Welcome to the Matrix</h1>
</st-matrix-rain>
\`\`\`
        `,
      },
    },
    layout: 'fullscreen',
  },
  render: (args) => html`
    <st-matrix-rain
      fps=${args.fps}
      font-size=${args.fontSize}
      color=${args.color}
      ?overlay=${args.overlay}
      opacity=${args.opacity}
      speed=${args.speed}
      density=${args.density}
      ?paused=${args.paused}
      style="width: 100%; height: 400px;"
    ></st-matrix-rain>
  `,
};

export default meta;
type Story = StoryObj<MatrixRainArgs>;

export const Default: Story = {
  args: {
    fps: 30,
    fontSize: 16,
    color: '#00ff41',
    overlay: false,
    opacity: 1,
    speed: 1,
    density: 5,
    paused: false,
  },
};

export const Slow: Story = {
  args: {
    speed: 0.5,
    fps: 20,
  },
};

export const Fast: Story = {
  args: {
    speed: 2,
    fps: 60,
  },
};

export const Dense: Story = {
  args: {
    density: 10,
    fontSize: 12,
  },
};

export const Sparse: Story = {
  args: {
    density: 2,
    fontSize: 20,
  },
};

export const RedPill: Story = {
  args: {
    color: '#ff0000',
  },
};

export const BluePill: Story = {
  args: {
    color: '#00bfff',
  },
};

export const AsOverlay: Story = {
  render: () => html`
    <div style="position: relative; width: 100%; height: 400px; display: flex; align-items: center; justify-content: center;">
      <st-matrix-rain overlay></st-matrix-rain>
      <div style="position: relative; z-index: 1; text-align: center; padding: 40px;">
        <h1 style="font-size: 48px; font-family: 'Fira Code', monospace; color: #00ff41; text-shadow: 0 0 20px #00ff41; margin: 0;">
          WELCOME TO THE MATRIX
        </h1>
        <p style="font-size: 18px; font-family: 'Fira Code', monospace; color: #00ff41; opacity: 0.8; margin-top: 16px;">
          Choose your destiny
        </p>
      </div>
    </div>
  `,
};

export const WithContent: Story = {
  render: () => html`
    <st-matrix-rain style="width: 100%; height: 400px;">
      <div style="
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.8);
        padding: 32px;
        border: 1px solid #00ff41;
        text-align: center;
      ">
        <h2 style="color: #00ff41; margin: 0 0 16px 0; font-family: 'Fira Code', monospace;">
          SYSTEM ACCESS
        </h2>
        <p style="color: #00ff41; opacity: 0.7; font-family: 'Fira Code', monospace;">
          Authentication required
        </p>
      </div>
    </st-matrix-rain>
  `,
};
