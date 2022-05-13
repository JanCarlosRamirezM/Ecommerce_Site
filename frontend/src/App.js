import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Footer } from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import Home from "./components/layouts/Home";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <div className="App">
          <Header />
          <div className="container container-fluid">
            <Switch>
              <Route path="/" component={Home} exact />
            </Switch>
          </div>
          <Footer />
        </div>
      </Provider>
    </Router>
  );
}

export default App;
