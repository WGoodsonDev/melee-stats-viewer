import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Layout from "./UIStructure/Layout/Layout";
import LandingPage from "./UIStructure/LandingPage/LandingPage";

import './App.css';
import useWindowDimensions from "./Hooks/useWindowDimensions";

const App = (props) => {

    const { height, width } = useWindowDimensions();

    return (
        <BrowserRouter>
            <div className={"App"}>
                <Route path={"/"} exact component={LandingPage}/>
                <Route path={"/motion_tracker"} exact component={Layout}/>

            </div>
        </BrowserRouter>

    );

}

export default App;