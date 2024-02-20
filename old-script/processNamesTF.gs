function processNames() {
  var trackerSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Tracker");
  var clientMapSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("clientMap");

  var trackerData = trackerSheet.getDataRange().getValues();
  var clientMapData = clientMapSheet.getDataRange().getValues();

  for (var i = 1; i < trackerData.length; i++) {
    var falseName = trackerData[i][2].trim().replace(/[\.,]/g, ""); // Clean the false name
    
    if (falseName) {
      var found = false;
      for (var j = 1; j < clientMapData.length; j++) {
        var row = clientMapData[j];
        for (var k = 1; k < row.length; k++) {
          var trueName = row[k].trim().replace(/[\.,]/g, ""); // Clean the true name from columns B to K
          
          if (falseName === trueName) {
            found = true;
            if (row[0].trim() !== "") { // Check that the matched cell in Column A of "clientMap" is not empty
              trackerSheet.getRange(i + 1, 3).setValue(clientMapData[j][0].trim().replace(/[\.,]/g, ""));
            }
            break;
          }
        }
        if (found) {
          break;
        }
      }
      
      if (!found) {
        trackerSheet.getRange(i + 1, 3).setBackground("lightorange"); // Highlight in light orange if no match is found
      }
    }
  }
}
