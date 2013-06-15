var e = require("escape_escape_escape").Sanitize;
var _ = require("underscore")._;

var SINGLES = ['Section'];
var SINGLES_REGEXP = new RegExp('(' + SINGLES.join('|') + '): (.+)', 'i');
var MULTI   = ['Quote', 'Code'];

function Is_Single(l) {
  var m = null;
  _.detect(SINGLES, function (s) {
    m = l.match(SINGLES_REGEXP);
    return m;
  });

  return m;
}

function Is_Multi(l) {
  return false;
}

function Pop_Until_Mutli_End(desc, lines) {
  return "";
}

function Pop_Block(target, lines) {
  return "";
}

var To_Blocks = function (str) {
  var lines  =  str.split("\n");
  var working = lines.splice();
  var blocks = [];

  _.each(lines, function (l) {
    working.pop();
    var trim = l.trim();

    var is_single = Is_Single(trim);
    if (is_single) {
      if (is_single[1].toUpperCase() === 'SECTION') {
        blocks.push("<h3>" + is_single[2] + "</h3>");
      } else {
        is_single[0];
      }
      return;
    }

    var is_multi  = Is_Multi(trim);
    if (is_multi) {
      blocks.push(Pop_Until_Mutli_End(is_multi, working));
      return;
    }

    blocks.push(Pop_Block([l], working));

  });
  return blocks;
};

var Compile = function (lines) {
  var str = "";
  var new_lines = _.each(lines, function (l) {
    l = l.replace( /\*(.+)\*\s+\[(.+)\]/ig, function (a , b , c) {
      return '<a href="HREF">TEXT</a>'
      .replace('TEXT', b)
      .replace('HREF', E.uri(c));
    });

    l = (l.replace( /^Section:\s+(.+)$/mig, function (a , b) {
      return "<h3>" + $.trim(b) + "</h3>";
    }));

    l = (l.replace( /\/(.+)\//g, function (a , b) {
      return "<i>" + b + "</i>";
    }));

    l = l.replace( /\*(.+)\*/g, function (a , b) {
      return "<strong>" + b + "</strong>";
    });

    return l;
  });

  return new_lines.join("\n");
};

var BB = exports.Bling_Bling = function () {
};

BB.new = function (str) {
  var o = new BB;
  o.original = e.html( str.replace(/\r\n/g, "\n") );
  o.lines = To_Blocks(o.original);
  return o;
};

BB.prototype.to_html = function () {
  var my = this;
  return Compile(my.lines);
};
