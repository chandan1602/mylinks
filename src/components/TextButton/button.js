import React from 'react';
import {Link} from 'react-router-dom';
import styles from './../stylingModules/textButton.module.css'

const TextButton = (props) => {
    return(
    <div className={styles.main}>
            <Link to={props.path} className={styles.text}>
            <p>{props.Name}</p>
        </Link>
    </div>
    )
}

export default TextButton