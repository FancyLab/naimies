import { defineSection, colorScheme } from '../../ds/schema/index.js';

export default defineSection({
  name: 'Fancyfy — Store Locator',
  class: 'fcy-store-locator',
  tag: 'section',
  settings: [
    { type: 'header', content: 'Content' },
    colorScheme({ default: 'scheme-1' }),
    { type: 'text', id: 'heading', label: 'Heading', default: 'Find a store' },
    {
      type: 'text',
      id: 'metaobject_type',
      label: 'Metaobject type handle',
      default: 'store_location',
      info: 'The handle of your Store Location metaobject definition',
    },
    { type: 'range', id: 'locations_limit', label: 'Max locations', min: 1, max: 100, step: 1, default: 50 },
    { type: 'header', content: 'Map' },
    { type: 'text', id: 'map_style_url', label: 'Map style URL', default: 'https://tiles.openfreemap.org/styles/liberty', info: 'MapLibre style JSON URL. Default uses OpenFreeMap (free, no key needed).' },
    { type: 'number', id: 'map_lat', label: 'Initial latitude', default: 40.7128 },
    { type: 'number', id: 'map_lng', label: 'Initial longitude', default: -74.006 },
    { type: 'range', id: 'map_zoom', label: 'Initial zoom', min: 1, max: 18, step: 0.5, default: 9 },
    { type: 'header', content: 'SEO' },
    { type: 'checkbox', id: 'show_json_ld', label: 'Output LocalBusiness JSON-LD', default: true },
  ],
  blocks: [],
  presets: [{ name: 'Fancyfy — Store Locator' }],
});
