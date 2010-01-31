var Email = require(path.join(process.cwd(), 'lib', 'email'));

describe("An email message", function() {
  beforeEach(function() {
    email_source = "To: alice\nFrom: bob\nSubject: Yo!\n\nLunch?\n";
  });

  it("should not change the raw source of a message", function() {
    var message = new Email.Message(email_source);
    assertEqual(email_source, message.raw_source());
  });

  it("should be able to parse the 'To:' header", function() {
    var message = new Email.Message(email_source);
    assertEqual([ "alice" ], message.to());
  });

  it("should be able to parse the 'From:' header", function() {
    var message = new Email.Message(email_source);
    assertEqual("bob", message.from());
  });

  it("should be able to parse the 'Subject:' header", function() {
    var message = new Email.Message(email_source);
    assertEqual("Yo!", message.subject());
  });

  it("should be able to parse the body", function() {
    var message = new Email.Message(email_source);
    assertEqual("Lunch?", message.body());
  });
});

describe("An email message addressed to several people", function() {
  beforeEach(function() {
    email_source = "To: alice,emily\nFrom: bob\nSubject: Yo!\n\nLunch?\n";
  });

  it("should not change the raw source of a message", function() {
    var message = new Email.Message(email_source);
    assertEqual(email_source, message.raw_source());
  });

  it("should be able to parse the 'To:' header", function() {
    var message = new Email.Message(email_source);
    assertEqual([ "alice", "emily" ], message.to());
  });

  it("should be able to parse the 'From:' header", function() {
    var message = new Email.Message(email_source);
    assertEqual("bob", message.from());
  });

  it("should be able to parse the 'Subject:' header", function() {
    var message = new Email.Message(email_source);
    assertEqual("Yo!", message.subject());
  });

  it("should be able to parse the body", function() {
    var message = new Email.Message(email_source);
    assertEqual("Lunch?", message.body());
  });
});

describe("Creating a new email message from scratch", function() {
  it("should not set the to field", function() {
    assertEqual([], new Email.Message().to())
  });
})