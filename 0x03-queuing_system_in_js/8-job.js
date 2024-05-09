const kue = require('kue');

function createPushNotificationsJobs(jobs, queue) {
  if (!Array.isArray(jobs)) {
    throw new Error('Jobs is not an array');
  }

  for (const job of jobs) {
    queue.createJob('push_notification_code_3', job)
      .on('complete', (id) => console.log(`Notification job ${id} completed`))
      .on('failed', (err, id) => console.error(`Notification job ${id} failed: ${err.message}`))
      .on('progress', (id, progress) => console.log(`Notification job ${id} ${progress}% complete`))
      .save((err) => {
        if (err) {
          console.error('Error creating job:', err.message);
        } else {
          console.log(`Notification job created: ${job.id}`);
        }
      });
  }
}

module.exports = createPushNotificationsJobs;
