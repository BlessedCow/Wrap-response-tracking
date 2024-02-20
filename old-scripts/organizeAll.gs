function formatSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Step 1: Format column E to mm/dd/yyyy
  sheet.getRange("E:E").setNumberFormat("mm/dd/yyyy");

  // Step 2: Reset any existing highlighting or background
  sheet.getDataRange().setBackground(null).setFontColor("#000000");

  // Step 3: Sort the sheet by email, name, and date
  var range = sheet.getDataRange();
  var values = range.getValues();
  var colorsData = {"#F0E8B9": [], "#DEB48B": [], "#D9915D": [], "#f3a15c": [], "#f3835c": []};
  for (var i = 1; i < values.length; i++) {
    var row = values[i];
    var date = new Date(row[4]);
    var day = date.getDate();
    var color = null;
    if (day >= 1 && day <= 7) {
      color = "#F0E8B9";
    } else if (day >= 8 && day <= 14) {
      color = "#DEB48B";
    } else if (day >= 15 && day <= 21) {
      color = "#D9915D";
    } else if (day >= 22 && day <= 28) {
      color = "#f3a15c";
    } else if (day >= 29 && day <= 31) {
      color = "#f3835c";
    }
    if (color) {
      colorsData[color].push(row);
    }
  }

  // Step 4: Sort each array separately
  for (var color in colorsData) {
    colorsData[color].sort(function(a, b) {
      if (a[1] != b[1]) { // sort by email
        return a[1] > b[1] ? 1 : -1;
      } else if (a[2] != b[2]) { // sort by name
        return a[2] > b[2] ? 1 : -1;
      } else { // sort by date
        return new Date(a[4]) > new Date(b[4]) ? 1 : -1;
      }
    });
  }

  // Step 5: Concatenate the arrays back together in the desired order
  var sortedData = [];
  var colors = ["#F0E8B9", "#DEB48B", "#D9915D", "#f3a15c", "#f3835c"];
  for (var i = 0; i < colors.length; i++) {
    sortedData = sortedData.concat(colorsData[colors[i]]);
  }

  // Step 6: Clear the sheet and write the sorted data back to it
  sheet.clearContents();
  sheet.getRange(1, 1, 1, range.getNumColumns()).setValues([range.offset(0, 0, 1, range.getNumColumns()).getValues()[0]]);
  
  var rowToInsert = 2;
  for (var i = 1; i < sortedData.length; i++) {
    var row = sortedData[i];
    if (row[1] !== sortedData[i-1][1]) { // compare email with the one in previous row
      sheet.insertRowBefore(rowToInsert);
      rowToInsert++;
    }
    sheet.getRange(rowToInsert, 1, 1, row.length).setValues([row]);
    rowToInsert++;
  }

  // Step 7: Highlight rows based on day of month
  for (var i = 2; i <= sheet.getLastRow(); i++) {
    var row = sheet.getRange(i, 1, 1, range.getNumColumns()).getValues()[0];
    var date = new Date(row[4]);
    var day = date.getDate();
    var color = null;
    if (day >= 1 && day <= 7) {
      color = "#F0E8B9";
    } else if (day >= 8 && day <= 14) {
      color = "#DEB48B";
    } else if (day >= 15 && day <= 21) {
      color = "#D9915D";
    } else if (day >= 22 && day <= 28) {
      color = "#f3a15c";
    } else if (day >= 29 && day <= 31) {
      color = "#f3835c";
    }
    if (color && (i < 2 || i > 161)) {
      sheet.getRange(i, 1, 1, range.getNumColumns()).setBackground(color).setFontColor("#000000");
    }
  }
}
