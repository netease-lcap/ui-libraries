export const EventSlotCommandProvider = (_EventSlotCommandMap = {}) => {
  let EventSlotCommandMap = _EventSlotCommandMap;
  if (Array.isArray(_EventSlotCommandMap)) {
    EventSlotCommandMap = _EventSlotCommandMap.reduce(
      (acc, v) => ({ ...acc, [v]: v }),
      {}
    );
  }
  return {
    provide() {
      const execEventSlotCommand = (_methodName, ...args) => {
        const methodName = EventSlotCommandMap[_methodName];
        if (!methodName) return;
        const fn = this[methodName];
        if (fn && typeof fn === 'function') {
          return this[methodName](...args);
        }
      };
      return {
        execEventSlotCommand,
      };
    },
  };
};
