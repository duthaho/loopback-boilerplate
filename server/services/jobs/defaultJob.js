/* eslint-disable radix */
import _ from 'lodash';

export default (queue, app) => {
  return (job, done) => {
    const { targetRoutine } = job.data;
    delete job.data.targetRoutine;
    job.data.jobId = parseInt(job.jobId);
    const routine = _.get(app, targetRoutine);
    if (!routine) {
      done('Job targetRoutine missing!');
      return;
    }

    routine(job.data, done);
  };
};
