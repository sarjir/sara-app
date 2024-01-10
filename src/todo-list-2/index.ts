import { LitElement, html } from 'lit';
import {
  customElement,
  property,
  // queryAssignedElements,
} from 'lit/decorators.js';
import { TodoItem } from '../todo-item/index.js';

@customElement('todo-list-2')
export class TodoList2 extends LitElement {
  @property({ type: Array }) items = [];

  private allText = '';

  // @queryAssignedElements({ selector: 'label' })
  // listItems!: Array<HTMLElement>;

  // get _slottedChildren() {
  //   console.log('do we get inside the getter?');
  //   const slot = this.shadowRoot?.querySelector('slot');
  //   return slot?.assignedElements({ flatten: true });
  // }

  get _listItems() {
    console.log('do we get inside the getter?');
    console.log('this.shadowRoot', this.shadowRoot?.querySelector('slot'));
    const slot = this.shadowRoot?.querySelector(
      'slot'
    ) as HTMLSlotElement | null;
    const lol = slot?.assignedElements() as TodoItem[];
    return lol.filter(node => !node.done); // This works!!
    // return slot?.assignedElements();
  }

  // handleSlotchange(e: Event) {
  //   console.log('allText inside handleSlotchange', this.allText);

  //   const slotElement = e.target as HTMLSlotElement;
  //   const childNodes = slotElement.assignedNodes({ flatten: true });
  //   // ... do something with childNodes ...
  //   this.allText = childNodes
  //     .map(node => (node.textContent ? node.textContent : ''))
  //     .join('');
  // }

  // Filter out slots that are done

  render() {
    // console.log('slot', this.slot);
    setTimeout(() => {
      // This works! I just need to wait for my items to load.
      console.log('this._listItems', this._listItems);
    }, 1000);

    return html` <slot></slot> `;
    // return html` <slot @slotchange=${this.handleSlotchange}></slot> `;
  }
}
