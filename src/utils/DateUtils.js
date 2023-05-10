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

function getQuarterName(month) {
    if (month >= Q1 && month < Q2) {
        return "Q1";
    }
    if (month === Q2 || month < Q3) {
        return "Q2";
    }
    if (month >= Q3 && month < Q4) {
        return "Q3";
    }
    if (month >= Q4 && month < Q1) {
        return "Q4";
    }
    //Used for testing
    return "Unknown"
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

function getQuarters() {
    const index = new Date();
    index.setFullYear(2020);
    index.setMonth(Q4)
    index.setDate(1)
    const date = new Date();
    const quarters = []
    while (index.getFullYear() < date.getFullYear() || index.getMonth() < date.getMonth()) {
        const month = index.getMonth();
        const tempDate = new Date();
        tempDate.setFullYear(index.getFullYear());
        tempDate.setMonth(index.getMonth() + 3);
        tempDate.setDate(1);
        const quarter = {
            name: `${getQuarterName(month)} ${index.getFullYear()}`,
            start: `${dateToDayMonthYearString(index)}`,
            end: `${dateToDayMonthYearString(tempDate)}`,
        }
        quarters.push(quarter);
        index.setMonth(index.getMonth() + 3);
    }
    return quarters;
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
    getQuarters,
    getNowWithoutSeconds,
    getYesterday
}
