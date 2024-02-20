function concatenateAndFormatEmails() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var startRow = 50; // Starting row number
  var endRow = 72; // Ending row number
  var nameColumn = 15; // Column O
  var names = []; // Array to store unique names
  
  for (var i = startRow; i <= endRow; i++) {
    var name = sheet.getRange(i, nameColumn).getValue();
    if (name) {
      var words = name.split(" ");
      if (words.length > 1) {
        var firstName = words[0];
        var lastName = words[1];
        var formattedName = firstName + "." + lastName + "@email.com";
        names.push(formattedName);
        sheet.getRange(i, nameColumn).setValue(formattedName);
      }
    }
  }
  
  // Remove duplicates
  var uniqueNames = names.filter(function(item, pos) {
    return names.indexOf(item) == pos;
  });
  
  // Clear column O
  sheet.getRange(startRow, nameColumn, endRow - startRow + 1, 1).clearContent();
  
  // Write unique names to column O
  for (var i = 0; i < uniqueNames.length; i++) {
    sheet.getRange(startRow + i, nameColumn).setValue(uniqueNames[i]);
  }
}
