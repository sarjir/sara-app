import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
// import { repeat } from 'lit/directives/repeat.js';
import { repeat } from 'lit/directives/repeat.js';
import { TodoItemProps } from '../todo-item/index.js';
import { styles } from './styles.js';

const todos = [
  { elementId: '123', label: 'hej', done: true },
  { elementId: '321', label: 'hello' },
  { elementId: '234234', label: 'tjena' },
  { elementId: '234523', label: 'hola' },
];

@customElement('todo-list-lit-example')
export class TodoListLitExample extends LitElement {
  static styles = styles;

  @property({ type: Array }) items: TodoItemProps[] = todos;

  updateItem(updatingItem: TodoItemProps, done: boolean) {
    console.log('updateItem', updatingItem, done);
    this.items = this.items.map(item => {
      if (updatingItem.elementId === item.elementId) {
        // eslint-disable-next-line no-param-reassign
        updatingItem.done = !item.done;
      }
      return item;
    });
  }

  render() {
    console.log('rerender');
    const list = (done = false) => html`<div class="list">
      <h3>${done ? `Done` : `Todos`}</h3>
      ${repeat(
        this.items.filter(item => (done ? item.done : !item.done)), // What does this actually do?
        item => item.elementId,
        item => html`<todo-item
          label=${item.label}
          ?done=${item.done}
          elementId=${item.elementId}
          @checked=${(e: Event) =>
            this.updateItem(item, (e.target! as HTMLInputElement).checked)}
        ></todo-item>`
      )}
    </div> `;

    return html` <div class="lists">${list()} ${list(true)}</div> `;

    // return html`
    //   <button>Toggle done items</button>
    // `;
  }
}

// https://lit.dev/playground/#sample=examples/motion-todos
