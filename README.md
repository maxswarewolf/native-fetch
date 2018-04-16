
# native-fetch (WIP)
## Note

I am currently designing the functionality and initial interfacing. The current code has all being testing different approaches to achieve my goal of a native solution to fetch for react native. 
## Getting started

`$ npm install native-fetch --save`

### Mostly automatic installation

`$ react-native link native-fetch`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `native-fetch` and add `RNNativeFetch.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNNativeFetch.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNNativeFetchPackage;` to the imports at the top of the file
  - Add `new RNNativeFetchPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':native-fetch'
  	project(':native-fetch').projectDir = new File(rootProject.projectDir, 	'../node_modules/native-fetch/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':native-fetch')
  	```

## Usage (WIP)
```javascript
import fetch from 'native-fetch';

// TODO: What to do with the module?
fetch;
```
  
