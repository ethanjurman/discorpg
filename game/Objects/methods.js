const objectsMap = {};

export const createUniqueId = () => {
  const newId = (new Date().getTime() * (1 + Math.random())).toString(36);
  if (newId in objectsMap) {
    return createUniqueId();
  }
  objectsMap[newId] = null;
  return newId;
};

export const getId = (object) => {
  return object.id;
};

export const setObjectToId = (id, object) => {
  objectsMap[id] = object;
};

export const getObject = (id) => {
  return objectsMap[id];
};
