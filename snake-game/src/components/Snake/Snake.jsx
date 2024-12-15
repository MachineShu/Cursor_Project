import React from 'react';
import styles from './Snake.module.css';

const Snake = ({ snake }) => {
  return (
    <div>
      {snake.map((segment, index) => (
        <div
          key={index}
          className={styles.snakeSegment}
          style={{
            left: `${segment.x * 20}px`,
            top: `${segment.y * 20}px`,
          }}
        />
      ))}
    </div>
  );
};

export default Snake; 