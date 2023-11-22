import { lazy, Suspense, useState, useCallback, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import Menu from "./components/Menu";
import menu from "./data/menu.json";

import MySvg from "./pages/svg-demo";

import "./App.css";

const address =
  "https://github.com/tomik23/react-leaflet-examples/blob/main/src/pages/";

const ChangeTitle = ({ title }) => {
  const titleName = title.replace(/-/g, " ");
  useEffect(() => {
    document.title = titleName;
  }, [titleName]);

  return <h2 className="title">{titleName}</h2>;
};

const Info = ({ info }) => {
  const { info: infoText } = menu.find((item) => item.link === info);

  return infoText ? (
    <small dangerouslySetInnerHTML={{ __html: infoText }} />
  ) : (
    ""
  );
};

const Child = ({ info, id, text }) => {
  const location = useLocation();

  const LoadComponent = lazy(() =>
    import(
      /* webpackChunkName: "[request]" */ `./pages${location.pathname}.js`
    ).catch(() => import("./components/NotFound.js"))
  );

  const ShowSource = () => (
    <div className="info-container">
      <small>
        <a target="_blank" rel="noreferrer" href={address + id + ".js"}>
          sources
        </a>
      </small>
      <Info info={location.pathname.replace(/\//, "")} />
    </div>
  );

  return (
    <>
      <ChangeTitle title={location.pathname.replace(/\//, " ")} />
      <Suspense fallback={<div>Loading...</div>}>
        <LoadComponent />
      </Suspense>
      <ShowSource />
    </>
  );
};

function App() {
  const [id, setID] = useState("");
  const [info, setInfo] = useState("");
  const [text, setText] = useState("");

  const callback = useCallback((id, text, info) => {
    setID(id);
    setInfo(info);
    setText(text);
  }, []);

  return (
    <Router>
      {/* <div className="grid">
        <Menu parentCallback={callback} />

        <main id="section-example">
          <Routes>
            <Route
              path="/:id"
              element={<Child id={id} info={info} text={text} />}
            />
          </Routes>
        </main>
      </div> */}

      <MySvg />
    </Router>
  );
}

export default App;
