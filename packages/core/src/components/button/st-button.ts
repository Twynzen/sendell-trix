import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Matrix-styled button component with neon glow effects.
 *
 * @slot - The button's content/label
 * @csspart button - The native button element
 *
 * @cssprop [--st-button-background=transparent] - Background color
 * @cssprop [--st-button-color=var(--st-color-primary)] - Text color
 * @cssprop [--st-button-border-color=var(--st-color-primary)] - Border color
 * @cssprop [--st-button-glow-color=var(--st-color-glow)] - Glow effect color
 *
 * @fires st-click - Fired when the button is clicked (not disabled)
 *
 * @example
 * ```html
 * <st-button>Enter the Matrix</st-button>
 * <st-button variant="filled">Take the Red Pill</st-button>
 * <st-button variant="danger">System Override</st-button>
 * ```
 */
@customElement('st-button')
export class StButton extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
      --_bg: var(--st-button-background, transparent);
      --_color: var(--st-button-color, var(--st-color-primary, #00ff41));
      --_border: var(--st-button-border-color, var(--st-color-primary, #00ff41));
      --_glow: var(--st-button-glow-color, var(--st-color-glow, #00ff41));
      --_text-inverse: var(--st-color-text-inverse, #000000);
    }

    button {
      font-family: 'Fira Code', 'Source Code Pro', 'Consolas', monospace;
      font-size: 14px;
      font-weight: 500;
      padding: 12px 24px;
      min-height: 44px;
      min-width: 44px;
      border: 2px solid var(--_border);
      background: var(--_bg);
      color: var(--_color);
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      outline: none;
      box-sizing: border-box;
    }

    button:focus-visible {
      outline: 2px solid var(--_glow);
      outline-offset: 2px;
    }

    button:hover:not(:disabled) {
      background: var(--_border);
      color: var(--_text-inverse);
      box-shadow:
        0 0 10px var(--_glow),
        0 0 20px var(--_glow),
        0 0 40px var(--_glow);
    }

    button:active:not(:disabled) {
      transform: scale(0.98);
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      box-shadow: none;
    }

    /* Scanline effect on hover */
    button::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 100%;
      background: linear-gradient(
        transparent 50%,
        rgba(0, 0, 0, 0.1) 50%
      );
      background-size: 100% 4px;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s;
    }

    button:hover:not(:disabled)::before {
      opacity: 1;
    }

    /* Variant: filled */
    :host([variant="filled"]) button {
      background: var(--_border);
      color: var(--_text-inverse);
    }

    :host([variant="filled"]) button:hover:not(:disabled) {
      background: var(--st-color-primary-hover, #33ff66);
      border-color: var(--st-color-primary-hover, #33ff66);
    }

    /* Variant: danger */
    :host([variant="danger"]) {
      --_color: var(--st-color-state-danger, #ff0000);
      --_border: var(--st-color-state-danger, #ff0000);
      --_glow: var(--st-color-state-danger, #ff0000);
    }

    /* Variant: ghost */
    :host([variant="ghost"]) button {
      border-color: transparent;
    }

    :host([variant="ghost"]) button:hover:not(:disabled) {
      background: rgba(0, 255, 65, 0.1);
      border-color: transparent;
      box-shadow: none;
    }

    /* Size: small */
    :host([size="small"]) button {
      padding: 8px 16px;
      font-size: 12px;
      min-height: 32px;
    }

    /* Size: large */
    :host([size="large"]) button {
      padding: 16px 32px;
      font-size: 16px;
      min-height: 56px;
    }

    /* Loading state */
    :host([loading]) button {
      color: transparent;
      pointer-events: none;
    }

    .loading-spinner {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 20px;
      height: 20px;
      border: 2px solid var(--_border);
      border-top-color: transparent;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: translate(-50%, -50%) rotate(360deg); }
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      button {
        transition: none;
      }

      button::before {
        display: none;
      }

      .loading-spinner {
        animation: none;
        border-style: dotted;
      }
    }
  `;

  /**
   * The button variant style
   * @attr variant
   */
  @property({ type: String, reflect: true })
  variant: 'outline' | 'filled' | 'danger' | 'ghost' = 'outline';

  /**
   * The button size
   * @attr size
   */
  @property({ type: String, reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * Whether the button is disabled
   * @attr disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether the button is in a loading state
   * @attr loading
   */
  @property({ type: Boolean, reflect: true })
  loading = false;

  /**
   * The button type for form submission
   * @attr type
   */
  @property({ type: String })
  type: 'button' | 'submit' | 'reset' = 'button';

  /**
   * Optional name for form submission
   * @attr name
   */
  @property({ type: String })
  name?: string;

  /**
   * Optional value for form submission
   * @attr value
   */
  @property({ type: String })
  value?: string;

  override render() {
    return html`
      <button
        part="button"
        type=${this.type}
        ?disabled=${this.disabled || this.loading}
        name=${this.name ?? ''}
        value=${this.value ?? ''}
        @click=${this._handleClick}
        aria-busy=${this.loading}
        aria-disabled=${this.disabled}
      >
        ${this.loading ? html`<span class="loading-spinner"></span>` : ''}
        <slot></slot>
      </button>
    `;
  }

  private _handleClick(e: MouseEvent) {
    if (this.disabled || this.loading) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    this.dispatchEvent(new CustomEvent('st-click', {
      bubbles: true,
      composed: true,
      detail: { originalEvent: e }
    }));
  }

  /**
   * Simulates a click on the button
   */
  public click() {
    this.shadowRoot?.querySelector('button')?.click();
  }

  /**
   * Focuses the button
   */
  public override focus(options?: FocusOptions) {
    this.shadowRoot?.querySelector('button')?.focus(options);
  }

  /**
   * Blurs the button
   */
  public override blur() {
    this.shadowRoot?.querySelector('button')?.blur();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'st-button': StButton;
  }
}
