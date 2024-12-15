import { useState, useEffect, useCallback } from 'react';
import Snake from '../Snake/Snake';
import Food from '../Food/Food';
import useGameLoop from '../../hooks/useGameLoop';
import styles from './Game.module.css';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];

const generateFood = (snake) => {
  while (true) {
    const position = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };

    const isOnSnake = snake.some(
      segment => segment.x === position.x && segment.y === position.y
    );

    if (!isOnSnake) {
      return position;
    }
  }
};

const Game = () => {
  const [gameStatus, setGameStatus] = useState('initial');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState('UP');
  const [food, setFood] = useState(null);

  const handleMove = useCallback((newHead) => {
    setSnake(prevSnake => {
      const newSnake = [newHead, ...prevSnake];
      
      if (food && newHead.x === food.x && newHead.y === food.y) {
        setScore(prevScore => prevScore + 1);
        setFood(null);
        return newSnake;
      }
      
      newSnake.pop();
      return newSnake;
    });
  }, [food]);

  const handleGameOver = useCallback(() => {
    setGameStatus('gameover');
    setHighScore(prevHighScore => Math.max(prevHighScore, score));
  }, [score]);

  useGameLoop({
    gameStatus,
    score,
    snake,
    direction,
    onMove: handleMove,
    onGameOver: handleGameOver
  });

  useEffect(() => {
    if (!food && gameStatus === 'playing') {
      setFood(generateFood(snake));
    }
  }, [food, snake, gameStatus]);

  const handleKeyPress = useCallback((event) => {
    if (event.key === ' ' && (gameStatus === 'initial' || gameStatus === 'paused')) {
      setGameStatus('playing');
    } else if (event.key === 'Escape' && gameStatus === 'playing') {
      setGameStatus('paused');
    } else if (event.key === 'Enter' && gameStatus === 'gameover') {
      setSnake(INITIAL_SNAKE);
      setDirection('UP');
      setScore(0);
      setFood(null);
      setGameStatus('playing');
    } else if (gameStatus === 'playing') {
      switch (event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
      }
    }
  }, [gameStatus, direction]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return (
    <div className={styles.gameContainer}>
      <div className={styles.gameHeader}>
        <div className={styles.score}>Score: {score}</div>
        <div className={styles.highScore}>High Score: {highScore}</div>
      </div>
      
      <div className={styles.gameBoard}>
        <Snake snake={snake} />
        {food && <Food position={food} />}
      </div>
      
      <div className={styles.gameStatus}>
        {gameStatus === 'initial' && <div>Press SPACE to Start</div>}
        {gameStatus === 'paused' && <div>PAUSED</div>}
        {gameStatus === 'gameover' && <div>Game Over! Press ENTER to Restart</div>}
      </div>
    </div>
  );
};

export default Game; 