import { defineSection, colorScheme } from '../../ds/schema/index.js';

export default defineSection({
  name: 'Fancyfy — Shoppable Image',
  class: 'fcy-shoppable-image',
  tag: 'section',
  settings: [
    { type: 'header', content: 'Image' },
    colorScheme({ default: 'scheme-1' }),
    { type: 'image_picker', id: 'image', label: 'Image' },
    { type: 'text', id: 'image_alt', label: 'Alt text' },
    {
      type: 'select',
      id: 'image_ratio',
      label: 'Image ratio',
      options: [
        { value: 'natural', label: 'Natural (original)' },
        { value: '16/9', label: '16:9 Landscape' },
        { value: '4/3', label: '4:3' },
        { value: '1/1', label: 'Square' },
      ],
      default: 'natural',
    },
    {
      type: 'select',
      id: 'max_width',
      label: 'Width',
      options: [
        { value: 'contained', label: 'Contained' },
        { value: 'full', label: 'Full width' },
      ],
      default: 'contained',
    },
  ],
  blocks: [{ type: 'fcy-si-pin', name: 'Product pin', limit: 12 }],
  max_blocks: 12,
  presets: [{ name: 'Fancyfy — Shoppable Image' }],
});
