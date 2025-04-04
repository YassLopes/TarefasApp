import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, useColorScheme } from 'react-native';

export default function Layout() {
    const colorScheme = useColorScheme();

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <StatusBar style="auto" />
            <Stack
                screenOptions={{
                    headerStyle: { backgroundColor: '#f1f1f1' },
                    headerTintColor: '#333',
                }}
            >
                <Stack.Screen
                    name="index"
                    options={{
                        header: () => (
                            <Image
                                source={require('../assets/flowers.jpg')} // ou .png, se preferir
                                style={{
                                    width: '100%',
                                    height: 70, // ajuste conforme o header do seu app
                                    resizeMode: 'cover',
                                }}
                            />
                        ),
                    }}
                />
            </Stack>
        </ThemeProvider>
    );
}
