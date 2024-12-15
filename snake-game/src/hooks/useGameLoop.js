import { useEffect, useRef } from 'react';

const INITIAL_SPEED = 200;
const MAX_SPEED = 70;
const SPEED_INCREMENT = 5;

const useGameLoop = ({ gameStatus, score, snake, direction, onMove, onGameOver }) => {
  const speedRef = useRef(INITIAL_SPEED);

  useEffect(() => {
    const speedIncrease = Math.floor(score / 10) * SPEED_INCREMENT;
    speedRef.current = Math.max(INITIAL_SPEED - speedIncrease, MAX_SPEED);
  }, [score]);

  useEffect(() => {
    let gameLoop;

    if (gameStatus === 'playing') {
      gameLoop = setInterval(() => {
        const head = snake[0];
        let newHead;

        switch (direction) {
          case 'UP':
            newHead = { x: head.x, y: head.y - 1 };
            break;
          case 'DOWN':
            newHead = { x: head.x, y: head.y + 1 };
            break;
          case 'LEFT':
            newHead = { x: head.x - 1, y: head.y };
            break;
          case 'RIGHT':
            newHead = { x: head.x + 1, y: head.y };
            break;
        }

        if (newHead.x >= 20) newHead.x = 0;
        if (newHead.x < 0) newHead.x = 19;
        if (newHead.y >= 20) newHead.y = 0;
        if (newHead.y < 0) newHead.y = 19;

        const selfCollision = snake.some(
          segment => segment.x === newHead.x && segment.y === newHead.y
        );

        if (selfCollision) {
          onGameOver();
          return;
        }

        onMove(newHead);
      }, speedRef.current);
    }

    return () => {
      if (gameLoop) {
        clearInterval(gameLoop);
      }
    };
  }, [gameStatus, snake, direction, onMove, onGameOver]);
};

export default useGameLoop; 