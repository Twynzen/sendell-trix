import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import 'sendell-trix/input';

interface InputArgs {
  label: string;
  placeholder: string;
  value: string;
  type: string;
  helpText: string;
  errorMessage: string;
  invalid: boolean;
  disabled: boolean;
  required: boolean;
  clearable: boolean;
  showCount: boolean;
  maxlength: number;
}

const meta: Meta<InputArgs> = {
  title: 'Components/Input',
  tags: ['autodocs'],
  component: 'st-input',
  argTypes: {
    label: {
      control: 'text',
      description: 'The input label',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    value: {
      control: 'text',
      description: 'The input value',
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url', 'search'],
      description: 'Input type',
    },
    helpText: {
      control: 'text',
      description: 'Help text displayed below the input',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message when invalid',
    },
    invalid: {
      control: 'boolean',
      description: 'Whether the input is in invalid state',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the input is required',
    },
    clearable: {
      control: 'boolean',
      description: 'Whether to show a clear button',
    },
    showCount: {
      control: 'boolean',
      description: 'Whether to show character count',
    },
    maxlength: {
      control: 'number',
      description: 'Maximum character length',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
Matrix-styled input component with glowing focus states.

## Features
- Multiple input types supported
- Label and help text
- Error states with messages
- Clear button option
- Character count display
- Full accessibility support

## Usage
\`\`\`html
<st-input label="Username" placeholder="Enter username"></st-input>
<st-input type="password" label="Password"></st-input>
<st-input label="Email" type="email" invalid error-message="Invalid email"></st-input>
\`\`\`
        `,
      },
    },
  },
  render: (args) => html`
    <st-input
      label=${args.label}
      placeholder=${args.placeholder}
      value=${args.value}
      type=${args.type}
      help-text=${args.helpText}
      error-message=${args.errorMessage}
      ?invalid=${args.invalid}
      ?disabled=${args.disabled}
      ?required=${args.required}
      ?clearable=${args.clearable}
      ?show-count=${args.showCount}
      maxlength=${args.maxlength}
    ></st-input>
  `,
};

export default meta;
type Story = StoryObj<InputArgs>;

export const Default: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    value: '',
    type: 'text',
    helpText: '',
    errorMessage: '',
    invalid: false,
    disabled: false,
    required: false,
    clearable: false,
    showCount: false,
    maxlength: 0,
  },
};

export const WithHelpText: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'neo@matrix.com',
    type: 'email',
    helpText: 'We will never share your email with agents.',
  },
};

export const Required: Story = {
  args: {
    label: 'Access Code',
    placeholder: 'Enter access code',
    required: true,
    helpText: 'Required for authentication',
  },
};

export const Invalid: Story = {
  args: {
    label: 'Password',
    type: 'password',
    value: '123',
    invalid: true,
    errorMessage: 'Password must be at least 8 characters',
  },
};

export const Disabled: Story = {
  args: {
    label: 'System Locked',
    value: 'ACCESS RESTRICTED',
    disabled: true,
  },
};

export const Clearable: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search the Matrix...',
    value: 'Neo',
    clearable: true,
  },
};

export const WithCharacterCount: Story = {
  args: {
    label: 'Message',
    placeholder: 'Enter your message',
    showCount: true,
    maxlength: 100,
    helpText: 'Maximum 100 characters',
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
  },
};

export const FormExample: Story = {
  render: () => html`
    <form style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
      <st-input
        label="Username"
        placeholder="Choose a username"
        required
      ></st-input>
      <st-input
        label="Email"
        type="email"
        placeholder="your.email@matrix.com"
        required
      ></st-input>
      <st-input
        label="Password"
        type="password"
        placeholder="Create password"
        help-text="Minimum 8 characters"
        required
      ></st-input>
      <st-input
        label="Bio"
        placeholder="Tell us about yourself"
        show-count
        maxlength="200"
        clearable
      ></st-input>
    </form>
  `,
};
