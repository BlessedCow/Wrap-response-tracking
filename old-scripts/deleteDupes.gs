function removeDuplicates() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var column = 1; // Column A
  
  // Get all values in the specified column
  var data = sheet.getRange(1, column, sheet.getLastRow(), 1).getValues();
  
  // Create an object to store unique values
  var uniqueValues = {};
  
  // Loop through the data and mark duplicates
  for (var i = 0; i < data.length; i++) {
    var value = data[i][0];
    if (uniqueValues[value]) {
      // Duplicate found, mark for deletion
      sheet.getRange(i + 1, column).setValue("");
    } else {
      // Not a duplicate, mark as seen
      uniqueValues[value] = true;
    }
  }
}
