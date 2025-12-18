import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Matrix-styled badge component for status indicators and labels.
 *
 * @slot - Badge content/text
 *
 * @csspart badge - The badge element
 *
 * @cssprop [--st-badge-background=transparent] - Badge background
 * @cssprop [--st-badge-color=var(--st-color-primary)] - Badge text color
 * @cssprop [--st-badge-border-color=var(--st-color-primary)] - Badge border color
 *
 * @example
 * ```html
 * <st-badge>ONLINE</st-badge>
 * <st-badge variant="success">CONNECTED</st-badge>
 * <st-badge variant="danger" pulse>ALERT</st-badge>
 * ```
 */
@customElement('st-badge')
export class StBadge extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
      --_bg: var(--st-badge-background, transparent);
      --_color: var(--st-badge-color, var(--st-color-primary, #00ff41));
      --_border: var(--st-badge-border-color, var(--st-color-primary, #00ff41));
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      font-family: 'Fira Code', monospace;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      background: var(--_bg);
      color: var(--_color);
      border: 1px solid var(--_border);
      white-space: nowrap;
    }

    /* Dot indicator */
    .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--_color);
    }

    :host([pulse]) .dot {
      animation: pulse 1.5s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 1;
        transform: scale(1);
      }
      50% {
        opacity: 0.5;
        transform: scale(0.8);
      }
    }

    /* Variants */
    :host([variant="success"]) {
      --_color: var(--st-color-state-success, #00ff41);
      --_border: var(--st-color-state-success, #00ff41);
    }

    :host([variant="danger"]) {
      --_color: var(--st-color-state-danger, #ff0000);
      --_border: var(--st-color-state-danger, #ff0000);
    }

    :host([variant="warning"]) {
      --_color: var(--st-color-state-warning, #ffff00);
      --_border: var(--st-color-state-warning, #ffff00);
    }

    :host([variant="info"]) {
      --_color: var(--st-color-state-info, #00bfff);
      --_border: var(--st-color-state-info, #00bfff);
    }

    /* Filled variants */
    :host([filled]) .badge {
      background: var(--_color);
      color: var(--st-color-black-pure, #000000);
    }

    :host([filled]) .dot {
      background: var(--st-color-black-pure, #000000);
    }

    /* Sizes */
    :host([size="small"]) .badge {
      padding: 2px 8px;
      font-size: 10px;
    }

    :host([size="small"]) .dot {
      width: 4px;
      height: 4px;
    }

    :host([size="large"]) .badge {
      padding: 6px 16px;
      font-size: 13px;
    }

    :host([size="large"]) .dot {
      width: 8px;
      height: 8px;
    }

    /* Glow effect */
    :host([glow]) .badge {
      box-shadow: 0 0 10px var(--_color);
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      :host([pulse]) .dot {
        animation: none;
      }
    }
  `;

  /**
   * Badge variant/color scheme
   * @attr variant
   */
  @property({ type: String, reflect: true })
  variant: 'default' | 'success' | 'danger' | 'warning' | 'info' = 'default';

  /**
   * Badge size
   * @attr size
   */
  @property({ type: String, reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * Whether to show a status dot
   * @attr dot
   */
  @property({ type: Boolean })
  dot = false;

  /**
   * Whether the dot should pulse
   * @attr pulse
   */
  @property({ type: Boolean, reflect: true })
  pulse = false;

  /**
   * Whether the badge has a filled background
   * @attr filled
   */
  @property({ type: Boolean, reflect: true })
  filled = false;

  /**
   * Whether to show a glow effect
   * @attr glow
   */
  @property({ type: Boolean, reflect: true })
  glow = false;

  override render() {
    return html`
      <span class="badge" part="badge">
        ${this.dot ? html`<span class="dot"></span>` : ''}
        <slot></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'st-badge': StBadge;
  }
}
