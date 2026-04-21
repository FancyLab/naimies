import { defineSection, colorScheme } from '../../ds/schema/index.js';

export default defineSection({
  name: 'Fancyfy — Size Guide',
  class: 'fcy-size-guide',
  tag: 'section',
  settings: [
    { type: 'header', content: 'Trigger' },
    colorScheme({ default: 'scheme-1' }),
    {
      type: 'text',
      id: 'trigger_label',
      label: 'Button label',
      default: 'Size Guide',
    },
    {
      type: 'select',
      id: 'trigger_position',
      label: 'Button position',
      options: [
        { value: 'inline', label: 'Inline (in section flow)' },
        { value: 'floating', label: 'Floating (fixed bottom-right)' },
      ],
      default: 'inline',
    },
    { type: 'header', content: 'Modal' },
    {
      type: 'text',
      id: 'modal_heading',
      label: 'Modal heading',
      default: 'Size Guide',
    },
  ],
  blocks: [
    { type: 'fcy-sg-table', name: 'Size table', limit: 5 },
    { type: 'fcy-sg-note', name: 'Note', limit: 3 },
    { type: 'fcy-sg-image', name: 'Measurement image', limit: 2 },
  ],
  presets: [{ name: 'Fancyfy — Size Guide' }],
});
