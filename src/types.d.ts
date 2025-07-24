declare module '*.png' {
  const value: import('react-native').ImageSourcePropType;
  export default value;
}

declare module '*.jpg' {
  const value: import('react-native').ImageSourcePropType;
  export default value;
}

declare module '*.ttf' {
  const value: { uri: string }; // or specify the appropriate type for font files
  export default value;
}
