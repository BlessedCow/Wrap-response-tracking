function getRGBValues() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var range = sheet.getRange("I:I");
  var values = range.getValues();
  var rgbValues = [];
  
  for (var i = 0; i < values.length; i++) {
    var cellValue = values[i][0];
    var rgbValue = getRGB(cellValue);
    rgbValues.push(rgbValue);
  }
  
  var outputRange = sheet.getRange(1, 16, rgbValues.length, 1); // Adjust the range to Column L (12)
  outputRange.setValues(rgbValues.map(function(value) { return [value]; }));
}

function getRGB(cellValue) {
  var color = cellValue;
  var red = (color & 0xff0000) >> 16;
  var green = (color & 0x00ff00) >> 8;
  var blue = color & 0x0000ff;
  return red + ", " + green + ", " + blue;
}

function getHexValues() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var range = sheet.getRange("I:I");
  var values = range.getValues();
  var hexValues = [];
  
  for (var i = 0; i < values.length; i++) {
    var cellValue = values[i][0];
    var hexValue = cellValue.toString(16);
    hexValues.push(hexValue);
  }
  
  var outputRange = sheet.getRange(1, 13, hexValues.length, 1); // Adjust the range as per your requirement
  outputRange.setValues(hexValues.map(function(value) { return [value]; }));
}
