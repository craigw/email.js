(function() { // don't pollute the global namespace
  String.prototype.strip = function() {
    return this.replace(/^(\s)+|(\s)+$/, '');
  }

  Email = {}
  Email.Message = function(raw_source) {
    if(raw_source) {
      this.raw_source(raw_source);
    }
  }

  Email.Message.prototype.raw_source = function(value) {
    if(!value) {
      return this._raw_source;
    } else {
      this._raw_source = value;

      var parts = value.split(/\r?\n\r?\n/, 2);
      var raw_headers = parts[0].strip().split(/\r?\n/);
      for(var i = 0; i < raw_headers.length; i++) {
        var raw_header = raw_headers[i];
        var kv = raw_header.split(/\:/, 2);
        var header = kv[0].strip();
        var value = kv[1].strip();
        if(header == "To") {
          this.to(value);
        } else if(header == "From") {
          this.from(value);
        } else if(header == "Subject") {
          this.subject(value);
        }
      }
      this.body(parts[1].strip());

    }
  }

  Email.Message.prototype.to = function(value) {
    if(!value) {
      return this._to || [];
    } else {
      if(value instanceof Array) {
        this._to = value;
      } else {
        this._to = value.split(/,/);
      }
    }
  }

  Email.Message.prototype.from = function(value) {
    if(!value) {
      return this._from;
    } else {
      this._from = value;
    }
  }

  Email.Message.prototype.subject = function(value) {
    if(!value) {
      return this._subject;
    } else {
      this._subject = value;
    }
  }

  Email.Message.prototype.body = function(value) {
    if(!value) {
      return this._body;
    } else {
      this._body = value;
    }
  }

  exports.message = function(raw_source) {
    return new Email.Message(raw_source);
  }
})();