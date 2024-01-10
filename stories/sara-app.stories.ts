import { html, TemplateResult } from 'lit';
import '../src/sara-app.js';

export default {
  title: 'SaraApp',
  component: 'sara-app',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  header?: string;
  backgroundColor?: string;
}

const Template: Story<ArgTypes> = ({ header, backgroundColor = 'white' }: ArgTypes) => html`
  <sara-app style="--sara-app-background-color: ${backgroundColor}" .header=${header}></sara-app>
`;

export const App = Template.bind({});
App.args = {
  header: 'My app',
};
