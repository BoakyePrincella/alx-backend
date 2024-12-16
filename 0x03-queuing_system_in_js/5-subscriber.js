
import redis from 'redis';

const redisCli = redis.createClient();

redisCli.on('error', (error) => {
  console.log(`Redis client not connected to the server: ${error}`);
});

redisCli.on('connect', () => {
  console.log('Redis client connected to the server');
});

redisCli.subscribe('holberton school channel');

redisCli.on('message', (channel, message) => {
  if (message === 'KILL_SERVER') {
    redisCli.unsubscribe('holberton school channel', () => {
      redisCli.quit();
    });
  }
  if (channel === 'holberton school channel') {
    console.log(message);
  }
});
