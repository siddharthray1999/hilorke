import { Button } from '@mui/material';
import React from 'react'
import styles from './ContainedButton.module.css'

const ContainedButton = ({children, onClick}) => {
  return (
    <Button onClick={onClick} className={styles.button}>{children}</Button>
  )
}

export default ContainedButton;