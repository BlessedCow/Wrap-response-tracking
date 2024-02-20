function sendEmail() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var emailRange = sheet.getRange("J62:J").getValues().filter(String).flat();
  var recipientString = emailRange.join(",");
  var to = "Enter email addresses separated by commas:";
  var cc = "Enter CC email addresses separated by commas:";
  var bcc = "Enter BCC email addresses separated by commas:";
  var subject = "Enter your email subject:";
  var toEmails = Browser.inputBox(to);
  var ccEmails = Browser.inputBox(cc);
  var bccEmails = Browser.inputBox(bcc);
  var messageText = Browser.inputBox("Enter your email message:");
  var message = GmailApp.createDraft(toEmails, subject, messageText, {
    cc: ccEmails,
    bcc: bccEmails
  });
  message.send();
}
