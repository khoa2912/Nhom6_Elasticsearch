import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import IndexPage from "./pages/Index/IndexPage";
import CreateIndexPage from "./pages/Index/CreateIndexPage";
import EditIndexPage from "./pages/Index/EditIndex";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Layout from "./components/Layout";
import { useEffect } from "react";
import PrivateRoute from "./components/HOC/PrivateRouter";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "./action/auth";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate]);
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/indexs" element={<IndexPage />} />
          {/* <Route  path="/indexs" exact element={<IndexPage />} /> */}
          <Route path="/create-index" exact element={<CreateIndexPage />} />
          <Route path="/index/:indexId" exact element={<EditIndexPage />} />
          <Route path="/sign-in" exact element={<SignIn />} />
          <Route path="/sign-up" exact element={<SignUp />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
