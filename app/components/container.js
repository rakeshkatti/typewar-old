import React, {Component} from "react";
import ReactDOM from "react-dom";
import Login from "./Login";
import {renderContainer} from "./renderContainer"
import io from "socket.io-client";
import Header from "./Header";
import MainContainer from "./MainContainer";
import Footer from "./Footer";
import Firebase from "firebase";

var socket = io('http://localhost:8000');

export default class Container extends Component {
    componentDidMount() {
        socket.on("receive", function (data) {
            store.dispatch(data.content);
        });
        socket.on("startGame", (data) => {
            if (data.usernames) {
                data.usernames.map((user) => {
                    store.dispatch({type: "ADD_USER", username: user})
                })
            }
        });

        const {store} = this.context;
        if (localStorage.getItem("username") && localStorage.getItem("username") !== "") {
            store.dispatch({type: "ADD_USER", username: localStorage.getItem("username")});
        }

        this.unsubscribe = store.subscribe(() => this.forceUpdate());
        var self = this;
        var fbButton = document.getElementById('googleLogin');
        var ref = new Firebase("https://typewar.firebaseio.com");

        fbButton.addEventListener('click', (e) => {
            ref.authWithOAuthPopup("google", function (error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                    console.log("Authenticated successfully with payload:", authData);
                    self.login(authData);
                    store.dispatch({type: "ADD_USER", username: authData.uid});
                    localStorage.setItem("username", authData.uid);
                    renderContainer();
                }
            }, {
                scope: "email"
            });
        });

        var isNewUser = true;
        ref.onAuth(function (authData) {
            if (authData && isNewUser) {
                // save the user's profile into the database so we can list users,
                // use them in Security and Firebase Rules, and show profiles
                ref.child("users").child(authData.uid).set({
                    provider: authData.provider,
                    name: getName(authData),
                    email: getEmail(authData)
                });
            }
        });
        // find a suitable name based on the meta info given by each provider
        function getName(authData) {
            switch (authData.provider) {
                case 'password':
                    return authData.password.email.replace(/@.*/, '');
                case 'twitter':
                    return authData.twitter.displayName;
                case 'facebook':
                    return authData.facebook.displayName;
                case 'google':
                    return authData.google.displayName;
            }
        }

        function getEmail(authData) {
            switch (authData.provider) {
                case 'password':
                    return authData.password.email;
                case 'twitter':
                    return authData.twitter.email;
                case 'facebook':
                    return authData.facebook.email;
                case 'google':
                    return authData.google.email;
            }
        }

        var logoutBtn = document.getElementById('logout');
        logoutBtn.addEventListener('click', (e) => {
            self.logout();
        });
    }

    logout() {
        let request = new XMLHttpRequest();
        request.open('POST', 'http://localhost:8000/logout');
        request.setRequestHeader('Content-Type', 'application/json');
        request.send();
        request.onreadystatechange = () => {
            try {
                var response = JSON.parse(request.response);
            } catch (e) {
                console.log("Error parsing JSON");
            }
            if (request.readyState == XMLHttpRequest.DONE) {
                localStorage.removeItem("username");
                renderContainer();
                console.log(response);
            }
        };
    }

    login(authData) {
        let request = new XMLHttpRequest();
        let data = {
            username: authData.uid
        };
        request.open('POST', 'http://localhost:8000/login');
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify(data));
        request.onreadystatechange = () => {
            try {
                var response = JSON.parse(request.response);
            } catch (e) {
                console.log("Error parsing JSON");
            }
            if (request.readyState == XMLHttpRequest.DONE) {
                localStorage.setItem("username", response.username);
                renderContainer();
                console.log(response);
            }
        };
        request.onerror = (error) => {
            console.log(error);
        }
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const {store} = this.context;
        const state = store.getState();
        return (
            <div>
                <Header />
                <button id="googleLogin">google login</button>
                <button id="logout">logout</button>

                <p>Session: {localStorage.getItem("username")}</p>


                <MainContainer />
                <Login />
                <Footer />
            </div>
        );
    }
};

Container.contextTypes = {
    store: React.PropTypes.object
};
