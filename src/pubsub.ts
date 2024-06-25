import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PubSub } from 'graphql-subscriptions';
// export const pubsub  = new RedisPubSub({});
export const pubsub = new PubSub();
export const RATE_CHANGED_TOPIC = 'rate_changed'