import redis from 'redis';

const client = redis.createClient();

client.on('connect', () => {
    console.log('Redis client connected to the server');
});

client.on('error', (err) => {
    console.log(`Redis client not connected to the server: ${err.message}`);
});

async function setNewSchool(setNewSchool, value) {
    try {
        await client.set(setNewSchool, value);
    } catch (err) {
        console.error(`Error setting ${schoolName}: ${err.message}`);
    }
}

async function displaySchoolValue(schoolName) {
    try {
        await client.get(schoolName);
    } catch (err) {
        console.error(`Error retrieving value from ${schoolName}: ${err.message}`);
    }
}
