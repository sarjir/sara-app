import { LitElement, html, css } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import './todo-item/index.js';
import './todo-list-2/index.js';
import './todo-list/index.js';
import './todo-list-lit-example/index.js';
import { TodoItem, TodoItemProps } from './todo-item/index.js';

const logo = new URL('../../assets/open-wc-logo.svg', import.meta.url).href;

@customElement('sara-app')
export class SaraApp extends LitElement {
  @property({ type: String }) header = 'My app';

  @state() items: TodoItemProps[] = [
    { elementId: '123', label: 'hej', done: true },
    { elementId: '321', label: 'hello' },
    { elementId: '234234', label: 'tjena' },
    { elementId: '234523', label: 'hola' },
  ];

  static styles = css`
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: calc(10px + 2vmin);
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
      background-color: var(--sara-app-background-color);
    }

    main {
      flex-grow: 1;
    }

    .logo {
      margin-top: 36px;
      animation: app-logo-spin infinite 20s linear;
    }

    @keyframes app-logo-spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    .app-footer {
      font-size: calc(12px + 0.5vmin);
      align-items: center;
    }

    .app-footer a {
      margin-left: 5px;
    }
  `;

  render() {
    return html`
      <main>
        <div class="logo"><img alt="open-wc logo" src=${logo} /></div>
        <h1>${this.header}</h1>

        <p>Edit <code>src/SaraApp.ts</code> and save to reload.</p>
        <a
          class="app-link"
          href="https://open-wc.org/guides/developing-components/code-examples"
          target="_blank"
          rel="noopener noreferrer"
        >
          Code examples
        </a>
        <!-- <todo-list-2>
          <todo-item elementId="321" done label="hej"></todo-item>
          <todo-item elementId="123" label="hello"></todo-item>
          <todo-item elementId="443" label="hi"></todo-item>
          <todo-item elementId="1322" label="tjena"></todo-item>
        </todo-list-2> -->
        <!-- <todo-list .items=${this.items}></todo-list> -->
        <todo-list-lit-example></todo-list-lit-example>
        <button>Hi!</button>
      </main>
    `;
  }
}
