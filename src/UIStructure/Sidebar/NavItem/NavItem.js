/*
    Created by Warren Goodson
*/
import React from 'react';

import styles from './NavItem.module.css';
import {Link} from 'react-router-dom';

const navItem = (props) => {

    return (
        <div className={styles.NavItem}>
            {props.openInNewTab ?
                <a href={props.url} target="_blank" rel="noopener noreferrer">{props.text}</a>
            :  <a href={"/#"}>{props.text}</a>
            }

        </div>
    );
}

export default navItem;