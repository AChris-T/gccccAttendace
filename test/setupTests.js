import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// optional: polyfills or global mocks that most tests need
// e.g. window.scrollTo for jsdom

if (!global.TextEncoder) {
  global.TextEncoder = TextEncoder;
}
if (!window.scrollTo) {
  window.scrollTo = () => {};
}

// Provide a stable timezone or locale if needed in tests
// jest.setTimeout(10000); // if you need longer timeout for slow tests
