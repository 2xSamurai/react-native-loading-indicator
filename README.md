# LoadingIndicator

A better alternative to React Native's default ActivityIndicator

## Installation

```
  npm install react-native-loading-indicator
```

or

```bash
  yarn add react-native-loading-indicator
```

## Features

-   A beautiful collection of animations
-   Crisp and clean. No images. Everything you see is achieved using the Animated API and React Native components
-   Highly customisable. Control the speed, style, iteration count etc
-   Show identical animation across all Platforms

## Usage

Just import the component and start using it

```
import LoadingIndicator from 'react-native-loading-indicator';

const App = () => <LoadingIndicator loading={true} />;
```

## Props

| Props          | Default    | Type     | Description                                                                                            |
| -------------- | ---------- | -------- | ------------------------------------------------------------------------------------------------------ |
| loading        | false      | boolean  | Set to true to show the LoadingIndicator                                                               |
| indicatorStyle | {}         | object   | override the default indicator styles                                                                  |
| duration       | -          | int      | control the speed of the animation by reducing or increasing the animation duration                    |
| bezierFn       | -          | string   | control the easing of the animation using cubic bezier function                                        |
| iterations     | -1         | number   | number of times the animation should loop. default is infinite                                         |
| callback       | () => {}   | function | callback function to call after completing the animation if an iteration other than '-1' is specified. |
| animationName  | squareFlip | string   | animation style name. available styles ['squareFlip', 'circleScale']                                   |

## Note

Since the LoadingIndicator color is white by default, set a background color to see it in action.

## Inspiration

Animations ported from [SpinKit](https://github.com/tobiasahlin/SpinKit) by Tobias Ahlin.

## License

MIT
