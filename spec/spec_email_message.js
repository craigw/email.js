var Email = require(path.join(process.cwd(), 'lib', 'email'));

describe("An email message", function() {
  beforeEach(function() {
    email_source = "Time: Hammer Time\nTo: alice\nFrom: bob\nSubject: Yo!\n\nLunch?\n";
  });

  it("should not change the raw source of a message", function() {
    var message = new Email.Message(email_source);
    assertEqual(email_source, message.raw_source());
  });

  it("should be able to parse the 'To:' header", function() {
    var message = new Email.Message(email_source);
    assertEqual([ "alice" ], message.to());
  });

  it("should be able to parse the 'To:' header even if there are several addresses", function() {
    var source = "To: alice,emily\nFrom: bob\nSubject: Yo!\n\nTesting.";
    var message = new Email.Message(source);
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

  it("should be able to parse other headers", function() {
    var message = new Email.Message(email_source);
    assertEqual("Hammer Time", message.header("Time"));
  });

  it("should be able to parse the body", function() {
    var message = new Email.Message(email_source);
    assertEqual("Lunch?", message.body());
  });
});

describe("Creating a new email message from scratch", function() {
  it("should not set the to field", function() {
    assertEqual(undefined, new Email.Message().to())
  });
})