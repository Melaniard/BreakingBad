import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Landing.module.css'

export default function LandingPage() {
    return (
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <h1 className={styles.title}>Welcome to the <br /> BREAKING BAD App</h1>
                <h3 className={styles.text}>
                    Are you sure you want to continue? <br /> OK!
                </h3>
                <Link to='/home'>
                    <button className={styles.btn}>Let's go, Baby!</button>
                </Link>
                <p className={styles.footer}>A project by Melania Dabrowski</p>
            </div>
        </div>
    )
};