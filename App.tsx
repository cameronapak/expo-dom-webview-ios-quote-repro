import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import QuoteDom from './components/QuoteDom';

// The prop value contains a double quote (a normal CSS font stack).
//   - iOS:     BLANK. Metro logs: "Top OS ($$EXPO_DOM_HOST_OS) is not defined".
//   - Android: renders the text correctly.
// Swap to LABEL_OK (no double quote) and iOS renders fine — isolating the `"`.
const LABEL_BROKEN = '"Source Serif 4", serif';
// const LABEL_OK = 'Source Serif 4, serif';

export default function App() {
  return (
    <View style={styles.container}>
      <QuoteDom label={LABEL_BROKEN} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
