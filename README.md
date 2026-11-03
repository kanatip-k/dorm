# Dormitory Management Mobile App

A React Native / Expo prototype with screens and API helpers for student records, rooms, administration, and dormitory history.

## Overview and features

The inspected `dom` variant contains student add/edit/list screens, room views, login and administrator screens, history helpers, and reusable UI components. These describe code present in the project, not verified production behavior or secure authentication.

## Tech stack and structure

React 18.2, React Native 0.71, Expo SDK 48, React Navigation, React Native Paper, and AsyncStorage appear in `package.json`.

- `App.js` / `index.js`: application entry points
- `screens/`: application screens
- `components/` and `theme/`: UI components and colors
- `services/`: API, administrator, and history helpers
- `android/`: native Android project

## Requirements and installation

Use a Node.js and Android SDK environment compatible with the existing Expo SDK 48 project; compatibility with current toolchains has not been verified. Review package scripts before installing dependencies.

```sh
npm ci
```

The original `db.json` was withheld for personal-data review. `db.example.json` provides empty `students` and `history` collections without real student information; copy it to a local `db.json` when configuring a compatible mock backend. Some source/configuration files may also be held; consult `PREPARATION_MANIFEST.json`. The migration did not change application logic.

## Running after held files are resolved

```sh
npm run android
npm start
```

The start script uses `expo start --dev-client`; it expects a development client. The inspected API service points to port 3001 at `10.0.2.2` for Android and `localhost` for other platforms. Student and history requests expect `/students` and `/history`. The package does not declare a complete server setup; provision a compatible backend with synthetic records before testing. Do not use the excluded student database as a demo fixture.

## Status and limitations

Work in progress. Migration validation successfully installed locked dependencies and exported an Android JavaScript/Hermes bundle using Expo. The review copy adds the missing `@react-navigation/stack` dependency at major version 6 and corrects the StudentList import filename case; application logic was otherwise preserved. Native APK compilation, device execution, backend integration and login behavior remain unverified. Login uses hardcoded demonstration accounts and client-side matching; it is not production authentication. Never replace those demonstration values with real credentials in committed source. `dom` was selected provisionally because it contains more screens and services than `Dorm` and `dormproject`; file count does not establish correctness. The owner has confirmed rights to the work. Other variants remain untouched.

## Screenshots, contributions and license

No verified demo screenshots are supplied. The owner confirmed rights to their work; individual/group roles have not been detailed. No new license is assigned.
