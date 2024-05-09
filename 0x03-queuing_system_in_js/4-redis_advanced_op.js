import redis from 'redis';

const client = redis.createClient();

client.on('connect', () => {
    console.log('Redis client connected to the server');
});

client.on('error', (err) => {
    console.log(`Redis client not connected to the server: ${err.message}`);
});

function storeHashValues() {
    const hashKey = 'HolbertonSchools';
    client.hSet(hashKey, 'Portland', 50, redis.print);
    client.hSet(hashKey, 'Seattle', 80, redis.print);
    client.hSet(hashKey, 'New York', 20, redis.print);
    client.hSet(hashKey, 'Bogota', 20, redis.print);
    client.hSet(hashKey, 'Cali', 40, redis.print);
    client.hSet(hashKey, 'Paris', 2, redis.print);
}

function displayHash() {
    const hashKey = 'HolbertonSchools';
    client.hGetAll(hashKey, (err, object) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(object);
    });
}

storeHashValues();
setTimeout(displayHash, 500);
setTimeout(() => client.quit(), 1000);
