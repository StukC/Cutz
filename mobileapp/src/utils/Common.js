import moment from "moment";

export const getDistinctObjectsByKey = (objects, key) => {
    const uniqueKeys = new Set();
    const distinctObjects = [];

    for (const obj of objects) {
        if (!uniqueKeys.has(obj[key])) {
            uniqueKeys.add(obj[key]);
            distinctObjects.push(obj);
        }
    }

    return distinctObjects;
}

export const getDistinctObjectsByKeyForDates = (objects, key) => {
    const uniqueKeys = new Set();
    const distinctObjects = [];

    for (const obj of objects) {
        if (!uniqueKeys.has(moment(obj[key]).format('DD-MMM-yy'))) {
            uniqueKeys.add(moment(obj[key]).format('DD-MMM-yy'));
            distinctObjects.push(obj);
        }
    }

    return distinctObjects;
}
export const findAllOccurrences = (arr, propertyName, targetValue) => {
    return arr.map((element, index) => (element[propertyName] === targetValue ? index : undefined)).filter(i => i !== undefined);
}
