import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";

import HomePage from "./components/pages/HomePage.jsx";
import LoginPage from "./components/pages/LoginPage.jsx";
import DashboardPage from "./components/pages/DashboardPage.jsx";
import SignupPage from "./components/pages/SignupPage.jsx";
import MovieInfoPage from "./components/pages/MovieInfoPage.jsx";
import BookingsPage from "./components/pages/BookingsPage.jsx";

import UserRoute from "./components/routes/UserRoute.jsx";
import GuestRoute from "./components/routes/GuestRoute.jsx";
import Search from "./components/Search.jsx";

import store from "./redux/store.js";
import userLoggedIn from "./redux/actions/userLoggedIn";

if (localStorage.userJWToken) {
    const user = {
        token: localStorage.userJWToken
    };
    store.dispatch(userLoggedIn(user));
}

const App = ({ location }) => (
    <div>
        <div className="ui container">
            <div>
                <Search />
            </div>
            <Route location={location} path="/" exact component={HomePage} />
            <Route
                location={location}
                path="/:movie/info"
                component={MovieInfoPage}
            />
            <Route
                location={location}
                path="/:movie/book"
                component={BookingsPage}
            />
            <GuestRoute
                location={location}
                path="/login"
                exact
                component={LoginPage}
            />
            <GuestRoute
                location={location}
                path="/signup"
                exact
                component={SignupPage}
            />
            <UserRoute
                location={location}
                path="/dashboard"
                exact
                component={DashboardPage}
            />
        </div>
    </div>
);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route component={App} />
        </Router>
    </Provider>,
    document.getElementById("app")
);
