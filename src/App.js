import { Route, Switch } from 'react-router-dom';
import { GlobalStateProvider } from './state/GlobalStateProvider';

import { CurrencyGrid, CurrencyPage } from './containers';
import { Header } from './components';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <GlobalStateProvider>
          <Route path="/:id">
            <CurrencyPage />
          </Route>
          <Route exact path="/">
            <CurrencyGrid />
          </Route>
        </GlobalStateProvider>
      </Switch>
    </div>
  );
}

export default App;
