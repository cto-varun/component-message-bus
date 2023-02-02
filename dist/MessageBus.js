"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _rxjs = require("rxjs");
var _operators = require("rxjs/operators");
const globalSubject = new _rxjs.Subject();
const subscriptions = {};
const MessageBus = {
  send: (subject, data) => {
    globalSubject.next({
      topic: subject,
      data
    });
  },
  request: function (requestSub, data) {
    let ReplySubject = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _rxjs.AsyncSubject;
    const replySubject = new ReplySubject();
    MessageBus.send(requestSub, {
      ...data,
      replySub: replySubject
    });
    return replySubject;
  },
  subscribe: (subscriptionId, topic, listener, closure, customData) => {
    if (subscriptions[subscriptionId] === undefined) {
      let subscription;
      if (topic.includes('*')) {
        subscription = globalSubject.pipe((0, _operators.filter)(e => {
          const regex = new RegExp(topic, 'i');
          return e.topic.match(regex);
        })).subscribe(e => listener(subscriptionId, e.topic, e.data, closure, customData));
      } else {
        subscription = globalSubject.pipe((0, _operators.filter)(e => e.topic === topic)).subscribe(e => listener(subscriptionId, e.topic, e.data, closure, customData));
      }
      subscriptions[subscriptionId] = subscription;
    } else {
      console.log('Subscription With id : ' + subscriptionId + ' already exists');
      /*throw Error(
      "Subscription with id : "
      .concat(subscriptionId)
      .concat(" already registered")
      );*/
    }
  },

  unsubscribe: subscriptionId => {
    if (subscriptions[subscriptionId] !== undefined) {
      subscriptions[subscriptionId].unsubscribe();
      delete subscriptions[subscriptionId];
    }
  },
  log: (subscriptionId, topic, e) => {
    console.log('subscriptionId', subscriptionId);
    console.log('topic', topic);
    console.log('data', e);
  }
};
Object.freeze(MessageBus);
var _default = MessageBus;
exports.default = _default;
module.exports = exports.default;