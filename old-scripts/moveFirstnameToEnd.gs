function moveFirstNameToEnd() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var range = sheet.getRange('C2:C'); // Assuming the data starts from C2 and goes down
  var values = range.getValues();
  var changes = []; // Array to store the change report

  for (var i = 0; i < values.length; i++) {
    var cellValue = values[i][0];
    if (cellValue.indexOf(',') === -1) { // Check if the cell doesn't already contain a comma
      var spaceIndex = cellValue.indexOf(' ');
      if (spaceIndex !== -1) { // Check if there is a space in the cell
        var firstName = cellValue.substring(0, spaceIndex);
        var lastName = cellValue.substring(spaceIndex + 1);
        var originalValue = cellValue;
        var newValue = lastName.trim() + ', ' + firstName.trim(); // Remove leftover spaces and trim
        // Remove extra spaces
        while (newValue.indexOf('  ') !== -1) {
          newValue = newValue.replace('  ', ' ');
        }
        // Remove space before comma
        newValue = newValue.replace(' ,', ',');
        range.offset(i, 0, 1, 1).setValue(newValue);
        // Store the change report
        changes.push("Moved '" + originalValue + "' to the end on line " + (i + 2));
      }
    }
  }

  // Display the change report in a pop-up
  var changeMsg = "Changes:\n\n" + changes.join('\n');
  Browser.msgBox('Script Execution Report', changeMsg, Browser.Buttons.OK);
}
