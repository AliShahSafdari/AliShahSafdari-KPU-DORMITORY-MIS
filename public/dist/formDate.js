const moment = require('moment');

exports.formDate = (date) => {

    let d = date

    let dt = moment(d).format('YYYY-M-DD')
    let arr = dt.split("-")

    switch (arr[1]) {
        case '1':
            arr[1] = "محرم";
            break;
        case '2':
            arr[1] = "صفر";
            break;
        case '3':
            arr[1] = "ربیع الاول";
            break;
        case '4':
            arr[1] = "ربیع الثانی";
            break;
        case '5':
            arr[1] = "جمادی الاولی";
            break;
        case '6':
            arr[1] = "جمادی الثانیه";
            break;
        case '7':
            arr[1] = "رجب";
            break;
        case '8':
            arr[1] = "شعبان";
            break;
        case '9':
            arr[1] = "رمضان";
            break;
        case '10':
            arr[1] = "شوال";
            break;
        case '11':
            arr[1] = "ذی القعده";
            break;
        case '12':
            arr[1] = "ذی الحجه";
            break;
    }

    dt = arr.join("/")

    return dt

}