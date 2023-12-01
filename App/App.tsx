import React from 'react';
import {RootStack} from './navigation/Stack';
import {initStore} from './store/Init';

function App(): JSX.Element {
  initStore();
  return <RootStack />;
}

export default App;
