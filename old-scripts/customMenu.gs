function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Custom Menu')
    .addItem('Insert Row', 'insertRow')
    .addItem('Delete Row', 'deleteRow')
    .addToUi();
}

function insertRow() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var rowNumber = Browser.inputBox('Insert Row', 'Enter the row number where you want to insert a new row:', Browser.Buttons.OK_CANCEL);
  
  if (rowNumber === 'cancel') {
    return;
  }
  
  rowNumber = parseInt(rowNumber);
  
  if (isNaN(rowNumber) || rowNumber < 1 || rowNumber > sheet.getLastRow()) {
    Browser.msgBox('Invalid row number. Please enter a valid row number.');
    return;
  }
  
  sheet.insertRowBefore(rowNumber);
  sheet.getRange(rowNumber - 1, 1, 1, sheet.getLastColumn()).copyTo(sheet.getRange(rowNumber, 1));
}

function deleteRow() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var rowNumber = Browser.inputBox('Delete Row', 'Enter the row number you want to delete:', Browser.Buttons.OK_CANCEL);
  
  if (rowNumber === 'cancel') {
    return;
  }
  
  rowNumber = parseInt(rowNumber);
  
  if (isNaN(rowNumber) || rowNumber < 1 || rowNumber > sheet.getLastRow()) {
    Browser.msgBox('Invalid row number. Please enter a valid row number.');
    return;
  }
  
  sheet.deleteRow(rowNumber);
}

function clearRows() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var rangeString = Browser.inputBox('Specify Blank Rows', 'Enter the range of rows you want to clear (e.g., "11:11, 12:12"):', Browser.Buttons.OK_CANCEL);
  
  if (rangeString === 'cancel') {
    return;
  }
  
  var ranges = rangeString.split(',').map(function(range) {
    return sheet.getRange(range.trim());
  });
  
  ranges.forEach(function(range) {
    range.clearContent();
  });
}
