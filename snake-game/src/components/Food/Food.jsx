import React from 'react';
import styles from './Food.module.css';

const Food = ({ position }) => {
  if (!position) return null;
  
  return (
    <div
      className={styles.food}
      style={{
        left: `${position.x * 20}px`,
        top: `${position.y * 20}px`,
      }}
    />
  );
};

export default Food; 