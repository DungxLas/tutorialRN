/**
 * @format
 */

import { AppRegistry } from 'react-native';
//import App from './App';
//import BasicFlatList from './components/BasicFlatList';
//import HorizontalFlatList from './components/HorizontalFlatList';
import BasicSectionList from './components/BasicSectionList';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => BasicSectionList);
