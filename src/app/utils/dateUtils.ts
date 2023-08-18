

export function getLastDayOfMonth(year: number, month: number){
    const date = new Date(year, month +1, 0);
    console.log(date);
    return date.getDate();
  }