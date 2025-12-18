import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import 'sendell-trix/spinner';

interface SpinnerArgs {
  variant: 'ring' | 'dots' | 'pulse' | 'matrix' | 'bars';
  size: 'small' | 'medium' | 'large';
  label: string;
}

const meta: Meta<SpinnerArgs> = {
  title: 'Components/Spinner',
  tags: ['autodocs'],
  component: 'st-spinner',
  argTypes: {
    variant: {
      control: 'select',
      options: ['ring', 'dots', 'pulse', 'matrix', 'bars'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    label: { control: 'text' },
  },
  render: (args) => html`
    <st-spinner
      variant=${args.variant}
      size=${args.size}
      label=${args.label}
    ></st-spinner>
  `,
};

export default meta;
type Story = StoryObj<SpinnerArgs>;

export const Default: Story = {
  args: {
    variant: 'ring',
    size: 'medium',
    label: '',
  },
};

export const WithLabel: Story = {
  args: {
    variant: 'ring',
    label: 'Loading...',
  },
};

export const Dots: Story = {
  args: {
    variant: 'dots',
  },
};

export const Pulse: Story = {
  args: {
    variant: 'pulse',
  },
};

export const Matrix: Story = {
  args: {
    variant: 'matrix',
  },
};

export const Bars: Story = {
  args: {
    variant: 'bars',
  },
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 32px; flex-wrap: wrap; align-items: center;">
      <st-spinner variant="ring" label="Ring"></st-spinner>
      <st-spinner variant="dots" label="Dots"></st-spinner>
      <st-spinner variant="pulse" label="Pulse"></st-spinner>
      <st-spinner variant="matrix" label="Matrix"></st-spinner>
      <st-spinner variant="bars" label="Bars"></st-spinner>
    </div>
  `,
};

export const AllSizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 32px; align-items: center;">
      <st-spinner size="small" label="Small"></st-spinner>
      <st-spinner size="medium" label="Medium"></st-spinner>
      <st-spinner size="large" label="Large"></st-spinner>
    </div>
  `,
};
