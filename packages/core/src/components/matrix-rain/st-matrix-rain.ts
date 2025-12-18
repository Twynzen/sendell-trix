import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * Matrix digital rain animation component.
 * Creates the iconic falling green characters effect from The Matrix.
 *
 * @slot - Optional content to display over the rain effect
 *
 * @csspart canvas - The canvas element
 *
 * @cssprop [--st-matrix-rain-color=#00ff41] - The color of the falling characters
 * @cssprop [--st-matrix-rain-background=#000000] - The background color
 *
 * @example
 * ```html
 * <st-matrix-rain></st-matrix-rain>
 * <st-matrix-rain overlay>
 *   <h1>Welcome to the Matrix</h1>
 * </st-matrix-rain>
 * ```
 */
@customElement('st-matrix-rain')
export class StMatrixRain extends LitElement {
  static override styles = css`
    :host {
      display: block;
      position: relative;
      overflow: hidden;
      background: var(--st-matrix-rain-background, #000000);
    }

    canvas {
      display: block;
      width: 100%;
      height: 100%;
    }

    :host([overlay]) {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: -1;
    }

    .content {
      position: relative;
      z-index: 1;
      pointer-events: auto;
    }

    /* Static fallback for reduced motion */
    .static-overlay {
      position: absolute;
      inset: 0;
      background:
        repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0, 255, 65, 0.03) 2px,
          rgba(0, 255, 65, 0.03) 4px
        );
      pointer-events: none;
    }
  `;

  /**
   * Frames per second for the animation
   * @attr fps
   */
  @property({ type: Number })
  fps = 30;

  /**
   * Font size for the characters
   * @attr font-size
   */
  @property({ type: Number, attribute: 'font-size' })
  fontSize = 16;

  /**
   * Color of the falling characters
   * @attr color
   */
  @property({ type: String })
  color = '#00ff41';

  /**
   * Whether this is an overlay effect
   * @attr overlay
   */
  @property({ type: Boolean, reflect: true })
  overlay = false;

  /**
   * Opacity of the rain effect
   * @attr opacity
   */
  @property({ type: Number })
  opacity = 1;

  /**
   * Speed multiplier for the animation
   * @attr speed
   */
  @property({ type: Number })
  speed = 1;

  /**
   * Character density (1-10)
   * @attr density
   */
  @property({ type: Number })
  density = 5;

  /**
   * Whether to pause the animation
   * @attr paused
   */
  @property({ type: Boolean })
  paused = false;

  @state() private _canvas?: HTMLCanvasElement;
  @state() private _ctx?: CanvasRenderingContext2D;
  @state() private _rainDrops: number[] = [];
  @state() private _animationId?: number;
  @state() private _lastTime = 0;
  @state() private _reducedMotion = false;

  // Matrix characters: Katakana + Latin + Numbers
  private _alphabet = 'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
  private _resizeObserver?: ResizeObserver;

  override connectedCallback() {
    super.connectedCallback();

    // Check for reduced motion preference
    this._reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.matchMedia('(prefers-reduced-motion: reduce)')
      .addEventListener('change', (e) => {
        this._reducedMotion = e.matches;
        if (e.matches) {
          this._stopAnimation();
        } else if (!this.paused) {
          this._startAnimation();
        }
      });
  }

  override firstUpdated() {
    this._canvas = this.shadowRoot?.querySelector('canvas') as HTMLCanvasElement;
    this._ctx = this._canvas?.getContext('2d') as CanvasRenderingContext2D;

    this._resizeObserver = new ResizeObserver(() => this._handleResize());
    this._resizeObserver.observe(this);

    this._handleResize();

    if (!this._reducedMotion && !this.paused) {
      this._startAnimation();
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._stopAnimation();
    this._resizeObserver?.disconnect();
  }

  override updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('paused')) {
      if (this.paused) {
        this._stopAnimation();
      } else if (!this._reducedMotion) {
        this._startAnimation();
      }
    }

    if (changedProperties.has('density') || changedProperties.has('fontSize')) {
      this._handleResize();
    }
  }

  private _handleResize() {
    if (!this._canvas) return;

    const rect = this.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    this._canvas.width = rect.width * dpr;
    this._canvas.height = rect.height * dpr;
    this._canvas.style.width = `${rect.width}px`;
    this._canvas.style.height = `${rect.height}px`;

    if (this._ctx) {
      this._ctx.scale(dpr, dpr);
    }

    const columns = Math.floor(rect.width / this.fontSize);
    // Adjust number of active columns based on density
    const activeColumns = Math.ceil(columns * (this.density / 10));

    this._rainDrops = new Array(columns).fill(0).map((_, i) => {
      // Randomly activate columns based on density
      if (i < activeColumns) {
        return Math.random() * -100;
      }
      return -9999; // Inactive column
    });

    // Shuffle the array to distribute active columns
    for (let i = this._rainDrops.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this._rainDrops[i], this._rainDrops[j]] = [this._rainDrops[j], this._rainDrops[i]];
    }
  }

  private _startAnimation() {
    if (this._animationId) return;

    const frameInterval = 1000 / this.fps;

    const animate = (timestamp: number) => {
      if (timestamp - this._lastTime >= frameInterval) {
        this._draw();
        this._lastTime = timestamp;
      }
      this._animationId = requestAnimationFrame(animate);
    };

    this._animationId = requestAnimationFrame(animate);
  }

  private _stopAnimation() {
    if (this._animationId) {
      cancelAnimationFrame(this._animationId);
      this._animationId = undefined;
    }
  }

  private _draw() {
    if (!this._ctx || !this._canvas) return;

    const rect = this.getBoundingClientRect();

    // Semi-transparent black for trail effect
    this._ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    this._ctx.fillRect(0, 0, rect.width, rect.height);

    this._ctx.fillStyle = this.color;
    this._ctx.font = `${this.fontSize}px monospace`;
    this._ctx.globalAlpha = this.opacity;

    for (let i = 0; i < this._rainDrops.length; i++) {
      // Skip inactive columns
      if (this._rainDrops[i] < -100) continue;

      const char = this._alphabet.charAt(
        Math.floor(Math.random() * this._alphabet.length)
      );

      const x = i * this.fontSize;
      const y = this._rainDrops[i] * this.fontSize;

      // Draw brighter lead character
      if (this._rainDrops[i] > 0) {
        this._ctx.fillStyle = '#ffffff';
        this._ctx.fillText(char, x, y);
        this._ctx.fillStyle = this.color;
      }

      // Draw the character
      this._ctx.fillText(char, x, y - this.fontSize);

      // Reset drop when it goes off screen
      if (y > rect.height && Math.random() > 0.975) {
        this._rainDrops[i] = 0;
      }

      this._rainDrops[i] += this.speed;
    }

    this._ctx.globalAlpha = 1;
  }

  override render() {
    if (this._reducedMotion) {
      return html`
        <div class="static-overlay"></div>
        <div class="content">
          <slot></slot>
        </div>
      `;
    }

    return html`
      <canvas part="canvas"></canvas>
      <div class="content">
        <slot></slot>
      </div>
    `;
  }

  /**
   * Start the rain animation
   */
  public start() {
    this.paused = false;
  }

  /**
   * Stop the rain animation
   */
  public stop() {
    this.paused = true;
  }

  /**
   * Toggle the rain animation
   */
  public toggle() {
    this.paused = !this.paused;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'st-matrix-rain': StMatrixRain;
  }
}
