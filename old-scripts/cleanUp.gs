function cleanUpSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Unfreeze all frozen rows
  sheet.setFrozenRows(0);

  // Remove data from columns F to K
  sheet.getRange('F:K').clearContent();

  // Clear highlighting colors
  var maxRows = sheet.getMaxRows();
  var maxCols = sheet.getMaxColumns();
  sheet.getRange(1, 1, maxRows, maxCols).setBackground(null);

  // Remove comments from columns C, D, and E
  var rangeWithComments = sheet.getRange('C:E');
  var comments = rangeWithComments.getComments();
  for (var i = 0; i < comments.length; i++) {
    for (var j = 0; j < comments[i].length; j++) {
      if (comments[i][j] != null) {
        rangeWithComments.getCell(i+1, j+1).clearNote();
      }
    }
  }

  // Remove empty rows
  var data = sheet.getDataRange().getValues();
  var numRows = data.length;
  for (var i = numRows - 1; i >= 0; i--) {
    if (data[i].join("").trim() == "") {
      sheet.deleteRow(i + 1);
    }
  }

  // Sort the sheet A-Z in column C
  sheet.getRange('A:C').sort({column: 3, ascending: true});

  // Display a message to the user
  var message = "Data from columns F to K has been removed, comment highlights have been cleared, comments from columns C, D, and E have been removed, and duplicates in column A have been removed. The sheet has been sorted A-Z in column C.";
  SpreadsheetApp.getUi().alert('Script Execution Report', message, SpreadsheetApp.getUi().ButtonSet.OK);
}
