import { CircularProgress } from '@mui/material'
import React from 'react';
import styles from './CircularLaoding.module.css';

const CircularLoading = ({color}) => {
  return (
    <CircularProgress size={20} className={color === "orange" ? styles.bgWhite : styles.bgOrange}/>
  )
}

export default CircularLoading