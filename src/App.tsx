import React from 'react';
import './App.css';
import './style.css';
import Header from './components/Header';
import Footer from './components/Footer';
import TypeTestPage from './components/type_test/TypingTest';
import FrontPage from './components/FrontPage';
import SignUpPage from './components/SignUp';
import AboutUsPage from './components/AboutUs';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
    return (
        <Router>
            <div className="App">
                <div id="wrapper">
                    <Header />
                    <Switch>
                        <Route path="/" exact component={FrontPage} />
                        <Route path="/test" component={TypeTestPage} />
                        <Route path="/sign_up" component={SignUpPage} />
                        <Route path="/about_us" component={AboutUsPage} />
                    </Switch>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
