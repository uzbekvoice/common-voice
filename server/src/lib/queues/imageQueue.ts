import * as Queue from 'bull';
import { getConfig } from '../../config-helper';
import imageProcessor from './processes/imageProcessor'; // producer
import { URL } from 'url';
import { RedisOptions } from 'ioredis';

export const getRedisConfig = (): RedisOptions => {
  const { REDIS_URL } = getConfig();
  const parsedURL = new URL(REDIS_URL);
  return {
    host: parsedURL.hostname || 'localhost',
    port: Number(parsedURL.port || 6379),
    db: Number.parseInt((parsedURL.pathname || '/0').substr(1) || '0'),
    password: parsedURL.password
      ? decodeURIComponent(parsedURL.password)
      : null,
  };
};

const NotificationQueue = new Queue('Notification', {
  redis: getRedisConfig(),
}); // consumer
NotificationQueue.process(imageProcessor);
NotificationQueue.on('completed', (job, result) => {
  if (result) {
    console.log(`Success: Job ${job.id}`);
  } else {
    console.log(`Fail: Job ${job.id}`);
  }
});

export const uploadImage = async (data: {
  client_id: string;
  rawImageData: string;
  user: Express.User;
  key: string;
  imageBucket: string;
  s3?: any;
  bucket?: any;
}) => {
  return await NotificationQueue.add(data);
};

export default NotificationQueue;
