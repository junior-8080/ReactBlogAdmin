import moment from 'moment';


export const numberWithCommas = (num) => {
    return num
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const aboutExpireFormat = (date) => {
    const date1 = new Date(date);
    const date2 = new Date();
    const msDay = 60 * 60 * 24 * 1000;
    const diff = Math.floor((date2 - date1) / msDay);
    const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ]
    if (diff === 0) {
        return 'Today'
    }
    if (diff === 1) {
        return 'Tomorrow'
    }
    return `${days[date1.getUTCDay()]} ${moment(date).format('MMM DD, YYYY')}`

}

export const expired = (date) => {
    const date1 = new Date(date);
    const date2 = new Date();
    const msDay = 60 * 60 * 24 * 1000;
    const diff = Math.floor((date2 - date1) / msDay);
    const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ]
    if (diff <= 7) {
        if (diff === 1) {
            return 'Yesterday'
        }
        return `${days[date1.getUTCDay()]} ${moment(date).format('MMM DD, YYYY')}`;
    }
    return `${moment(date).format('MMM DD, YYYY')}`;

}

export const addZeroes = (num, curren) => {
    // const array = ['$','£','₵']; let currency = '';
    const dec = num.split('.')[1]
    const len = dec && dec.length > 2
        ? dec.length
        : 2
    let number = Number(num).toFixed(len);
    if (curren === 'cedis') 
        return  number + ' (₵) ' ;
    if (curren === 'usd') 
        return  number + ' ($)';
    if (curren === 'pounds') 
        return number + ' (£)' ;

 }

export const defaultDate = (date) => {
    return moment(date).format('MMM DD, YYYY');
    
}