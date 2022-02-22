/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */

export function createGetter(path) {

  const pathArray = path.split('.');

  return obj => {
    let result = obj;

    const someFunc = index => {
      if(pathArray.length === index || result === undefined)
        return result;

      result = result[pathArray[index]];

      return someFunc(index+1);
    }
    return someFunc(0);
  }
}

