# LeoVegasUK Native Candidate Task

This is a butchered version of an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

Fire up the app for details of the test task 🦁

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo


## Add the explaination of your changes here 🦁

### Feature Updates

#### feat: reduce number of rendered data
Optimized performance by limiting the amount of data rendered to improving load times and UI responsiveness.

#### feat: adjust styles
Made visual improvements to the application's user interface styles.

#### feat: debounce filtering data on user input
Implemented a debounce mechanism to delay filtering logic during user input, reducing the number of unnecessary operations and improving performance.

#### feat: implement ParallaxFlatList to prevent nesting VirtualizedLists inside plain ScrollView
Replaced nested FlasList inside ScrollView with a ParallaxFlatList component to avoid performance issues and React Native warnings.

### Bug Fixes

#### fix: remove useless state
Cleaned up redundant state to simplify the codebase and improve performance.

#### fix: prevent unnecessary re-renders by stabilizing references of FlatList props
Improved component performance by ensuring stable references for FlatList props, preventing unwanted re-renders.

#### fix: fetch users only once
Fixed a bug that caused repeated fetching of user data. Now the data is fetched just once as intended.

### Chores & Maintenance

#### chore: add use-debounce
Added the use-debounce utility to support debounce functionality to improving input handling performance.

#### chore: fix dependency vulnerabilities with npm audit fix
Addressed security and dependency issues by running npm audit fix to update vulnerable packages.
