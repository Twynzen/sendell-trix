import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Matrix-styled card component with neon border glow.
 *
 * @slot - Default slot for card content
 * @slot header - Card header content
 * @slot footer - Card footer content
 *
 * @csspart card - The outer card container
 * @csspart header - The card header
 * @csspart body - The card body
 * @csspart footer - The card footer
 *
 * @cssprop [--st-card-background=var(--st-color-surface)] - Card background
 * @cssprop [--st-card-border-color=var(--st-color-border-default)] - Card border color
 * @cssprop [--st-card-padding=var(--st-spacing-4)] - Card padding
 *
 * @example
 * ```html
 * <st-card>
 *   <div slot="header">Card Title</div>
 *   <p>Card content goes here...</p>
 *   <div slot="footer">Footer actions</div>
 * </st-card>
 * ```
 */
@customElement('st-card')
export class StCard extends LitElement {
  static override styles = css`
    :host {
      display: block;
      --_bg: var(--st-card-background, var(--st-color-surface, #0d0d0d));
      --_border: var(--st-card-border-color, var(--st-color-border-default, #00ff41));
      --_text: var(--st-color-text-primary, #00ff41);
      --_padding: var(--st-card-padding, 16px);
      --_glow: var(--st-color-glow, #00ff41);
    }

    .card {
      background: var(--_bg);
      border: 1px solid var(--_border);
      color: var(--_text);
      font-family: 'Fira Code', monospace;
      transition: box-shadow 0.3s, transform 0.2s;
    }

    :host([variant="elevated"]) .card {
      box-shadow:
        0 4px 6px rgba(0, 0, 0, 0.5),
        0 0 10px rgba(0, 255, 65, 0.1);
    }

    :host([variant="glow"]) .card {
      box-shadow:
        0 0 10px var(--_glow),
        0 0 20px rgba(0, 255, 65, 0.3);
    }

    :host([interactive]) .card {
      cursor: pointer;
    }

    :host([interactive]) .card:hover {
      box-shadow:
        0 0 10px var(--_glow),
        0 0 20px var(--_glow);
      transform: translateY(-2px);
    }

    :host([interactive]) .card:active {
      transform: translateY(0);
    }

    .header {
      padding: var(--_padding);
      border-bottom: 1px solid var(--_border);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-size: 14px;
    }

    .header:empty {
      display: none;
    }

    .body {
      padding: var(--_padding);
    }

    .footer {
      padding: var(--_padding);
      border-top: 1px solid var(--_border);
    }

    .footer:empty {
      display: none;
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .card {
        transition: none;
      }

      :host([interactive]) .card:hover {
        transform: none;
      }
    }
  `;

  /**
   * Card variant style
   * @attr variant
   */
  @property({ type: String, reflect: true })
  variant: 'flat' | 'elevated' | 'glow' = 'flat';

  /**
   * Whether the card is interactive (hoverable/clickable)
   * @attr interactive
   */
  @property({ type: Boolean, reflect: true })
  interactive = false;

  override render() {
    return html`
      <div
        class="card"
        part="card"
        @click=${this._handleClick}
        role=${this.interactive ? 'button' : undefined}
        tabindex=${this.interactive ? '0' : undefined}
        @keydown=${this._handleKeydown}
      >
        <div class="header" part="header">
          <slot name="header"></slot>
        </div>
        <div class="body" part="body">
          <slot></slot>
        </div>
        <div class="footer" part="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }

  private _handleClick() {
    if (this.interactive) {
      this.dispatchEvent(new CustomEvent('st-click', {
        bubbles: true,
        composed: true
      }));
    }
  }

  private _handleKeydown(e: KeyboardEvent) {
    if (this.interactive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      this._handleClick();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'st-card': StCard;
  }
}
