const getDateClosing = () => {
    const month = [
        'January',
        'February',
        'Martha',
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
    return (value: string)=>{
        const date = new Date(value);
        const mounth = month[date.getMonth()];
        const day:string = date.getDate().toString().padStart(2, '0');

        let dayOfMounth:string;

        if(day.length === 2 && day.slice(0,1) === '1'){
            dayOfMounth = day+"th";
        }else if(day.slice(day.length-1)==="1"){
            dayOfMounth = day+"st"
        }else if(day.slice(day.length-1)==="2"){
            dayOfMounth = day+"nd"
        }else if(day.slice(day.length-1)==="3"){
            dayOfMounth = day+"rd"
        }else {
            dayOfMounth = day+"th"
        }
        const year = date.getFullYear()

        return (`${mounth} ${dayOfMounth}, ${year}`)
    }
}
export const getDate = getDateClosing()