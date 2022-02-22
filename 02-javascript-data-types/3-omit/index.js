/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
  const objOut = {};

      for (let [key, val] of Object.entries(obj)){
        if(!fields.includes(key)) {
          objOut[key] = val;
        }
      }

      return (Object.keys(objOut).length === Object.keys(obj).length) ? obj : objOut;

};

