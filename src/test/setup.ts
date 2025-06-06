import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/vue';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers as any);

afterEach(() => {
  cleanup();
});