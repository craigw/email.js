(function() { // don't pollute the global namespace
  String.prototype.strip = function() {
    return this.replace(/^(\s)+|(\s)+$/, '');
  }

  Email = {}
  Email.Message = function(raw_source) {
    this.raw_source = raw_source;
    var parts = raw_source.split(/\r\n\r\n/, 2);
    var raw_headers = parts[0].strip().split(/\r\n/);
    for(var i = 0; i < raw_headers.length; i++) {
      var raw_header = raw_headers[i];
      var kv = raw_header.split(/\:/, 2);
      var header = kv[0].strip();
      var value = kv[1].strip();
      if(header == "To") {
        this.to = value;
      } else if(header == "From") {
        this.from = value;
      } else if(header == "Subject") {
        this.subject = value;
      }
    }
    this.body = parts[1].strip();
  }

  exports.message = function(raw_source) {
    return new Email.Message(raw_source);
  }
})();