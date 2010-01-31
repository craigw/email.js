var email = require(path.join(process.cwd(), 'lib', 'email'));

describe("An email message", function() {
  beforeEach(function() {
    basic_email = "To: alice\r\nFrom: bob\r\nSubject: Yo!\r\n\r\nLunch?\r\n";
  });

  it("should not change the raw source of a message", function() {
    var message = email.message(basic_email);
    assertEqual(basic_email, message.raw_source());
  });

  it("should be able to parse the 'To:' header", function() {
    var message = email.message(basic_email);
    assertEqual("alice", message.to());
  });

  it("should be able to parse the 'From:' header", function() {
    var message = email.message(basic_email);
    assertEqual("bob", message.from());
  });

  it("should be able to parse the 'Subject:' header", function() {
    var message = email.message(basic_email);
    assertEqual("Yo!", message.subject());
  });

  it("should be able to parse the body", function() {
    var message = email.message(basic_email);
    assertEqual("Lunch?", message.body());
  });

});