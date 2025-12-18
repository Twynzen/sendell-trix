import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import './st-button.js';
import type { StButton } from './st-button.js';

describe('st-button', () => {
  it('renders with default properties', async () => {
    const el = await fixture<StButton>(html`<st-button>Click me</st-button>`);

    expect(el.variant).to.equal('outline');
    expect(el.size).to.equal('medium');
    expect(el.disabled).to.be.false;
    expect(el.loading).to.be.false;
    expect(el.type).to.equal('button');
  });

  it('renders slot content correctly', async () => {
    const el = await fixture<StButton>(html`<st-button>ENTER THE MATRIX</st-button>`);

    const button = el.shadowRoot?.querySelector('button');
    expect(button).to.exist;
    expect(button?.textContent).to.include('ENTER THE MATRIX');
  });

  it('applies variant attribute', async () => {
    const el = await fixture<StButton>(html`<st-button variant="filled">Test</st-button>`);

    expect(el.variant).to.equal('filled');
    expect(el.getAttribute('variant')).to.equal('filled');
  });

  it('applies danger variant', async () => {
    const el = await fixture<StButton>(html`<st-button variant="danger">Danger</st-button>`);

    expect(el.variant).to.equal('danger');
    expect(el.getAttribute('variant')).to.equal('danger');
  });

  it('applies ghost variant', async () => {
    const el = await fixture<StButton>(html`<st-button variant="ghost">Ghost</st-button>`);

    expect(el.variant).to.equal('ghost');
  });

  it('applies size attribute', async () => {
    const el = await fixture<StButton>(html`<st-button size="large">Large</st-button>`);

    expect(el.size).to.equal('large');
    expect(el.getAttribute('size')).to.equal('large');
  });

  it('disables button when disabled attribute is set', async () => {
    const el = await fixture<StButton>(html`<st-button disabled>Disabled</st-button>`);

    const button = el.shadowRoot?.querySelector('button');
    expect(el.disabled).to.be.true;
    expect(button?.disabled).to.be.true;
  });

  it('shows loading state', async () => {
    const el = await fixture<StButton>(html`<st-button loading>Loading</st-button>`);

    expect(el.loading).to.be.true;
    const spinner = el.shadowRoot?.querySelector('.loading-spinner');
    expect(spinner).to.exist;
  });

  it('dispatches st-click event when clicked', async () => {
    const el = await fixture<StButton>(html`<st-button>Click</st-button>`);

    const button = el.shadowRoot?.querySelector('button')!;
    setTimeout(() => button.click());

    const event = await oneEvent(el, 'st-click');
    expect(event).to.exist;
    expect(event.detail.originalEvent).to.exist;
  });

  it('does not dispatch event when disabled', async () => {
    const el = await fixture<StButton>(html`<st-button disabled>Disabled</st-button>`);

    let eventFired = false;
    el.addEventListener('st-click', () => {
      eventFired = true;
    });

    const button = el.shadowRoot?.querySelector('button')!;
    button.click();

    await new Promise(resolve => setTimeout(resolve, 100));
    expect(eventFired).to.be.false;
  });

  it('does not dispatch event when loading', async () => {
    const el = await fixture<StButton>(html`<st-button loading>Loading</st-button>`);

    let eventFired = false;
    el.addEventListener('st-click', () => {
      eventFired = true;
    });

    const button = el.shadowRoot?.querySelector('button')!;
    button.click();

    await new Promise(resolve => setTimeout(resolve, 100));
    expect(eventFired).to.be.false;
  });

  it('sets button type attribute', async () => {
    const el = await fixture<StButton>(html`<st-button type="submit">Submit</st-button>`);

    const button = el.shadowRoot?.querySelector('button');
    expect(button?.type).to.equal('submit');
  });

  it('exposes focus and blur methods', async () => {
    const el = await fixture<StButton>(html`<st-button>Focus</st-button>`);

    el.focus();
    const button = el.shadowRoot?.querySelector('button');
    expect(document.activeElement).to.equal(el);
    expect(el.shadowRoot?.activeElement).to.equal(button);

    el.blur();
  });

  it('exposes click method', async () => {
    const el = await fixture<StButton>(html`<st-button>Click</st-button>`);

    let clicked = false;
    el.addEventListener('st-click', () => {
      clicked = true;
    });

    el.click();
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(clicked).to.be.true;
  });

  it('passes accessibility audit', async () => {
    const el = await fixture<StButton>(html`<st-button>Accessible</st-button>`);
    await expect(el).to.be.accessible();
  });

  it('passes accessibility audit when disabled', async () => {
    const el = await fixture<StButton>(html`<st-button disabled>Disabled</st-button>`);
    await expect(el).to.be.accessible();
  });
});
