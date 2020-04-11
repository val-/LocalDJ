export const hasInList = (list, item) => {
    let i;
    if (list && item !== undefined) {
        for (i = 0; i < list.length; i++) {
            if (list[i] === item) {
                return true;
            }
        }
    }
    return false;
}

export const removeFromList = (list, removedItem) => (
    list.filter((item) => item !== removedItem)
);