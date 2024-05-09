const kue = require('kue');

// Replace with your Redis connection details
const queue = kue.createQueue({
  redis: {
    port: 6379, // Redis port (default)
    host: '127.0.0.1', // Redis host (default)
  },
});

const jobs = [
  // Notification data (phone number and message)
  {
    phoneNumber: '4153518780',
    message: 'This is the code 1234 to verify your account',
  },
  // ... other job objects
  {
    phoneNumber: '4154318781',
    message: 'This is the code 4562 to verify your account',
  },
];

queue.on('job created', (id) => {
  console.log(`Notification job created: ${id}`);
});

queue.on('job complete', (id, result) => {
  console.log(`Notification job ${id} completed`);
});

queue.on('job failed', (id, err) => {
  console.error(`Notification job ${id} failed: ${err.message}`);
});

queue.on('job progress', (id, progress) => {
  console.log(`Notification job ${id} ${progress}% complete`);
});

(async () => {
  try {
    for (const job of jobs) {
      const createdJob = await queue.createJob('push_notification_code_2', job).save();
      console.log(`Notification job created: ${createdJob.id}`);
    }
  } catch (error) {
    console.error('Error creating notification jobs:', error.message);
  }
})();
