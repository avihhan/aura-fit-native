import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { WebView } from 'react-native-webview';

const WEB_APP_URL = (
  process.env.EXPO_PUBLIC_WEB_APP_URL ?? 'http://localhost:3001'
).trim();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const onRetry = useCallback(() => {
    setError(null);
    setLoading(true);
    setReloadKey((k) => k + 1);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {error ? (
        <View style={styles.centered}>
          <Text style={styles.errorTitle}>Could not load Aura Fit</Text>
          <Text style={styles.errorDetail}>{error}</Text>
          <Text style={styles.hint}>URL: {WEB_APP_URL}</Text>
          <Pressable style={styles.button} onPress={onRetry}>
            <Text style={styles.buttonText}>Retry</Text>
          </Pressable>
        </View>
      ) : (
        <>
          {loading ? (
            <View style={styles.overlay}>
              <ActivityIndicator size="large" color="#1a1a2e" />
              <Text style={styles.loadingText}>Loading…</Text>
            </View>
          ) : null}
          <WebView
            key={reloadKey}
            source={{ uri: WEB_APP_URL }}
            style={styles.webview}
            javaScriptEnabled
            domStorageEnabled
            mixedContentMode="compatibility"
            allowsInlineMediaPlayback
            onLoadStart={() => {
              setLoading(true);
              setError(null);
            }}
            onLoadEnd={() => setLoading(false)}
            onError={(e) => {
              setLoading(false);
              setError(
                e.nativeEvent.description ||
                  'Network error. Is the mobile web app running?'
              );
            }}
            onHttpError={(e) => {
              if (e.nativeEvent.statusCode >= 400) {
                setLoading(false);
                setError(`HTTP ${e.nativeEvent.statusCode}`);
              }
            }}
            originWhitelist={['http://*', 'https://*']}
            allowsBackForwardNavigationGestures
            setSupportMultipleWindows={false}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    zIndex: 1,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#444',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorDetail: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  hint: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
