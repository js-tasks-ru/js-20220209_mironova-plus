/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {

  let tempArray = [];
  const originArray = Object.entries(obj);
  let array = originArray.slice();

  function checkExist(val, array) {
    let tempArray = [];
    let index = 0;

    for(let i = 0; i < array.length; i++){
      if(array[i][0] !== val[1]) {
        tempArray[index] = array[i];
        index++;
      }
    }
    return (tempArray.length !== array.length) ? tempArray : array; 
  }

  for (let val of Object.entries(fields)) {
    array = checkExist(val, array);
  }
  
  return (array.length !== originArray.length) ? Object.fromEntries(array) : obj;
};
