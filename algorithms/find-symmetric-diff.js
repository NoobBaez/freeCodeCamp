function sym(...args) {
    return args.reduce((result, arr) => {

        let newResult = [...result];
        //iterate in each element (number)
        for (let i = 0; i < arr.length; i++) {
            //made a copy of result
            if (!result.includes(arr[i])) {
                if (!newResult.includes(arr[i])) {
                    newResult.push(arr[i]);
                }
            } else {
                //eliminate the element (number)
                const index = newResult.indexOf(arr[i]);
                if (index !== -1) {
                    newResult.splice(index, 1);
                }
            };
        }
        return newResult;
    }, [])
};

const value = sym([1, 1, 2, 5], [2, 2, 3, 5], [3, 4, 5, 5]);
console.log(value);