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
  var blocks = {list: [], last_type: null};
  var blocks_i = [];

  var push_to_block = function (l) {
    if (blocks.last_type !== 'block') {
      blocks.list.push([]);
      blocks_i.push(blocks.list.length - 1);
    }
    blocks.list[blocks.list.length - 1] = _.last(blocks.list) + "\n" + l;
    blocks.last_type = 'block';
    return blocks;
  };

  var push_single = function (l) {
    blocks.last_type = 'single';
    blocks.list.push(l);
    return 'single';
  };

  _.each(lines, function (l) {
    working.pop();
    var trim      = l.trim();
    var is_empty  = trim.length === 0;
    var is_single = Is_Single(trim);
    var is_multi  = Is_Multi(trim);

    if (!blocks.last_type && is_empty) {
      return;
    }

    if (blocks.last_type === 'block') {
      if (is_empty) {
        blocks.last_type = null;
        return;
      }
      if (!is_single && !is_multi) {
        push_to_block(l);
        return;
      }
    }

    if (is_single) {
      if (is_single[1].toUpperCase() === 'SECTION') {
        push_single("<h3>" + is_single[2] + "</h3>");
      } else {
        push_to_block(is_single[0]);
      }
      return;
    }

    push_to_block(l);
  });

  _.each(blocks_i, function (i) {
    blocks.list[i] = '<div class="p">' + (blocks.list[i] || "" ).trim() + "</div>";
  });
  return blocks;
};

var Compile = function (lines) {
  var str = "";

  _.each(lines, function (l) {
    l = l.replace( /\*(.+)\*\s+\[(.+)\]/ig, function (a , b , c) {
      return '<a href="HREF">TEXT</a>'
      .replace('TEXT', b)
      .replace('HREF', E.uri(c));
    });

    l = l.replace( /\/(.+)\//g, function (a , b) {
      return "<em>" + b + "</em>";
    });

    l = l.replace( /\*(.+)\*/g, function (a , b) {
      return "<strong>" + b + "</strong>";
    });

    return l;
  });

  return obj.list.join("\n");
};

var BB = exports.Bling_Bling = function () {
};

BB.new = function (str) {
  var o = new BB;
  o.original = e.html( str.replace(/\r\n/g, "\n") );
  o.lines = To_Blocks(o.original).list;
  return o;
};

BB.prototype.to_html = function () {
  var my = this;
  return my.lines.join("\n");
};
