import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Footer } from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import Home from "./components/layouts/Home";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <div className="container container-fluid">
          <Switch>
            <Route path="/" component={Home} exact />
          </Switch>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
