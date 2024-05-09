const kue = require('kue');
const queue = kue.createQueue();

const jobData = {
  phoneNumber: '1234567890',
  message: 'This is a test message'
};

const job = queue.create('push_notification_code', jobData)
  .save((err) => {
    if (err) {
      console.error('Failed to create notification job', err);
    } else {
      console.log(`Notification job created: ${job.id}`);
    }
  });

job.on('complete', () => {
  console.log('Notification job completed');
});

job.on('failed', (err) => {
  console.log('Notification job failed', err);
});

process.on('SIGTERM', () => {
  queue.shutdown(5000, (err) => {
    console.log('Kue shutdown: ', err || '');
    process.exit(0);
  });
});
