/**
 * @jest-environment jsdom
 */
import { act, renderHook } from '@testing-library/react';
import useKeypress from '../useKeypress';
import { KeyboardEventHandler } from '../useKeypress.types';

const createKeydownEvent = (key:string) => new KeyboardEvent('keydown', { key });

const dispatchWindowEvent = (event: KeyboardEvent) =>
  act(() => {
    window.dispatchEvent(event);
  });

const renderUseKeypressHook = (keys: string | string[], handler: KeyboardEventHandler | null | undefined) =>
  renderHook(() => useKeypress(keys, handler));

test('calls handler when matching key has been pressed', () => {
  const handler = jest.fn();
  renderUseKeypressHook('Escape', handler);

  const event = createKeydownEvent('Escape');

  dispatchWindowEvent(event);

  expect(handler).toHaveBeenCalledWith(event);
});

test('calls handler when matching keys has been pressed', () => {
  const handler = jest.fn();
  renderUseKeypressHook(['Enter', ' '], handler);

  const event1 = createKeydownEvent('Enter');
  const event2 = createKeydownEvent(' ');

  dispatchWindowEvent(event1);
  dispatchWindowEvent(event2);

  expect(handler).toHaveBeenNthCalledWith(1, event1);
  expect(handler).toHaveBeenNthCalledWith(2, event2);
});

test('does not call handler when non-matching key has been pressed', () => {
  const handler = jest.fn();
  renderUseKeypressHook('Escape', handler);

  dispatchWindowEvent(createKeydownEvent('Enter'));

  expect(handler).not.toHaveBeenCalled();
});

test('supports older browsers', () => {
  const handler = jest.fn();
  renderUseKeypressHook('Escape', handler);

  const event = createKeydownEvent('Esc');

  dispatchWindowEvent(event);

  expect(handler).toHaveBeenCalledWith(event);
});

test('doesn’t throw if handler is nullish', () => {
  expect(() => {
    renderUseKeypressHook('Enter', null);
    renderUseKeypressHook('Enter', undefined);
    dispatchWindowEvent(createKeydownEvent('Enter'));
  }).not.toThrow();
});