
import redis from 'redis';

const redisCli = redis.createClient();

redisCli.on('error', (error) => {
  console.log(`Redis client not connected to the server: ${error}`);
});

redisCli.on('connect', () => {
  console.log('Redis client connected to the server');
});

function setNewSchool(schoolName, value) {
  redisCli.set(schoolName, value, redis.print);
}

function displaySchoolValue(schoolName) {
  console.log(redisCli.get(schoolName, (error, reply) => {
    if (error) {
      throw (error);
    } else {
      console.log(reply);
    }
  }));
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');

