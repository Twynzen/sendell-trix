import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import './st-terminal-window.js';
import type { StTerminalWindow } from './st-terminal-window.js';

describe('st-terminal-window', () => {
  it('renders with default properties', async () => {
    const el = await fixture<StTerminalWindow>(
      html`<st-terminal-window></st-terminal-window>`
    );

    expect(el.title).to.equal('terminal@sendell-trix');
    expect(el.noFlicker).to.be.false;
    expect(el.noScanlines).to.be.false;
    expect(el.showCursor).to.be.false;
    expect(el.fullscreen).to.be.false;
  });

  it('renders custom title', async () => {
    const el = await fixture<StTerminalWindow>(
      html`<st-terminal-window title="matrix@system"></st-terminal-window>`
    );

    const title = el.shadowRoot?.querySelector('.title');
    expect(title?.textContent).to.equal('matrix@system');
  });

  it('renders slot content', async () => {
    const el = await fixture<StTerminalWindow>(
      html`<st-terminal-window><p>Wake up, Neo...</p></st-terminal-window>`
    );

    const slot = el.shadowRoot?.querySelector('slot:not([name])');
    expect(slot).to.exist;
  });

  it('renders window buttons by default', async () => {
    const el = await fixture<StTerminalWindow>(
      html`<st-terminal-window></st-terminal-window>`
    );

    const closeBtn = el.shadowRoot?.querySelector('.btn-close');
    const minimizeBtn = el.shadowRoot?.querySelector('.btn-minimize');
    const maximizeBtn = el.shadowRoot?.querySelector('.btn-maximize');

    expect(closeBtn).to.exist;
    expect(minimizeBtn).to.exist;
    expect(maximizeBtn).to.exist;
  });

  it('hides buttons when show-buttons is false', async () => {
    const el = await fixture<StTerminalWindow>(
      html`<st-terminal-window .showButtons=${false}></st-terminal-window>`
    );

    const buttons = el.shadowRoot?.querySelector('.buttons');
    expect(buttons).to.not.exist;
  });

  it('dispatches st-close event when close button clicked', async () => {
    const el = await fixture<StTerminalWindow>(
      html`<st-terminal-window></st-terminal-window>`
    );

    const closeBtn = el.shadowRoot?.querySelector('.btn-close')!;
    setTimeout(() => (closeBtn as HTMLButtonElement).click());

    const event = await oneEvent(el, 'st-close');
    expect(event).to.exist;
  });

  it('dispatches st-minimize event when minimize button clicked', async () => {
    const el = await fixture<StTerminalWindow>(
      html`<st-terminal-window></st-terminal-window>`
    );

    const minimizeBtn = el.shadowRoot?.querySelector('.btn-minimize')!;
    setTimeout(() => (minimizeBtn as HTMLButtonElement).click());

    const event = await oneEvent(el, 'st-minimize');
    expect(event).to.exist;
  });

  it('toggles fullscreen on maximize click', async () => {
    const el = await fixture<StTerminalWindow>(
      html`<st-terminal-window></st-terminal-window>`
    );

    const maximizeBtn = el.shadowRoot?.querySelector('.btn-maximize')!;
    setTimeout(() => (maximizeBtn as HTMLButtonElement).click());

    const event = await oneEvent(el, 'st-maximize');
    expect(event.detail.fullscreen).to.be.true;
    expect(el.fullscreen).to.be.true;
  });

  it('shows cursor when show-cursor is true', async () => {
    const el = await fixture<StTerminalWindow>(
      html`<st-terminal-window show-cursor></st-terminal-window>`
    );

    const cursor = el.shadowRoot?.querySelector('.cursor');
    expect(cursor).to.exist;
  });

  it('applies no-flicker attribute', async () => {
    const el = await fixture<StTerminalWindow>(
      html`<st-terminal-window no-flicker></st-terminal-window>`
    );

    expect(el.noFlicker).to.be.true;
    expect(el.hasAttribute('no-flicker')).to.be.true;
  });

  it('applies no-scanlines attribute', async () => {
    const el = await fixture<StTerminalWindow>(
      html`<st-terminal-window no-scanlines></st-terminal-window>`
    );

    expect(el.noScanlines).to.be.true;
    expect(el.hasAttribute('no-scanlines')).to.be.true;
  });

  it('exposes toggleFullscreen method', async () => {
    const el = await fixture<StTerminalWindow>(
      html`<st-terminal-window></st-terminal-window>`
    );

    expect(el.fullscreen).to.be.false;
    el.toggleFullscreen();
    expect(el.fullscreen).to.be.true;
    el.toggleFullscreen();
    expect(el.fullscreen).to.be.false;
  });

  it('passes accessibility audit', async () => {
    const el = await fixture<StTerminalWindow>(
      html`<st-terminal-window title="Accessible Terminal">
        <p>Content</p>
      </st-terminal-window>`
    );
    await expect(el).to.be.accessible();
  });
});
