import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import 'sendell-trix/glitch-text';

interface GlitchTextArgs {
  text: string;
  intensity: 'none' | 'low' | 'medium' | 'high' | 'extreme';
}

const meta: Meta<GlitchTextArgs> = {
  title: 'Effects/GlitchText',
  tags: ['autodocs'],
  component: 'st-glitch-text',
  argTypes: {
    text: {
      control: 'text',
      description: 'The text to display',
    },
    intensity: {
      control: 'select',
      options: ['none', 'low', 'medium', 'high', 'extreme'],
      description: 'Glitch effect intensity',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
Glitch text effect component with customizable intensity.
Creates a cyberpunk-style text distortion effect.

## Features
- Multiple intensity levels
- Customizable colors via CSS variables
- Respects \`prefers-reduced-motion\`

## Usage
\`\`\`html
<st-glitch-text>ENTER THE MATRIX</st-glitch-text>
<st-glitch-text intensity="high">SYSTEM FAILURE</st-glitch-text>
<st-glitch-text text="HELLO WORLD"></st-glitch-text>
\`\`\`
        `,
      },
    },
  },
  render: (args) => html`
    <st-glitch-text
      text=${args.text}
      intensity=${args.intensity}
      style="font-size: 32px;"
    ></st-glitch-text>
  `,
};

export default meta;
type Story = StoryObj<GlitchTextArgs>;

export const Default: Story = {
  args: {
    text: 'ENTER THE MATRIX',
    intensity: 'medium',
  },
};

export const NoEffect: Story = {
  args: {
    text: 'STATIC TEXT',
    intensity: 'none',
  },
};

export const LowIntensity: Story = {
  args: {
    text: 'SUBTLE GLITCH',
    intensity: 'low',
  },
};

export const HighIntensity: Story = {
  args: {
    text: 'SYSTEM ERROR',
    intensity: 'high',
  },
};

export const ExtremeIntensity: Story = {
  args: {
    text: 'CRITICAL FAILURE',
    intensity: 'extreme',
  },
};

export const AllIntensities: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px; font-size: 24px;">
      <st-glitch-text intensity="none">INTENSITY: NONE</st-glitch-text>
      <st-glitch-text intensity="low">INTENSITY: LOW</st-glitch-text>
      <st-glitch-text intensity="medium">INTENSITY: MEDIUM</st-glitch-text>
      <st-glitch-text intensity="high">INTENSITY: HIGH</st-glitch-text>
      <st-glitch-text intensity="extreme">INTENSITY: EXTREME</st-glitch-text>
    </div>
  `,
};

export const LargeHeading: Story = {
  render: () => html`
    <st-glitch-text
      text="THE MATRIX HAS YOU"
      intensity="medium"
      style="font-size: 48px; font-weight: bold;"
    ></st-glitch-text>
  `,
};

export const CustomColors: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px; font-size: 28px;">
      <st-glitch-text
        text="RED PILL"
        intensity="medium"
        style="--st-glitch-color: #ff0000; --st-glitch-color-1: #ff6600; --st-glitch-color-2: #ff0066;"
      ></st-glitch-text>
      <st-glitch-text
        text="BLUE PILL"
        intensity="medium"
        style="--st-glitch-color: #00bfff; --st-glitch-color-1: #0066ff; --st-glitch-color-2: #00ffff;"
      ></st-glitch-text>
    </div>
  `,
};
