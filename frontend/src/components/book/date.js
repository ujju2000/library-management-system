

export function issueDate() {
    const date = new Date();
    const newDate = date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear();
    console.log(newDate);
    return newDate;
}

export function returnDate() {
    const date = new Date();
    const newDate = date.getDate() + 7;

    date.setDate(newDate);
    const returnDate = date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear();
     
    return returnDate;
}