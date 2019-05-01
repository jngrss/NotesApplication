import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Notes from './Notes';
import * as serviceWorker from './serviceWorker';
import {LocalizeProvider} from "react-localize-redux";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {About} from "./components/About";
import NotesComponent from "./components/NotesComponent";

const App = props => (
    <LocalizeProvider>
        <Router>
            <Route path="/" component={Notes} />
            <Route name="about" path="/about" component={About}/>
            <Route name="notes" path="/notes" component={NotesComponent}/>
        </Router>
    </LocalizeProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
