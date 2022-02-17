/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */

export function sortStrings(arr, param = 'asc') {

    function compare(a,b) {
        return a.localeCompare(b, ['ru', 'en'], {caseFirst: 'upper'});
    }   

    if (param === 'asc')
        return arr.slice().sort(compare);

    else if (param === 'desc')
        return arr.slice().sort(compare).reverse();
    
    else return 0; 
}
