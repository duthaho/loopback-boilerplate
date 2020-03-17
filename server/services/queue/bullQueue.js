import Queue from 'bull';

import { loadConfig, createIOClient } from '../../configs/redis/redis-config';
import defaultJob from '../jobs/defaultJob';

const redisConfig = loadConfig();
const priorityQueue = Queue(redisConfig.queueName || 'default', { createClient: createIOClient });
const jobs = {};

export const initQueue = (app, callback) => {
  jobs.defaultJob = defaultJob(priorityQueue, app);

  priorityQueue.on('error', (error) => {
    // Error
    console.error('Queue got error of type %s', error);
  });
  priorityQueue.on('active', (job) => {
    console.log(
      'Job %s active of type %s, %s',
      job.id,
      job.data && job.data._type,
      job.data && job.data.title,
    );
  });
  priorityQueue.on('stalled', (job) => {
    console.log(
      'Job %s stalled of type %s, %s',
      job.id,
      job.data && job.data._type,
      job.data && job.data.title,
    );
  });
  priorityQueue.on('progress', (job, progress) => {
    console.log(
      'Job %s progress of type %s with progess %s',
      job.id,
      job.data && job.data._type,
      progress,
    );
  });
  priorityQueue.on('completed', (job) => {
    console.log(
      'Job %s completed of type %s, %s',
      job.id,
      job.data && job.data._type,
      job.data && job.data.title,
    );
  });
  priorityQueue.on('failed', (job, err) => {
    console.log('Job %s failed of type %s with error %s', job.id, job.data && job.data._type, err);
  });
  priorityQueue.process((job, done) => {
    if (!job.data._type) {
      throw Error('Job _type missing');
    }
    const key = job.data._type;
    if (!jobs[key]) {
      throw Error('Job file missing');
    }

    jobs[key](job, done);
  });

  callback(null, priorityQueue);
};

export default priorityQueue;
