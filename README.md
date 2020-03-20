# Revolut exchange wdiget

![Image of Yaktocat](https://github.com/krkakrka/revo-task/blob/master/images/screen.png)

## To dev build
1. `git clone`
2. `yarn install`
3. Then
- For development: `yarn dev`
- For dev build: `yarn bundle:dev`

## Todo
- Prod build - currently only dev (includes redux dev tools, uses webpack dev defaults, etc).
- Improve type system - partly skipped due to time constraints.
- Add react-testing-library to better emulate the user.
- Prettier currency selectors.

## Notes
- When testing, change `TEN_SECONDS_IN_MS` constant in `exchangeRate.service.ts`.
Bigger interval was used to avoid draining `https://api.exchangeratesapi.io` too much.
This setting should change according to build settings (noted in "Todo" section).
