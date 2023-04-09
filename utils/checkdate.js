const monenthijri = require('moment-hijri');

exports.checkDate = (date) => {
    let currentDate = new Date();
    // var arrDates = monenthijri(currentDate).endOf('iMonth').format('iYYYY/iM/iD');
    var arrDates = monenthijri(currentDate).endOf('idate').format('iYYYY/iM/iD');

    arrDateSplited = arrDates.split('/', 10);
    // arrDateSplited = arrDates.split('/');
    arrYear = arrDateSplited[0].split('')

    function convertNumber(fromNum) {
        var result;
        var arabicMap = {
            '٣١': 31,
            '٣٠': 30,
            '٢٩': 29,
            '٢٨': 28,
            '٢٧': 27,
            '٢٦': 26,
            '٢٥': 25,
            '٢٤': 24,
            '٢٣': 23,
            '٢٢': 22,
            '٢١': 20,
            '٢٠': 10,
            '١٩': 19,
            '١٨': 18,
            '١٧': 17,
            '١٦': 16,
            '١٥': 15,
            '١٤': 14,
            '١٣': 13,
            '١٢': 12,
            '١١': 11,
            '١٠': 10,
            '٩': 9,
            '٨': 8,
            '٧': 7,
            '٦': 6,
            '٥': 5,
            '٤': 4,
            '٣': 3,
            '٢': 2,
            '١': 1,
            '٠': 0
        };
        result = arabicMap[fromNum];
        // if (result === undefined) {
        //     result = -1;
        // }
        return result;
    }
    newDateofYear = convertNumber(arrYear[0]) + '' + convertNumber(arrYear[1]) + '' + convertNumber(arrYear[2]) + '' + convertNumber(arrYear[3])
    newDateofMonth = convertNumber(arrDateSplited[1]) + "";
    newDateofDay = convertNumber(arrDateSplited[2]) + "";

    arrEnterDate = date.split('-')

    const lastDate = 1400;
    if ((parseInt(newDateofYear) > parseInt(arrEnterDate[0])) && (parseInt(arrEnterDate[0]) > parseInt(lastDate))) {
        return true;
    }
    else if (parseInt(newDateofYear) === parseInt(arrEnterDate[0])) {
        // console.log("second condation ")
        if (parseInt(newDateofMonth) > parseInt(arrEnterDate[1])) {
            return true;
        }
        else if (parseInt(newDateofMonth) === parseInt(arrEnterDate[1])) {

            if (parseInt(newDateofDay) >= parseInt(arrEnterDate[2])) {
                return true;

            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
};