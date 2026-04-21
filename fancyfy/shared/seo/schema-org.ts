// Minimal JSON-LD type stubs — enough for build-time safety without pulling in schema-dts.

export interface Thing {
  '@context': 'https://schema.org';
  '@type': string;
}

export interface Organization extends Thing {
  '@type': 'Organization';
  name: string;
  url?: string;
  logo?: ImageObject;
  sameAs?: string[];
}

export interface WebSite extends Thing {
  '@type': 'WebSite';
  name: string;
  url: string;
  potentialAction?: SearchAction;
}

export interface SearchAction {
  '@type': 'SearchAction';
  target: { '@type': 'EntryPoint'; urlTemplate: string };
  'query-input': string;
}

export interface Product extends Thing {
  '@type': 'Product';
  name: string;
  description?: string;
  image?: string[];
  sku?: string;
  brand?: { '@type': 'Brand'; name: string };
  offers: Offer | Offer[];
  aggregateRating?: AggregateRating;
}

export interface Offer {
  '@type': 'Offer';
  price: string | number;
  priceCurrency: string;
  availability: string;
  url?: string;
  priceValidUntil?: string;
}

export interface AggregateRating {
  '@type': 'AggregateRating';
  ratingValue: number;
  reviewCount: number;
}

export interface BreadcrumbList extends Thing {
  '@type': 'BreadcrumbList';
  itemListElement: ListItem[];
}

export interface ListItem {
  '@type': 'ListItem';
  position: number;
  name: string;
  item?: string;
}

export interface ItemList extends Thing {
  '@type': 'ItemList';
  name?: string;
  itemListElement: ListItem[];
}

export interface FAQPage extends Thing {
  '@type': 'FAQPage';
  mainEntity: Question[];
}

export interface Question {
  '@type': 'Question';
  name: string;
  acceptedAnswer: Answer;
}

export interface Answer {
  '@type': 'Answer';
  text: string;
}

export interface ImageObject {
  '@type': 'ImageObject';
  url: string;
  width?: number;
  height?: number;
}

export interface LocalBusiness extends Thing {
  '@type': 'LocalBusiness';
  name: string;
  description?: string;
  telephone?: string;
  image?: string;
  address: PostalAddress;
  geo?: GeoCoordinates;
  openingHours?: string;
}

export interface PostalAddress {
  '@type': 'PostalAddress';
  streetAddress?: string;
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry?: string;
}

export interface GeoCoordinates {
  '@type': 'GeoCoordinates';
  latitude: number;
  longitude: number;
}
