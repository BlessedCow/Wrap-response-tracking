function scanClinicianData() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var scriptProperties = PropertiesService.getScriptProperties();

  // Retrieve clinician emails from script properties
  var storedEmails = scriptProperties.getProperty('clinicianEmails');
  var clinicianEmails = storedEmails ? storedEmails.split(',') : [];

  // Use whatever emails here
  var data = "emma.smith@email.com, lucas.johnson@email.com, sophia.brown@email.com, oliver.davis@email.com, ava.wilson@email.com";
  SpreadsheetApp.getUi().alert(data);

  // Prompt the user for email addresses
var inputEmails = Browser.inputBox("Enter Clinician Emails", "Enter email addresses separated by commas:", Browser.Buttons.OK_CANCEL);

// Check if the user clicked Cancel
if (inputEmails === null || inputEmails.toLowerCase() === 'cancel') {
  return;
}

  // Split the input emails into an array
  var newEmails = inputEmails.split(',');

  // Trim whitespaces from each email in the array
  newEmails = newEmails.map(function(email) {
    return email.trim();
  });

  // Update clinicianEmails array
  var clinicianEmails = newEmails;

  var startRow = 2; // Starting row of the data
  var endRow = sheet.getLastRow(); // Last row of the data in column B
  var statusColumn = 4; // Column D is where the status is located
  var outputColumn = 7; // Column G is where the email addresses will be listed
  var statusCounts = {}; // Object to store the status counts
  
  // Sort the email addresses in Column B alphabetically
  // sheet.getRange("B" + startRow + ":B" + endRow).sort({column: 2, ascending: true});
  
  // Continue with the rest of the code only if there are valid emails
  if (clinicianEmails.length === 0) {
    return;
  }

  // Loop through each clinician email
  for (var i = 0; i < clinicianEmails.length; i++) {
    var email = clinicianEmails[i];
    var emailRange = sheet.getRange(startRow, 2, endRow - startRow + 1);
    var emailValues = emailRange.getValues();
    var statusCountsForEmail = {
      "No Show": 0,
      "Cancelled": 0,
      "Checked-in": 0
    };
    var outputRow = i * 5 + 2;
    
    // Loop through each row in column B
    for (var j = 0; j < emailValues.length; j++) {
      var row = startRow + j;
      var status = sheet.getRange(row, statusColumn).getValue();
      
      // Check if the email matches and update the status counts
      if (emailValues[j][0].indexOf(email) !== -1) {
        if (statusCountsForEmail.hasOwnProperty(status)) {
          statusCountsForEmail[status]++;
        }
      }
    }
    
    // Output the email address
    sheet.getRange(outputRow, outputColumn).setValue(email);
    
    // Output the status counts
    var statusRow = outputRow + 1;
    sheet.getRange(statusRow, outputColumn).setValue("No Show");
    sheet.getRange(statusRow + 1, outputColumn).setValue("Cancelled");
    sheet.getRange(statusRow + 2, outputColumn).setValue("Checked-in");
    sheet.getRange(statusRow, outputColumn + 1).setValue(statusCountsForEmail["No Show"]);
    sheet.getRange(statusRow + 1, outputColumn + 1).setValue(statusCountsForEmail["Cancelled"]);
    sheet.getRange(statusRow + 2, outputColumn + 1).setValue(statusCountsForEmail["Checked-in"]);
  }
  
  // Sort the sheet by email A-Z and then Date
  sheet.getRange("A2:F" + endRow).sort([{column: 2, ascending: true}, {column: 1, ascending: true}]);
  
  // Recolor the background of cells G2:G172, H2:H172, and I2:I172
  var rangeToRecolor = sheet.getRange("G2:I" + endRow);
  rangeToRecolor.setBackground("#EAD1DC");
  
  // Recolor the background of cells G2 and H2 to #C9DAF8
  sheet.getRange("G2:H2").setBackground("#C9DAF8");
  
  // Recolor the background of every 5th row in columns G and H
  for (var k = 2; k <= endRow; k += 5) {
    sheet.getRange("G" + k + ":H" + k).setBackground("#C9DAF8");
  }
  // For some reason, the sheet deletes row 7... Do I paste this in later?
  // Copy row 7 back into its original position
  var rowToCopy = sheet.getRange(7, 1, 1, sheet.getLastColumn() - 1);
  rowToCopy.copyTo(sheet.getRange(7, 1));
  
  // Copy data from column H to column I
  var dataRange = sheet.getRange(startRow, 8, endRow - startRow + 1, 1);
  var dataValues = dataRange.getValues();
  sheet.getRange(startRow, 9, endRow - startRow + 1, 1).setValues(dataValues);
  
  // Delete data in column H
  sheet.getRange(startRow, 8, endRow - startRow + 1, 1).clearContent();
}
function replaceDivByZero() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var dataRange = sheet.getRange("J2:J" + sheet.getLastRow());
  var formulas = dataRange.getFormulas();
  
  for (var i = 0; i < formulas.length; i++) {
    var formula = formulas[i][0];
    if (formula.substring(0, 1) === '=') {
      var newFormula = formula.replace('=IFERROR(', '').replace(', 0)', ')');
      sheet.getRange(i + 2, 10).setValue(newFormula);
    }
  }
}
