import React from 'react';
import {  createStackNavigator  } from 'react-navigation-stack';

import List from '../screens/List';
import Article from '../screens/Article';

export default createStackNavigator(
    {
        List: List,
        Article: Article,
    },
    {
      initialRouteName: 'List',
    //   defaultNavigationOptions: {
    //     headerStyle: {
    //         borderBottomColor: 'transparent',
    //         marginTop: 24,
    //     }
    //   }
    }
  );
