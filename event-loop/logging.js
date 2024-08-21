const async_hooks = require("async_hooks");
const fs = require("fs");

const asyncResources = new Map();

exports.createLogger = function ({ exclude = [] }) {
  const hook = async_hooks.createHook({
    init(asyncId, type, triggerAsyncId, resource) {
      if (exclude.includes(type)) {
        return;
      }
      asyncResources.set(asyncId, { type, triggerAsyncId });
      fs.writeSync(1, `Init: ${type}(${asyncId})\n`);
    },
    before(asyncId) {
      //   fs.writeSync(1, `Before: ${asyncId}\n`);
    },
    after(asyncId) {
      //   fs.writeSync(1, `After: ${asyncId}\n`);
    },
    destroy(asyncId) {
      asyncResources.delete(asyncId);
      //   fs.writeSync(1, `Destroy: ${asyncId}\n`);
    },
  });

  hook.enable();
};

exports.asyncResources = asyncResources;

exports.labeledInterval = function labeledInterval(callback, delay, label) {
  const asyncId = async_hooks.executionAsyncId();
  console.log("asyncId interval", asyncId);
  asyncResources.set(asyncId, {
    type: "Timeout",
    triggerAsyncId: asyncId,
    label,
  });

  return setInterval(() => {
    callback();
  }, delay);
};

exports.labeledTimeout = function labeledTimeout(callback, delay, label) {
  const asyncId = async_hooks.executionAsyncId();
  console.log("asyncId timeout", asyncId);
  asyncResources.set(asyncId, {
    type: "Timeout",
    triggerAsyncId: asyncId,
    label,
  });

  return setTimeout(() => {
    callback();
  }, delay);
};
