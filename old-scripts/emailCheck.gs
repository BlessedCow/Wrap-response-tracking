function onEdit(e) {
  var sheet = e.range.getSheet();
  
  if (sheet.getName() !== "Sheet1") { // replace "Sheet1" with the name of your sheet
    return; // exit the function if the edit was not made on the correct sheet
  }

  var range = e.range;

  if (range.getColumn() == 11 && range.isChecked()) { //checks if the edited cell is in column K and has been checked
    var row = range.getRow(); //gets the row number of the edited cell
    var timestampCol = 14; //the starting column for the timestamps (i.e. column N)
    var values = sheet.getRange(row, timestampCol, 1, sheet.getLastColumn() - timestampCol + 1).getValues()[0]; //gets all the values in the row from the starting column to the right edge of the sheet
    for (var i = 0; i < values.length; i++) { //iterates through each value in the row
      if (values[i] === "") { //if the current cell is empty
        var timestampCell = sheet.getRange(row, timestampCol + i); //gets the cell in the correct column
        var now = new Date(); //gets current date and time
        timestampCell.setValue(now); //sets the value of the cell to the current date and time
        break; //breaks out of the loop so only one timestamp is added
      }
    }
  }
}
