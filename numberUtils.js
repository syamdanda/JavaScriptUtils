/* Utility functions related to numbers */

function isInt(value) {
  return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
}

function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

//return true if the number is odd
function isOdd(num) {
  return num % 2 != 0;
}

// return true if the number is even
function isEven(num){
  return num % 2 == 0;
}

// return true if the number is even
function isPrime(num){
  if (! num) {
    return false;
  if(num==2) 
    return true;
  for(i=2;i<Math.sqrt(num);i++) {
    if(num % i==0) 
      return false; // otherwise it's a prime no.
  }
  return true;
}
