function getSortQuery (sortBy, desc) {
    let sort = {}
    const sortValue = desc ? -1 : 1;

    if (sortBy == 'locationId') {
        sort = { [sortBy]: sortValue }
    } else

    if (sortBy == 'status') {
        sort = { useUp: -sortValue, onShoppingList: -sortValue }    
    } else 
    
    if (!sortBy) {
        sort = { name: sortValue }       
    }

    return sort;
}

module.exports = { getSortQuery }