import { useEffect } from 'react';

const useKeyPress = ({ onKeyPress, gameStatus }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case ' ':
          if (gameStatus === 'initial' || gameStatus === 'paused') {
            onKeyPress('START');
          }
          break;
        case 'Escape':
          if (gameStatus === 'playing') {
            onKeyPress('PAUSE');
          }
          break;
        case 'Enter':
          if (gameStatus === 'gameover') {
            onKeyPress('RESTART');
          }
          break;
        case 'ArrowUp':
        case 'w':
        case 'W':
          onKeyPress('UP');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          onKeyPress('DOWN');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          onKeyPress('LEFT');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          onKeyPress('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onKeyPress, gameStatus]);
}; 