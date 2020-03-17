import queue from './queue/bullQueue';
import {
  DEFAULT_QUEUE_PRIORITY,
  DEFAULT_QUEUE_ATTEMPTS,
  DEFAULT_QUEUE_TASK_BACKOFF,
} from '../configs/constants/serverConstants';
import TASK_DEFINITIONS from './TaskDefinitions';

const _getTask = (taskName, parameters) => {
  const taskOptions = TASK_DEFINITIONS[taskName](parameters);
  if (taskOptions) {
    return { taskName, ...taskOptions };
  }
  return null;
};

const _addDefaultTaskToQueue = (parameters, taskDefinition, done = () => {}) => {
  const { title, targetRoutine, taskName, removeOnComplete = true } = taskDefinition;
  queue
    .add(
      {
        _type: 'defaultJob',
        title: title || targetRoutine, // overwritten if title in parameters
        taskName,
        targetRoutine,
        ...parameters,
      },
      {
        priority: taskDefinition.priority || DEFAULT_QUEUE_PRIORITY,
        attempts: taskDefinition.attempts || DEFAULT_QUEUE_ATTEMPTS,
        backoff: taskDefinition.backoff || DEFAULT_QUEUE_TASK_BACKOFF,
        removeOnComplete,
      },
    )
    .then((job) => {
      done(null, job);
    })
    .catch((err) => {
      done(err);
    });
};

const CreateTask = (taskName, parameters, done = () => {}) => {
  const taskDefinition = _getTask(taskName, parameters);
  if (!taskDefinition) {
    done(`Task is not defined ${taskName}`);
    return;
  }
  if (!taskDefinition.task) {
    _addDefaultTaskToQueue(parameters, taskDefinition, done);
  } else {
    taskDefinition.task(parameters, taskDefinition, done);
  }
};

export { CreateTask };
