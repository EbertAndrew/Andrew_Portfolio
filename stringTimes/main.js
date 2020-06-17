// Write a program that takes a string
// and also takes a number ( n ) . It then returns
// your string back to you n number of times.

var favWord
var favNumb
var favWordTimes = []
var numberOfTimes = 1

function stringNumberOfTimes () {
  /**
     * *Grabbing values from the HTML document.
     */

  favWord = document.getElementById('favword').value
  document.getElementById('favwordValue').innerHTML = favWord
  favNumb = document.getElementById('favnumb').value
  document.getElementById('favnumbValue').innerHTML = favNumb

  /**
   * Add standard gaming logic
   * === is strictly equal, the data type and the value must match.
  */
  if (favNumb === null) {
    favNumb = numberOfTimes
  } else {
    favWordTimes = favWord.repeat(favNumb)
  }
  document.getElementById('favwordTimesvalue').innerHTML = favWordTimes
}

function makeAStringSandwich () {
  stringNumberOfTimes()
  console.log()
}

console.log(makeAStringSandwich)
