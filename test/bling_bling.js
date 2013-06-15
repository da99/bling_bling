
var assert = require("assert");
var BB = require("../lib/b_b").Bling_Bling;


describe( 'Section:', function () {

  it( 'turns sections into h3', function () {
    var p = BB.new("Section: Hello");
    assert.equal(p.to_html(), "<h3>Hello</h3>");
  });

}); // === end desc

describe( 'Paragraphs/Blocks', function () {

  it( 'blocks of text into div.p', function () {
    var p = BB.new("\nHello\n");
    assert.equal(p.to_html(), "<div class=\"p\">Hello</div>" );
  });

}); // === end desc





