import React from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import styles from './PasswordVisibilityOn.module.css';

const PasswordVisibilityOn = ({setIsShow, isShow}) => {
  return (
    <VisibilityIcon onClick={()=>setIsShow(!isShow)} className={styles.icon}/>
  )
}

export default PasswordVisibilityOn;