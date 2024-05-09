const kue = require('kue');
const { createPushNotificationsJobs } = require('./8-job'); // Assuming 8-job.js is in the same directory

describe('createPushNotificationsJobs function', () => {
  let queue;

  beforeEach(() => {
    // Create a queue in test mode
    queue = kue.createQueue({ redis: { port: 6379, host: '127.0.0.1' } });
    queue.testMode.enter();
  });

  afterEach(() => {
    // Clear the queue and exit test mode after each test
    return new Promise((resolve) => {
      queue.testMode.clear((err) => {
        if (err) console.error('Error clearing test queue:', err.message);
        queue.testMode.exit();
        resolve();
      });
    });
  });

  it('throws an error if jobs is not an array', () => {
    expect(() => createPushNotificationsJobs('not an array', queue)).toThrowError('Jobs is not an array');
  });

  it('creates jobs in the queue for each job in the array', async () => {
    const jobs = [
      { phoneNumber: '1234567890', message: 'Test message 1' },
      { phoneNumber: '9876543210', message: 'Test message 2' },
    ];

    await createPushNotificationsJobs(jobs, queue);

    const count = await queue.testMode.getActiveCount();
    expect(count).toBe(jobs.length);
  });
});
