const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];
const [Q1, Q2, Q3, Q4] = [8, 11, 2, 5]

function dateStringToRomanianFormat(dateAsString) {
    return new Date(dateAsString).toLocaleString("ro-RO");
}

function isToday(dateAsString) {
    return new Date(dateAsString).toLocaleDateString("ro-RO") === new Date().toLocaleDateString("ro-RO");
}

function getTodayFormatted() {
    return new Date().toLocaleDateString("ro-RO").replaceAll(".", "-");
}

function dateStringYearMonthFormat(dateAsString) {
    const date = new Date(dateAsString);
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

function dateToDayMonthYearString(date) {
    const yearMonthDay = dateToYearMonthDayString(date)
    return yearMonthDayToDayMonthYear(yearMonthDay);
}

function dateToYearMonthDayString(date) {
    return date.toISOString().split('T')[0]
}

function yearMonthDayToDayMonthYear(date) {
    const [year, month, day] = date.split("-")
    return `${day}-${month}-${year}`
}

function getYears() {
    const years = []
    const currentYear = new Date().getFullYear();
    for (let index = 2020; index <= currentYear; index++) {
        years.push({
            name: `${index}`,
            start: `01-01-${index}`,
            end: `01-01-${index + 1}`,
        })
    }
    return years;
}

function getNowWithoutSeconds() {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 1);
    now.setSeconds(0);
    now.setMilliseconds(0);
    return now;
}
function getYesterday() {
    const yesterday = new Date();
    yesterday.setMonth(0);
    yesterday.setMinutes(yesterday.getMinutes() + 1);
    yesterday.setSeconds(0);
    yesterday.setMilliseconds(0);
    yesterday.setDate(yesterday.getDate() - 1);

    return yesterday;
}

export {
    dateStringToRomanianFormat,
    isToday,
    getTodayFormatted,
    dateStringYearMonthFormat,
    dateToDayMonthYearString,
    dateToYearMonthDayString,
    yearMonthDayToDayMonthYear,
    getYears,
    getNowWithoutSeconds,
    getYesterday
}
