/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
// const exclusionList = require('metro-config/src/defaults/exclusionList');

// // exclusionList is a function that takes an array of regexes and combines
// // them with the default exclusions to return a single regex.

// module.exports = {
//   resolver: {
//     blacklistRE: exclusionList([/dist\/.*/])
//   }
// };