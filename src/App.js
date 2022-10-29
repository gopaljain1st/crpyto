import { makeStyles } from "@material-ui/core";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coin from "./Pages/Coin";
import Header from "./components/Header";
import Home from "./Pages/Home";
import { Helmet } from "react-helmet";

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Helmet>
          <title>Crypto Tracker</title>
          <meta
            name="description"
            content="Get all the info  regarding your favoourite crypto currency"
          />
        </Helmet>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/coins/:id" element={<Coin />} exact />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
