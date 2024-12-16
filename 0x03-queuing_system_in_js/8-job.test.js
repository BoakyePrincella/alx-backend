import kue from 'kue';
import sinon from 'sinon';
import { expect } from 'chai';
import createPushNotificationsJobs from './8-job.js';

describe('createPushNotificationsJobs', () => {
  const bigSpy = sinon.spy(console);
  const queue = kue.createQueue({ name: 'push_notification_code_test' });

  before(() => {
    queue.testMode.enter(true);
  });

  after(() => {
    queue.testMode.clear();
    queue.testMode.exit();
  });

  afterEach(() => {
    bigSpy.log.resetHistory();
  });

  it('Displays an error message', () => {
    expect(
      createPushNotificationsJobs.bind(createPushNotificationsJobs, {}, queue)
    ).to.throw('Jobs is not an array');
  });

  it('Adds jobs to the queue', (done) => {
    expect(queue.testMode.jobs.length).to.equal(0);
    const jobInfos = [
      {
        phoneNumber: '44234677456',
        message: 'Use the code 1224 to verify your account'
      },
      {
        phoneNumber: '98567665890',
        message: 'Use the code 6789 to verify your account'
      }
    ];
    createPushNotificationsJobs(jobInfos, queue);
    expect(queue.testMode.jobs.length).to.equal(2);
    expect(queue.testMode.jobs[0].data).to.deep.equal(jobInfos[0]);
    expect(queue.testMode.jobs[0].type).to.equal('push_notification_code_3');
    queue.process('push_notification_code_3', () => {
      expect(
        bigSpy.log
          .calledWith('Notification job created:', queue.testMode.jobs[0].id)
      ).to.be.true;
      done();
    });
  });

  it('Registers the progress event handler', (done) => {
    queue.testMode.jobs[0].addListener('progress', () => {
      expect(
        bigSpy.log
          .calledWith('Notification job', queue.testMode.jobs[0].id, '25% complete')
      ).to.be.true;
      done();
    });
    queue.testMode.jobs[0].emit('progress', 25);
  });

  it('Registers the failed event handler for a job', (done) => {
    queue.testMode.jobs[0].addListener('failed', () => {
      expect(
        bigSpy.log
          .calledWith('Notification job', queue.testMode.jobs[0].id, 'failed:', 'Failed to send')
      ).to.be.true;
      done();
    });
    queue.testMode.jobs[0].emit('failed', new Error('Failed to send'));
  });

  it('Registers the complete event handler', (done) => {
    queue.testMode.jobs[0].addListener('complete', () => {
      expect(
        bigSpy.log
          .calledWith('Notification job', queue.testMode.jobs[0].id, 'completed')
      ).to.be.true;
      done();
    });
    queue.testMode.jobs[0].emit('complete');
  });
});
