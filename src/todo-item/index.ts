import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export interface TodoItemProps {
  elementId: string;
  label: string;
  done?: boolean;
}

@customElement('todo-item')
export class TodoItem extends LitElement {
  @property({ type: String }) elementId = '';

  @property({ type: String }) label = '';

  @property({ type: Boolean }) done = false;

  static styles = css`
    todo-item {
      display: block;
      margin: 0.5rem;
    }

    input:checked {
      border: none;
      outline: 2px solid deeppink;
    }

    input:checked + label {
      color: #ccc;
      font-style: italic;
    }
  `;

  handleClick() {
    console.log('clicked');
    this.done = !this.done;

    const event = new CustomEvent('checked', {
      detail: { done: this.done, elementId: this.elementId },
      bubbles: true,
      composed: true,
      cancelable: true,
    });
    this.dispatchEvent(event);
    // return this.done; // Can I return something from here? Would that be valueable?
  }

  // add custom event checked

  render() {
    return html`
      <div>
        <input
          ?checked=${this.done}
          id=${this.elementId}
          type="checkbox"
          @click=${this.handleClick}
          @change=${this.handleClick}
        />
        <label for=${this.elementId}>${this.label}</label>
      </div>
    `;
    // return html`<input type="checkbox"></input>`;
  }
}

// customElements.define('todo-item', TodoItem);
