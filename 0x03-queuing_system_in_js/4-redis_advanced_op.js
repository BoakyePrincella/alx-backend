
import redis from 'redis';
import { promisify} from 'util';

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

const getAsync = promisify(redisCli.get).bind(redisCli);

async function displaySchoolValue(schoolName) {
    try {
        const value = await getAsync(schoolName);
        console.log(value);
    } catch (error) {
        console.log(error)
    }
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');

