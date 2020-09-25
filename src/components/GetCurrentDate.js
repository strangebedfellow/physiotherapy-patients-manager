export default function GetCurrentDate(date) {
    const monthNames = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    let dateObj = date;
    let month = monthNames[dateObj.getMonth()];
    let day = String(dateObj.getDate()).padStart(2, '0');
    let year = dateObj.getFullYear();
    return year + '.' + month + '.' + day;
}