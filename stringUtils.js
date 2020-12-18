// null, undefined or empty string check
function isValidString(inputString) {
  if (inputString && inputString.length)
    return true;
   return false;
}

function formatText(text) {
	var result = text;
	for (var i = 1; i < arguments.length; i += 1) {
		var re = new RegExp('\\{' + (i-1) + '\\}', 'g');
		result = result.replace(re, arguments[i]);
	}
	return result;
}
