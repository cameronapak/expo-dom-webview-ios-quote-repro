# Repro: `@expo/dom-webview` (iOS) corrupts DOM-component props containing a `"`

Minimal reproduction for **[expo/expo#47014](https://github.com/expo/expo/issues/47014)**.

A `'use dom'` component renders **blank on iOS** when any prop value contains a
double quote (`"`). The visible error is misleading:

```
Web ERROR [Error: Top OS ($$EXPO_DOM_HOST_OS) is not defined. This is a bug in the DOM Component runtime.]
```

Android is unaffected.

## Run it

```bash
npm install
npm run ios       # -> BLANK screen, "Top OS ... is not defined" in Metro logs
npm run android   # -> renders '"Source Serif 4", serif' correctly
```

(A dev build, not Expo Go. All deps are already in `package.json`.)

### Built from a blank template with

```bash
npx create-expo-app@latest dom-quote-repro --template blank-typescript
npx expo install @expo/dom-webview @expo/metro-runtime react-dom react-native-web expo-dev-client
```

(`@expo/dom-webview` is the native module; the other three are the JS deps DOM
components need to bundle for web; `expo-dev-client` is only so the dev build can
be pointed at a non-default Metro port — not required to reproduce.)

## The whole repro

- [`components/QuoteDom.tsx`](components/QuoteDom.tsx) — a trivial `'use dom'` component that renders a `label` string prop.
- [`App.tsx`](App.tsx) — renders `<QuoteDom label={'"Source Serif 4", serif'} />`.

Swap the prop to a value with **no** double quote (`LABEL_OK` in `App.tsx`) and
iOS renders fine — isolating the `"` as the trigger.

## Root cause

`@expo/dom-webview`'s iOS `setInjectedJavaScriptObject` embeds the props JSON in
a **JS template literal** (`` return `<json>` ``), which un-escapes the `\"` that
`JSON.stringify` produced. The injected JSON becomes invalid, the DOM HTML
wrapper's `JSON.parse(injectedObjectJson())` throws, and `$$EXPO_DOM_HOST_OS` is
never set. Android uses a real `@JavascriptInterface` returning the raw string,
so it is unaffected. Full analysis in the issue.
