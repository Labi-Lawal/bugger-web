export default function detDate (date:any) {
    date = date.split("T")[0];

    const year = date.split("-")[0],
    month = date.split("-")[1],
    day = date.split("-")[2];

    date = new Date(year, month-1, day).toLocaleDateString('en-us', {
        month: 'short',
        day: 'numeric'
    });

    return date;
}