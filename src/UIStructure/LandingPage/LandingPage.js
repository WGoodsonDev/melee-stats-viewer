/*
    Created by Warren Goodson
*/
import React from 'react';

import styles from './LandingPage.module.css';

const landingPage = (props) => {

    return (
        <div className={styles.LandingPage}>
            <div className={styles.MainText}>
                <h1>Warren Goodson</h1>
                <h1>This is even more text</h1>
                <h1>And this text is about me</h1>
            </div>
            <div className={styles.Subtitle}>
                <h4>Built using React, D3, and slippi-parser-js</h4>
            </div>

            {props.children}
        </div>
    );
}

export default landingPage;