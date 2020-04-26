module.exports = {
  presets: ['module:metro-react-native-babel-preset', '@babel/flow'],
  plugins: [['@babel/plugin-proposal-decorators', {legacy: true}]],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
};
