/* Date related utility functions */

//get Weekdays as an array
function getWeekDays() {
	return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
}

//Get week number
Date.prototype.getWeek = function() {
    var dayOne = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this - dayOne) / 86400000) + dayOne.getDay() + 1) / 7);
    //return $.datepicker.iso8601Week(this); //alternative way by using datepicker
}
