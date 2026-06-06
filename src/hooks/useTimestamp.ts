import { useState, useEffect } from 'react';

export function useTimestamp() {
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    function update() {
      const now = new Date();
      const timeStr = now.toISOString().split('T')[1].split('.')[0] + ' UTC';
      setTimestamp(timeStr);
    }
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return timestamp;
}
