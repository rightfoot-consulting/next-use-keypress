# next-use-keypress
Typescript ready Nextjs hook which listens for pressed keys.  Shared in support of the open source community
by https://rightfoot.consulting.  Proud authors of [**Baby Back (tm)**](https://rightfoot.consulting/baby-got-back) back end web tools.

## Usage
useKeypress(keys, handler);

## Parameters

keys a single or array of key value(s) to listen to.
handler function to be called when one of the matching key values has been pressed.


## Examples
Listening to a single key:

    import useKeypress from 'next-use-keypress';

    const Example = (props) => {
    // ...
    useKeypress('Escape', () => {
        // Do something when the user has pressed the Escape key
    });
    // ...
    };

Listening to multiple keys:

    import useKeypress from 'next-use-keypress';

    const Example = (props) => {
    // ...
    useKeypress(['ArrowLeft', 'ArrowRight'], (event) => {
        if (event.key === 'ArrowLeft') {
        moveLeft();
        } else {
        moveRight();
        }
    });
    // ...
    };

## Older Browser Support
Includes a remap function for the KeyboardEvent.key property to handle inconsistencies from Internet Explorer and older versions of Edge and Firefox.

## Use Case
Tested with nextjs 14.0.3 with typescript for the Hooks API.