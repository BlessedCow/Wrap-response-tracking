function processColumnGandH() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var range = sheet.getRange("G1:H" + sheet.getLastRow());
  var values = range.getValues();

  for (var i = 0; i < values.length; i++) {
    for (var j = 0; j < values[i].length; j++) {
      var cellValue = values[i][j];
      var regex = /(\d+-\d+)\s/; // Regular expression to match the pattern
      var matchResult = cellValue.match(regex);
      if (matchResult) {
        var newCellValue = matchResult[1]; // Extracting the matched pattern
        values[i][j] = newCellValue; // Updating the cell value
      } else {
        // Handle the case when the pattern is not found, e.g., leave the cell value unchanged
      }
    }
  }

  range.setValues(values); // Setting the updated values back to the range
}

// Afterwards in the next column (Column I), do "=CONCAT(G2, H2)". Copy the function to the end of the data. Copy and paste Column I's values only to column G. Delete the data in Columns H and I.
