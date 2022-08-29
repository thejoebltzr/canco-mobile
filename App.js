import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StackNavigation from './Src/StackNavigation/index'
import { LogBox } from 'react-native';
import configureStore from './Src/Redux/store'
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'



const Stack = createStackNavigator();
const { store, persistor } = configureStore();

function App() {
  LogBox.ignoreAllLogs()
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <NavigationContainer >
     <StackNavigation />
     {/* <BottomTabNavigation /> */}
     <Toast position="bottom" ref={(ref) => Toast.setRef(ref)} />

    </NavigationContainer>
    </PersistGate>
    </Provider>
  );
}
export default App;