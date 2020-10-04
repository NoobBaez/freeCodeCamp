// Given an array arr, find element pairs whose sum equal the second argument arg and return the sum of their indices.

// You may use multiple pairs that have the same numeric elements but different indices.Each pair should use the lowest possible available indices.Once an element has been used it cannot be reused to pair with another element.For instance, pairwise([1, 1, 2], 3) creates a pair[2, 1] using the 1 at index 0 rather than the 1 at index 1, because 0 + 2 < 1 + 2.

function pairwise(arr, arg) {
    let arrCopy = [...arr];

    const pairs = arr.reduce((result, item1, index1) => {

        //do not continue if the element has been pair
        if (result.includes(index1)) return result;

        //find element so item1 + item2 === arg
        const item2 = arrCopy.find(element => element + item1 === arg);

        if (item2) {
            const index2 = arrCopy.indexOf(item2, index1 + 1);

            if (index2 !== -1) {
                result = [...result, index1, index2];
            }

            //eliminate the item1 from the arrCopy
            const index1ToEliminate = arrCopy.indexOf(item1);
            arrCopy.splice(index1ToEliminate, 1, '');

            //eliminate the item2 from the arrCopy
            const index2ToEliminate = arrCopy.indexOf(item2);
            arrCopy.splice(index2ToEliminate, 1, '');
        };
        return result;
    }, []);

    //sum all the indexes
    return pairs.reduce((total, n) => { return total += n }, 0);
}

pairwise([1, 3, 2, 4], 4);
