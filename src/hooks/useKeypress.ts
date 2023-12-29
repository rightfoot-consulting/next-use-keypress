import { useEffect, useRef } from 'react';
import { KeyboardEventHandler } from './useKeypress.types';

// Address any inconsistencies from older browsers by remapping
// non-conformantnames.
// see: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
const aliases = new Map([
    ['Add', '+'],
    ['Apps', 'ContextMenu'],
    ['Crsel', 'CrSel'],
    ['Decimal', '.'],
    ['Del', 'Delete'],
    ['Divide', '/'],
    ['Down', 'ArrowDown'],
    ['Esc', 'Escape'],
    ['Exsel', 'ExSel'],
    ['Left', 'ArrowLeft'],
    ['Multiply', '*'],
    ['Right', 'ArrowRight'],
    ['Scroll', 'ScrollLock'],
    ['Spacebar', ' '],
    ['Subtract', '-'],
    ['Up', 'ArrowUp'],
    ['Win', 'Meta'], 
  ]);
  
  /**
   * On old browsers the key strings coming in on the keyboard event
   * do not comply with modern standards. This function ensures that
   * these events are updated before being handled to address these
   * inconsistencies.
   * 
   * @param event event to remap
   */
  const remapOldKeyboardEvent = (event: KeyboardEvent) => {
    // If the event is from an old browser with bad key values, 
    // fix it otherwise leave the event unchanged.
    if (aliases.has(event.key)) {
      const key = aliases.get(event.key);
      Object.defineProperty(event, 'key', {
        configurable: true,
        enumerable: true,
        get() {
          return key;
        },
      });
    }
  };
  
  const useKeypress = (keys: string | string[], handler: KeyboardEventHandler | null | undefined) => {
    const eventListenerRef = useRef<KeyboardEventHandler>();
    
    useEffect(() => {
      eventListenerRef.current = (event:KeyboardEvent) => {
        remapOldKeyboardEvent(event);
        if (Array.isArray(keys) ? keys.includes(event.key) : keys === event.key) {
          if(handler) handler(event);
        }
      };
    }, [keys, handler]);
  
    useEffect(() => {
      const eventListener = (event: KeyboardEvent) => {
        if(eventListenerRef && eventListenerRef.current) {
          eventListenerRef.current(event);
        }
      };
      window.addEventListener('keydown', eventListener);
      return () => {
        window.removeEventListener('keydown', eventListener);
      };
    }, []);
  };
  
  export default useKeypress;