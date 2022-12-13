export const sortList = {
    orderHistory: [
        'date',
        'ordered-items',
        'payed',
        'online-payed',
        'post-office-payed',
        'payed-courier',
    ]
};

export const sortFunc = (arrToSort, sortBy) => {
    let sorted;

    switch (sortBy) {
        case 'date':
            sorted = arrToSort.sort((a, b) => a.date - b.date);
            break;
        case 'ordered-items':
            sorted =[].concat(arrToSort).sort((a, b) => b.orderInfo.products.length - a.orderInfo.products.length);
            break;
        case 'payed':
            sorted = arrToSort.reduce((acc, el) => el.payment?.payed ? [el, ...acc] : [...acc, el], []);
            break;
        case 'online-payed':
            sorted = [
                ...arrToSort.filter(({ payment }) => payment?.paymentType === 'online'),
                ...arrToSort.filter(({ payment }) => payment?.paymentType !== 'online')
            ];
            break;
        case 'post-office-payed':
            sorted = [
                ...arrToSort.filter(({ payment }) => payment?.paymentType === 'onPostOffice'),
                ...arrToSort.filter(({ payment }) => payment?.paymentType !== 'onPostOffice')
            ];
            break;
        case 'payed-courier':
            sorted = [
                ...arrToSort.filter(({ payment }) => payment?.paymentType === 'toCourier'),
                ...arrToSort.filter(({ payment }) => payment?.paymentType !== 'toCourier')
            ];
            break;
        default: 
            sorted = [].concat(arrToSort).sort((a, b) => a.username - b.username);
            break;
    }

    return sorted;
};

export const filterFunc = (arrToFilter, filterBy) => {
    let filtered;

    if (typeof filterBy === 'object') {
        const includesKeys = (objectKey) => {
            return Object.keys(filterBy).includes(objectKey);
        };

        if (includesKeys('username')) {
            filtered = arrToFilter.filter(({ username }) => username === filterBy.username);
        }

        if (includesKeys('productName')) {
            filtered = arrToFilter.map(
                (product) => product.orderInfo.products.filter(
                    ({ name }) => name === filterBy.productName
                )
            );
        }
    }

    if (typeof filterBy === 'string') {
        switch (filterBy) {
            case filterBy.username:
                filtered = arrToFilter.filter((el) => el.username === filterBy.username);
                break;
            case filterBy.productName:
                filtered = arrToFilter.map((el) => el.orderInfo.products.forEach((product) => {
                    if (product.name === filterBy.productName) {
                        return product
                    }
                }));
                break;
            case 'payed': 
                filtered = arrToFilter.filter(({ payment }) => payment?.payed);
                break;
            case 'online':
                filtered = arrToFilter.filter(({ payment }) => payment?.paymnetType === 'online');
                break;
            case 'toPostOffice':
                filtered = arrToFilter.filter(({ payment }) => payment?.paymentType === 'toPostOffice');
                break;
            case 'toCourier':
                filtered = arrToFilter.filter(({ payment }) => payment?.paymentType === 'toCourier');
                break;
            default: 
                filtered = arrToFilter;
                break;
        }
    }

    return filtered;
};
