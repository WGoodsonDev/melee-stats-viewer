/*
    Created by Warren Goodson
*/
import React from 'react';

import EnterButton from './EnterButton/EnterButton';

import styles from './LandingPage.module.css';

const landingPage = (props) => {

    return (
        <div className={styles.LandingPage}>
            <div className={styles.MainText}>
                <h1>Slippi Combo Viewer</h1>
            </div>
            <div>
                <h3>by Warren Goodson</h3>
            </div>
            <div className={styles.Subtitle}>
                <h4>Built using React.js, D3.js, and slippi-parser-js</h4>
            </div>

            <EnterButton/>

            {props.children}
        </div>
    );
}

export default landingPage;