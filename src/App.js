import React from 'react';

import Layout from "./UIStructure/Layout/Layout";

import './App.css';
import useWindowDimensions from "./Hooks/useWindowDimensions";

const App = (props) => {

    const { height, width } = useWindowDimensions();

    return (
        <div className={"App"}>
            <Layout>
                <p>
                    TEST
                </p>

            </Layout>
        </div>
    );

}

export default App;