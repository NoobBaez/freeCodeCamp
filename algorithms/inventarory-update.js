function updateInventory(arr1, arr2) {
    // All inventory must be accounted for or you're fired!

    //helper function to look for a item
    const lookItem = (arr, item, index) => {
        // item not fund 
        if (index >= arr.length) return null;
        // item found
        if (arr[index][1] === item) return { item: arr[index], index };

        return lookItem(arr, item, index + 1);
    }

    let curInvCopy = [...arr1];

    //iterate in each item in the newInv
    let newInv = arr2.reduce((result, item) => {
        const itemInResult = lookItem(result, item[1], 0);

        if (itemInResult) {
            //if the item was founded sum the value 
            item[0] += itemInResult.item[0];
            result.splice(itemInResult.index, 1, item);
            return result;
        } else {
            return result.concat([item]);
        }

    }, curInvCopy);

    //Returned inventory array should be in alphabetical order by item.
    return newInv.sort((a, b) => {
        a = a[1][0];
        b = b[1][0];

        if (a > b) {
            return 1;
        } else if (a < b) {
            return -1;
        }
        return 0;
    });
}

// Example inventory lists
var curInv = [
    [21, "Bowling Ball"],
    [2, "Dirty Sock"],
    [1, "Hair Pin"],
    [5, "Microphone"]
];

var newInv = [
    [2, "Hair Pin"],
    [3, "Half-Eaten Apple"],
    [67, "Bowling Ball"],
    [7, "Toothpaste"]
];

result = updateInventory(curInv, newInv);