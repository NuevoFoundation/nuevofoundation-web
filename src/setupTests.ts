// Polyfill TextEncoder and TextDecoder for Node.js < 21
import { TextEncoder as UtilTextEncoder, TextDecoder as UtilTextDecoder } from 'util';

// Only polyfill if not already defined
if (typeof globalThis.TextEncoder === 'undefined') {
  Object.defineProperty(globalThis, 'TextEncoder', {
    value: UtilTextEncoder,
    configurable: true,
    writable: true,
  });
}
if (typeof globalThis.TextDecoder === 'undefined') {
  Object.defineProperty(globalThis, 'TextDecoder', {
    value: UtilTextDecoder,
    configurable: true,
    writable: true,
  });
}

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });
