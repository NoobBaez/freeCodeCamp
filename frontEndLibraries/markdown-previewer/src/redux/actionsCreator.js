//action type
export const EDIT = 'EDIT';

//action createor
export const editEditor = data => {
    return {
        type: EDIT,
        data
    }
}
