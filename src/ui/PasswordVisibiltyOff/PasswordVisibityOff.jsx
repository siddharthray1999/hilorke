import React from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import styles from './PasswordVisibilityOff.module.css';

const PasswordVisibityOff = ({setIsShow, isShow}) => {
  return (
    <VisibilityOffIcon onClick={()=>setIsShow(!isShow)} className={styles.icon}/>
  )
}

export default PasswordVisibityOff;