function correctNames() {
  // Get the active spreadsheet
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  // Get the clientMap and doThis sheets
  var clientMapSheet = spreadsheet.getSheetByName("clientMap");
  var doThisSheet = spreadsheet.getSheetByName("JanWIP"); // Or whatever the name of the sheet is where all the names are stored

  // Check if sheets are found
  if (!clientMapSheet || !doThisSheet) {
    Logger.log("Sheet not found. Please check the sheet names.");
    return;
  }

  // Clear background color in doThis sheet
  doThisSheet.getRange("C:C").setBackground(null);

  // Get data from clientMap sheet
  var clientMapData = clientMapSheet.getRange("A:Z").getValues(); // Assuming Z is the last column with data

  // Get data from doThis sheet
  var doThisData = doThisSheet.getRange("C:C").getValues();
  var doThisRange = doThisSheet.getRange("C:C");

  // Loop through each incorrect name in doThisData
  for (var i = 0; i < doThisData.length; i++) {
    var incorrectName = doThisData[i][0].toString().trim().toLowerCase();

    // Check if the incorrect name is in the clientMapData column A
    var correctedName = findCorrectName(incorrectName, clientMapData);

    // If the correctedName is found, update the value in doThis sheet
    if (correctedName !== null) {
      doThisRange.getCell(i + 1, 1).setValue(correctedName);
    } else {
      // If the incorrect name is not found, highlight with the HEX value: #FFFF00
      doThisRange.getCell(i + 1, 1).setBackground('#FFFF00');
    }
  }
}

function findCorrectName(incorrectName, clientMapData) {
  // Loop through the clientMapData to find the correct name
  for (var i = 0; i < clientMapData.length; i++) {
    var correctName = clientMapData[i][0].toString().trim().toLowerCase();

    // Check for an exact match
    if (incorrectName === correctName) {
      return clientMapData[i][0]; // Return the corresponding correct name
    }

    // Loop through the rest of the columns (B - Z) to find a match
    for (var j = 1; j < clientMapData[i].length; j++) {
      if (clientMapData[i][j] && incorrectName === clientMapData[i][j].toString().trim().toLowerCase()) {
        return clientMapData[i][0]; // Return the corresponding correct name
      }
    }
  }

  // Return null if the incorrect name is not found in clientMapData
  return null;
}
