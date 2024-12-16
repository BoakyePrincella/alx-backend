export default function createPushNotificationsJobs(jobs, queue) {
    if (!Array.isArray(jobs)) {
      throw new Error('Jobs is not an array');
    }
    jobs.forEach((jobInfo, _index) => {
      const job = queue.create('push_notification_code_3', jobInfo);
      job
        .on('enqueue', () => {
          console.log(`Notification job created: ${job.id}`);
        })
        .on('complete', () => {
          console.log(`Notification job ${job.id} completed`);
        })
        .on('failed', (error) => {
          console.log(`Notification job ${job.id} failed: ${error.message || error.toString()}`);
        })
        .on('progress', (progress, _data) => {
          console.log(`Notification job ${job.id} ${progress}% complete`);
        });
      job.save();
    });
  }
  
  // module.exports = createPushNotificationsJobs;
