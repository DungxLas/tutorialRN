/**
 * @format
 */

import { AppRegistry } from 'react-native';
//import App from './App';
//import BasicFlatList from './components/BasicFlatList';
import HorizontalFlatList from './components/HorizontalFlatList';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => HorizontalFlatList);
