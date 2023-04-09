// res.send(req.body.dates)
let currentDate = new Date();
var arrDates = monenthijri(currentDate.getFullYear() + '-' + currentDate.getMonth() + '-', 'YYYY-M-D').endOf('iMonth').format('iYYYY/iM/iD');
// var arrDates = monenthijri('1436/2/6 16:40', 'iYYYY/iM/iD');
arr14 = arrDates.split('/', 10);
console.log(arr14[1])
console.log("hahdhahahah")

console.log(arr14[2])

res.send(arrDates + "fsdfsdfdsf" + arr14[2]);
arrCurrentDate = arr14[0].split('')
// console.log(arrCurrentDate[])
// res.send(arrCurrentDate)
arrMonth

function convertNumber(fromNum) {
    var result;
    var arabicMap = {
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
    if (result === undefined) {
        result = -1;
    }
    return result;
}

newDateofTime = convertNumber(arrCurrentDate[0]) + '' + convertNumber(arrCurrentDate[1]) + '' + convertNumber(arrCurrentDate[2]) + '' + convertNumber(arrCurrentDate[3])
console.log(newDateofTime)

arrEnterDate = req.body.dates;
var qi = arrEnterDate.split('-')

// console.log(parseInt(arrCurrentDate[0]))
console.log(parseInt(qi[0]))
