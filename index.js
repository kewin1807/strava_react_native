/**
 * @format
 */

// import {AppRegistry} from 'react-native';
import App from './App';
// import {name as appName} from './app.json';
import {buildTheme} from './src/config-theme';
import React from 'react';
import {Navigation} from 'react-native-navigation';
import Route from './src/routes';
import store from './src/store';
import {persistStore} from 'redux-persist';
import Icon from 'react-native-vector-icons/FontAwesome';

//connect redux with component
import {Provider} from 'react-redux';

buildTheme();

// register component with redux
export const registerComponent = (key, ReduxScreen) =>
  Navigation.registerComponent(
    key,
    () => props => (
      <Provider store={store}>
        <ReduxScreen {...props} />
      </Provider>
    ),
    () => ReduxScreen,
  );

for (const screen in Route) {
  registerComponent(screen, Route[screen]);
}

export const startSingleScreen = () => {
  Navigation.setRoot({
    root: {
      stack: {
        id: 'login',
        children: [
          {
            component: {
              name: 'webViewLogin',
            },
            options: {
              topBar: {
                visible: false,
              },
              animations: {
                push: {
                  waitForRender: true,
                },
              },
            },
          },
        ],
      },
    },
    appStyle: {
      hideBackButtonTitle: true,
      orientation: 'portrait',
    },
  });
};

export const startLoginScreen = code => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'login',
        passProps: {code: code},
      },
    },
    appStyle: {
      hideBackButtonTitle: true,
      orientation: 'portrait',
    },
  });
};

export const startTabScreen = () => {
  Promise.all([
    Icon.getImageSource('home', 25),
    Icon.getImageSource('user', 25),
  ]).then(([home, user]) => {
    Navigation.setRoot({
      root: {
        bottomTabs: {
          children: [
            {
              stack: {
                children: [
                  {
                    component: {
                      name: 'tabRecord',
                    },
                  },
                ],
                options: {
                  topBar: {
                    visible: false,
                  },
                  bottomTab: {
                    iconColor: 'orange',
                    text: 'Record',
                    icon: home,
                    testID: 'FIRST_TAB_BAR_BUTTON',
                  },
                },
              },
            },
            {
              component: {
                name: 'tabProfile',
                options: {
                  bottomTab: {
                    text: 'profile',
                    icon: user,
                    testID: 'SECOND_TAB_BAR_BUTTON',
                  },
                },
              },
            },
          ],
        },
      },
    });
  });
};
const launchApp = store => {
  if (
    store &&
    store.getState &&
    typeof store.getState === 'function' &&
    store.getState().auth.code
  ) {
    startLoginScreen();
  } else {
    startSingleScreen();
  }
};

export const persist = store =>
  new Promise(resolve => {
    persistStore(store, undefined, resolve);
  });
// startSingleScreen();

Navigation.events().registerAppLaunchedListener(async () => {
  // await Promise.all([persist(store)]);
  launchApp(store);
});
console.ignoredYellowBox = ['Warning:'];
