(function() { // don't pollute the global namespace
  String.prototype.strip = function() {
    return this.replace(/^(\s)+|(\s)+$/, '');
  }

  Array.prototype.detect = function(matcher) {
    for(var i = 0; i < this.length; i++) {
      if(matcher.call(this, this[i])) {
        return i;
      }
    }
  }

  Email = {}
  Email.Message = function(raw_source) {
    this.headers = [];
    if(raw_source) {
      this.raw_source(raw_source);
    }
  }

  Email.Message.prototype.raw_source = function(value) {
    if(!value) {
      return this._raw_source;
    } else {
      this._raw_source = value;

      // Each line in an email is meant ot be terminated by <CRLF>.
      // Emails are composed of two parts, header and body. These are
      // separated by a line that contains only a <CRLF>.
      // See RFC 5322 Section 2.1.
      //
      // We're nice though, so we'll try to obey Postel's Law and
      // accept that sometimes we'll only get <LF> as a line
      // terminator. We don't yet accept emails that don't separate the
      // header and body with a blank line though.
      //
      //   http://en.wikipedia.org/wiki/Jon_Postel#Postel.27s_Law
      //
      var parts = value.split(/\r?\n\r?\n/, 2);
      var raw_headers = parts[0].strip().split(/\r?\n/);
      for(var i = 0; i < raw_headers.length; i++) {
        var raw_header = raw_headers[i];
        var kv = raw_header.split(/\:/, 2);
        var header = kv[0].strip();
        var value = kv[1].strip();
        this.header(header, value);
      }
      this.body(parts[1].strip());
    }
  }

  Email.Message.prototype.header = function(header_name, new_value) {
    var index = this.headers.detect(function(header) {
      return header['name'].toLowerCase() == header_name.toLowerCase();
    });

    if(new_value) {
      var header = { 'name': header_name, 'value': new_value };
      if(index) {
        this.headers[index] = header;
      } else {
        this.headers.push(header);
      }
    } else {
      if(typeof(index) != "undefined") { return this.headers[index]['value']; }
    }
  }

  Email.Message.prototype.to = function(value) {
    if(!value) {
      var to = this.header('to');
      if(to) { return to.split(/,/); }
    } else {
      if(value instanceof Array) {
        this.header('to', value.join(','));
      } else {
        this.header('to', value);
      }
    }
  }

  Email.Message.prototype.from = function(value) {
    return this.header('from', value);
  }

  Email.Message.prototype.subject = function(value) {
    return this.header('subject', value);
  }

  Email.Message.prototype.body = function(value) {
    if(!value) {
      return this._body;
    } else {
      this._body = value;
    }
  }

  exports.Message = Email.Message;
})();