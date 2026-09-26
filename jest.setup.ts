// Official mocks for native modules that have no implementation under Jest.
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);
jest.mock('react-native-safe-area-context', () => require('react-native-safe-area-context/jest/mock').default);

// Icon fonts load asynchronously and trigger act() warnings; tests only need a placeholder.
jest.mock('@expo/vector-icons/MaterialCommunityIcons', () => {
  const { createElement } = require('react');
  const { Text } = require('react-native');
  const MockIcon = ({ name, ...props }: { name: string }) => createElement(Text, props, name);
  return { __esModule: true, default: MockIcon };
});
