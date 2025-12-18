import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * Matrix-styled tooltip component.
 *
 * @slot - The element that triggers the tooltip
 *
 * @csspart tooltip - The tooltip popup
 *
 * @cssprop [--st-tooltip-background=var(--st-color-surface)] - Tooltip background
 * @cssprop [--st-tooltip-color=var(--st-color-text-primary)] - Tooltip text color
 * @cssprop [--st-tooltip-border-color=var(--st-color-primary)] - Tooltip border color
 *
 * @example
 * ```html
 * <st-tooltip content="System information">
 *   <st-button>Hover me</st-button>
 * </st-tooltip>
 * ```
 */
@customElement('st-tooltip')
export class StTooltip extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
      position: relative;
      --_bg: var(--st-tooltip-background, var(--st-color-surface, #0d0d0d));
      --_color: var(--st-tooltip-color, var(--st-color-text-primary, #00ff41));
      --_border: var(--st-tooltip-border-color, var(--st-color-primary, #00ff41));
      --_glow: var(--st-color-glow, #00ff41);
    }

    .trigger {
      display: inline-block;
    }

    .tooltip {
      position: absolute;
      z-index: 1070;
      padding: 8px 12px;
      background: var(--_bg);
      color: var(--_color);
      border: 1px solid var(--_border);
      font-family: 'Fira Code', monospace;
      font-size: 12px;
      line-height: 1.4;
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.2s, visibility 0.2s, transform 0.2s;
      box-shadow: 0 0 10px rgba(0, 255, 65, 0.3);
    }

    .tooltip.visible {
      opacity: 1;
      visibility: visible;
    }

    /* Arrow */
    .tooltip::before {
      content: '';
      position: absolute;
      width: 8px;
      height: 8px;
      background: var(--_bg);
      border: 1px solid var(--_border);
      transform: rotate(45deg);
    }

    /* Positions */
    .tooltip.top {
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%) translateY(-8px);
      margin-bottom: 8px;
    }

    .tooltip.top.visible {
      transform: translateX(-50%) translateY(0);
    }

    .tooltip.top::before {
      bottom: -5px;
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
      border-top: none;
      border-left: none;
    }

    .tooltip.bottom {
      top: 100%;
      left: 50%;
      transform: translateX(-50%) translateY(8px);
      margin-top: 8px;
    }

    .tooltip.bottom.visible {
      transform: translateX(-50%) translateY(0);
    }

    .tooltip.bottom::before {
      top: -5px;
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
      border-bottom: none;
      border-right: none;
    }

    .tooltip.left {
      right: 100%;
      top: 50%;
      transform: translateY(-50%) translateX(-8px);
      margin-right: 8px;
    }

    .tooltip.left.visible {
      transform: translateY(-50%) translateX(0);
    }

    .tooltip.left::before {
      right: -5px;
      top: 50%;
      transform: translateY(-50%) rotate(45deg);
      border-left: none;
      border-bottom: none;
    }

    .tooltip.right {
      left: 100%;
      top: 50%;
      transform: translateY(-50%) translateX(8px);
      margin-left: 8px;
    }

    .tooltip.right.visible {
      transform: translateY(-50%) translateX(0);
    }

    .tooltip.right::before {
      left: -5px;
      top: 50%;
      transform: translateY(-50%) rotate(45deg);
      border-right: none;
      border-top: none;
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .tooltip {
        transition: none;
      }
    }
  `;

  /**
   * Tooltip content text
   * @attr content
   */
  @property({ type: String })
  content = '';

  /**
   * Tooltip position
   * @attr position
   */
  @property({ type: String })
  position: 'top' | 'bottom' | 'left' | 'right' = 'top';

  /**
   * Delay before showing tooltip (ms)
   * @attr delay
   */
  @property({ type: Number })
  delay = 200;

  /**
   * Whether the tooltip is disabled
   * @attr disabled
   */
  @property({ type: Boolean })
  disabled = false;

  @state()
  private _visible = false;

  private _showTimeout?: ReturnType<typeof setTimeout>;
  private _hideTimeout?: ReturnType<typeof setTimeout>;

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._clearTimeouts();
  }

  private _clearTimeouts() {
    if (this._showTimeout) clearTimeout(this._showTimeout);
    if (this._hideTimeout) clearTimeout(this._hideTimeout);
  }

  private _show() {
    if (this.disabled) return;

    this._clearTimeouts();
    this._showTimeout = setTimeout(() => {
      this._visible = true;
    }, this.delay);
  }

  private _hide() {
    this._clearTimeouts();
    this._hideTimeout = setTimeout(() => {
      this._visible = false;
    }, 100);
  }

  override render() {
    return html`
      <span
        class="trigger"
        @mouseenter=${this._show}
        @mouseleave=${this._hide}
        @focus=${this._show}
        @blur=${this._hide}
        aria-describedby="tooltip"
      >
        <slot></slot>
      </span>
      ${this.content ? html`
        <div
          id="tooltip"
          class="tooltip ${this.position} ${this._visible ? 'visible' : ''}"
          part="tooltip"
          role="tooltip"
          aria-hidden=${!this._visible}
        >
          ${this.content}
        </div>
      ` : ''}
    `;
  }

  /**
   * Programmatically show the tooltip
   */
  public show() {
    this._visible = true;
  }

  /**
   * Programmatically hide the tooltip
   */
  public hide() {
    this._visible = false;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'st-tooltip': StTooltip;
  }
}
