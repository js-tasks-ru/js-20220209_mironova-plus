/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
    let array = [];
    
    for (let iVal of Object.entries(fields)){

        for(let jVal of Object.entries(obj)){

            if(jVal[0] === iVal[1]){
                array.push(jVal);
            }
        }
    }
    return Object.fromEntries(array);
};
