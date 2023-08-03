
interface Date{

    /** Returns the name of the day, using local time */
    toDayName(): string;
}

const dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

Date.prototype.toDayName = function(){
    this.toISOString();
    return dayArray[this.getDay()];
}