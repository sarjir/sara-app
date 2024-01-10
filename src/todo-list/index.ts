import { LitElement, PropertyValues, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { TodoItemProps } from '../todo-item/index.js';

@customElement('todo-list')
export class TodoList extends LitElement {
  @property({ type: Array }) items: TodoItemProps[] = [];

  @state() showingDoneItems = true;

  @state() visibleTodos: TodoItemProps[] = []; // I think I have to do this in a life cycle method instead.
  // Should it be the other way around? That I instead save the items that are sent in to a static const? And reset to that value?
  // But then what if that value changes due to click on checkbox?

  firstUpdated(changedProperties: PropertyValues<this>) {
    // maybe use connectedCallback instead?
    // willUpdate(changedProperties: PropertyValues<this>) {
    // only need to check changed properties for an expensive computation.
    console.log('changedProperties', changedProperties);
    if (changedProperties.has('items')) {
      // I think I need to rewrite this check ☝️
      this.visibleTodos = this.items;
      console.log('hello');
      // this.setVisibleTodos();
    }
  }

  toggleShowingDoneItems() {
    this.showingDoneItems = !this.showingDoneItems;
    // this.setVisibleTodos();
  }

  setVisibleTodos() {
    console.log('setVisibleTodos this.showingDoneItems', this.showingDoneItems);
    if (this.showingDoneItems) {
      this.visibleTodos = this.items;
    }
    console.log('do we get here?');
    this.visibleTodos.filter(item => !item?.done);
    console.log('setVisibleTodos visibleTodos', this.visibleTodos);
  }

  renderVisibleTodos2(allItems: TodoItemProps[]) {
    if (this.showingDoneItems) {
      return allItems.map(
        item => html`<todo-item
          label=${item.label}
          ?done=${item.done}
          elementId=${item.elementId}
          @checked=${this.checkedHandler}
        ></todo-item>`
      );
    }

    return allItems
      .filter(item => !item?.done)
      .map(
        item => html`<todo-item
          label=${item.label}
          ?done=${item.done}
          elementId=${item.elementId}
          @checked=${this.checkedHandler}
        ></todo-item>`
      );
  }

  renderVisibleTodos(allItems: TodoItemProps[]) {
    if (this.showingDoneItems) {
      return repeat(
        // Does this need to be inside html``?
        allItems,
        item => item.elementId,
        item => html`<todo-item
          label=${item.label}
          ?done=${item.done}
          elementId=${item.elementId}
          @checked=${this.checkedHandler}
        ></todo-item>`
      );

      // return allItems.map(
      //   item => html`<todo-item
      //     label=${item.label}
      //     ?done=${item.done}
      //     elementId=${item.elementId}
      //     @checked=${this.checkedHandler}
      //   ></todo-item>`
      // );
    }

    return repeat(
      // Does this need to be inside html``?
      allItems,
      item => item.elementId,
      item => {
        if (item.done) {
          return null;
        }

        return html`<todo-item
          label=${item.label}
          ?done=${item.done}
          elementId=${item.elementId}
          @checked=${this.checkedHandler}
        ></todo-item>`;
      }
    );

    // return allItems
    //   .filter(item => !item?.done)
    //   .map(
    //     item => html`<todo-item
    //       label=${item.label}
    //       ?done=${item.done}
    //       elementId=${item.elementId}
    //       @checked=${this.checkedHandler}
    //     ></todo-item>`
    //   );
  }

  // add listnerer for checked custom event
  // should update the list. This feels a bit hacky, but I will try it to hopefully get a better understanding of how this works.

  checkedHandler(e: CustomEvent) {
    // Use repeat might solve my issue. Why? And why did this work before?
    return this.items.map(item => {
      if (item.elementId === e.detail.elementId) {
        console.log('e.detail.done', e.detail.done);
        return {
          ...item,
          done: e.detail.done,
        };
      }

      return item;
    });

    // The above code does what it is expected to. It generates a new array based on the callback. But the property does not get updated. Why?
  }

  render() {
    // const visibleTodos = this.setVisibleTodos(); // Is this computationally expensive? It seems like this is what lit-html does in their docs.
    console.log('this.items', this.items);
    console.log('this.visibleTodos', this.visibleTodos);

    return html`
      <button @click="${this.toggleShowingDoneItems}">Toggle done items</button>
      ${this.renderVisibleTodos(this.visibleTodos)}
      <!-- Lit element also does this in their docs -->
    `;
  }
}

// https://lit.dev/playground/#sample=examples/motion-todos
