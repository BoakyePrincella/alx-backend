// const kue = require('kue');
import kue from 'kue';

const queue = kue.createQueue();

const jobData = {
  phoneNumber: '233243005255',
  message: 'This is the code to verify your account',
};

const job = queue.create('push_notification_code', jobData)
  .save(function (error) {
    if (!error) {
      console.log('Notificaton job created:', job.id);
    }
  });

job.on('complete', function () {
  console.log('Notification job completed');
});

job.on('failed', function () {
  console.log('Notification job failed');
});
