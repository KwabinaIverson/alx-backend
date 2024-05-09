const kue = require('kue');

// Replace with your Redis connection details
const queue = kue.createQueue({
  redis: {
    port: 6379, // Redis port (default)
    host: '127.0.0.1', // Redis host (default)
  },
});

const blacklistedNumbers = ['4153518780', '4153518781'];

// Function to send notification (simulated)
function sendNotification(phoneNumber, message, job, done) {
  job.progress(0); // Track progress (0%)

  if (blacklistedNumbers.includes(phoneNumber)) {
    const error = new Error(`Phone number ${phoneNumber} is blacklisted`);
    return done(error); // Fail the job with error
  }

  job.progress(50); // Track progress (50%)
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
  done(); // Mark the job as completed
}

// Process jobs in batches of 2
queue.process('push_notification_code_2', 2, (job, done) => {
  const { phoneNumber, message } = job.data;
  try {
    sendNotification(phoneNumber, message, job, done);
  } catch (error) {
    console.error('Error processing job:', error.message);
    done(error); // Mark the job as failed with error
  }
});
