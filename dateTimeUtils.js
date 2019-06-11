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

//Get next working day (not including Saturday and Sunday)
function getNextWorkingDay(date) {
	var currentDate = date;
	var canRepeat = true;
	while (canRepeat) {
		var nextDay = new Date(currentDate.setDate(currentDate.getDate() + 1));
		if (nextDay.getDay() == 6 || nextDay.getDay() == 0) {
			currentDate.setDate(currentDate.getDate() + 1);
			canRepeat = true;
		} else {
			return nextDay;
		}
	}	
}

//Get business days count (do not add Saturday and Suday)
function getBusinessDatesCount(startDate, endDate) {
    var count = 0;
    var currentDate = startDate
    while (currentDate.getTime() <= endDate.getTime()) {
        var dayOfWeek = currentDate.getDay();
        if(!((dayOfWeek == 6) || (dayOfWeek == 0))) {
           count++;
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return count;
}

// Convert UTC timestamp to preferred date format.
function UTCToDate(utcTime, dateFormat) {
	var date = new Date(utcTime);
	var year = date.getFullYear();
    	var month = ('0' + (date.getMonth() + 1)).slice(-2);
    	var day = date.getDate();
	var formattedDate;
	switch(dateFormat) {
	    case 'MM-DD-YYYY':
	        formattedDate = month + '-' + day + '-' + year;
	        break;
	    case 'DD-MM-YYYY':
	        formattedDate = day + '-' + month + '-' + year;
	        break;
	    case 'YYYY-MM-DD':
	        formattedDate = year + '-' + month + '-' + day;
	        break;
	    case 'MM/DD/YYYY':
	        formattedDate = month + '/' + day + '/' + year;
	        break;
	    case 'DD/MM/YYYY':
	        formattedDate = day + '/' + month + '/' + year;
	        break;
	    case 'YYYY/MM/DD':
	        formattedDate = year + '/' + month + '/' + day;
	        break;
	    default:
	        formattedDate = year + '-' + month + '-' + day;
	}
	return formattedDate;
}

function minutesToTimeFormat(minutes) {
	if (minutes) {
	    var mm = parseInt(minutes % 60);
	    var hh = parseInt((minutes-mm)/60);
	    return hh.toString() + ':' + (mm <10 ? '0' : '') + mm.toString();
	} else {
		return '00:00';
	}
}

function timeFormatToMinutes(time) {
	if (time) {
		var timeArray = time.split(':');
		hoursValue = parseInt(timeArray[0] * 60) + parseInt(timeArray[1]);
		return hoursValue;
	}
	return 0;
}

function getWeekDaysByWeekNum(weekNum, year) {
	if (weekNum && year) {
		var today = new Date(year, 0, 1 + ((weekNum - 1) * 7));
		var currentWeekDates = [];

		var mondayOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 1, 0, 0, 0).getTime();
		var tuesdayOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 2, 0, 0, 0).getTime();
		var wednesayOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 3, 0, 0, 0).getTime();
		var thursdayOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 4, 0, 0, 0).getTime();
		var fridayOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 5, 0, 0, 0).getTime();
		var saturdayOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 6, 0, 0, 0).getTime();
		var sundayOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 7, 0, 0, 0).getTime();
		
		currentWeekDates.push(mondayOfWeek);
		currentWeekDates.push(tuesdayOfWeek);
		currentWeekDates.push(wednesayOfWeek);
		currentWeekDates.push(thursdayOfWeek);
		currentWeekDates.push(fridayOfWeek);
		currentWeekDates.push(saturdayOfWeek);
		currentWeekDates.push(sundayOfWeek);
		
		return currentWeekDates;
	}
}

//get the time difference between two timestamps as -- -- ago
function timeDifference(current, previous) {    
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;
    
    var elapsed = current - previous;
    
    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    } else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    } else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    } else if (elapsed < msPerMonth) {
         return Math.round(elapsed/msPerDay) + ' days ago';   
    } else if (elapsed < msPerYear) {
         return Math.round(elapsed/msPerMonth) + ' months ago';   
    } else {
         return Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}

//is given string a valid date
function isDate(txtDate) {
    var currVal = txtDate;
    if(currVal == '')
        return false;
    
    var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/; //Declare Regex
    var dtArray = rxDatePattern.test(txtDate); // is format OK?
    
    if (! dtArray) 
        return false;
    
    //Checks for mm/dd/yyyy format.
    dtMonth = dtArray[1];
    dtDay= dtArray[3];
    dtYear = dtArray[5];        
    
    if (dtMonth < 1 || dtMonth > 12) 
        return false;
    else if (dtDay < 1 || dtDay> 31) 
        return false;
    else if ((dtMonth==4 || dtMonth==6 || dtMonth==9 || dtMonth==11) && dtDay ==31) 
        return false;
    else if (dtMonth == 2) 
    {
        var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
        if (dtDay> 29 || (dtDay ==29 && !isleap)) 
                return false;
    }
    return true;
}

function addMinutes(timestamp, minutes) {
    return new Date(timestamp + minutes*60000).getTime();
}

function formatText(text) {
	var result = text;
	for (var i = 1; i < arguments.length; i += 1) {
		var re = new RegExp('\\{' + (i-1) + '\\}', 'g');
		result = result.replace(re, arguments[i]);
	}
	return result;
}
