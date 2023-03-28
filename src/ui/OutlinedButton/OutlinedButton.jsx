import { Button } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './OutlinedButton.module.css';

const OutlinedButton = ({navigateNow, text}) => {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate(navigateNow)} variant="outlined" className={styles.button}>{text}</Button>
  )
}

export default OutlinedButton;