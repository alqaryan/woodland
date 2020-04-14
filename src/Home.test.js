import { Platform } from 'react-native';

it(`Platform.OS works as expected`, () => {
    expect(Platform.OS).toMatchSnapshot();
});
