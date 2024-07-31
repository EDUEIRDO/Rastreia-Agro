import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import Login from './index';
import CadastroItem from './(produtor)/cadastroItem';
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
//SplashScreen.preventAutoHideAsync();

//export default function RootLayout() {
 // const [loaded, error] = useFonts({
//   SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
 //   ...FontAwesome.font,
  //});

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
//  useEffect(() => {
//    if (error) throw error;
//  }, [error]);
//
//  useEffect(() => {
 //   if (loaded) {
   //   SplashScreen.hideAsync();
   // }
  //}, [loaded]);

  //if (!loaded) {
   // return null;
  //}

  //return <Layout />;
//}

function Layout() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='login' screenOptions={{headerShown: true}}>
        <Stack.Screen name='login' component={Login}/>
        <Stack.Screen name='cadastroItem' component={CadastroItem}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
