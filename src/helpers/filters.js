export const sortFunc = (arrToSort, sortBy) => {
    let sorted;

    switch (sortBy) {
        case 'date':
            sorted = [].concat(arrToSort).sort((a, b) => b.date - a.date);
            break;
        case 'orderedItems':
            sorted = [].concat(arrToSort).sort((a, b) => b.orderInfo.products.length - a.orderInfo.products.length);
            break;
        case 'payed':
            sorted = [].concat(arrToSort).sort((a, b) => a.payment?.payed - b.payment?.payed);
            break;
        case 'onlinePayed':
            sorted = [].concat(arrToSort).sort((a, b) => a.payment?.peymentType === 'online' - b.payment?.paymentType);
            break;
        default: 
            sorted = [].concat(arrToSort).sort((a, b) => a.username - b.username);
            break;
    }

    return sorted;
};
