const usedIds = {};

export const createUniqueId = () => {
  const newId = (new Date().getTime() * (1 + Math.random())).toString(36);
  if (newId in usedIds) {
    return createUniqueId();
  }
  return newId;
};
