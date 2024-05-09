const kue = require('kue');

const queue = kue.createQueue({
  redis: {
    port: 6379,
    host: '127.0.0.1',
  },
});

function sendNotification(phoneNumber, message) {
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}

queue.process('push_notification', (job, done) => {
  const { phoneNumber, message } = job.data;
  try {
    sendNotification(phoneNumber, message);
    done();
  } catch (error) {
    console.error('Error sending notification:', error.message);
    done(error);
  }
});
