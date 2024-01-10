import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import type { SaraApp } from '../src/sara-app.js';
import '../src/sara-app.js';

describe('SaraApp', () => {
  let element: SaraApp;
  beforeEach(async () => {
    element = await fixture(html`<sara-app></sara-app>`);
  });

  it('renders a h1', () => {
    const h1 = element.shadowRoot!.querySelector('h1')!;
    expect(h1).to.exist;
    expect(h1.textContent).to.equal('My app');
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
