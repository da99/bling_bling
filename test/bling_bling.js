
var assert = require("assert");
var BB = require("../lib/b_b").Bling_Bling;


describe( 'Section:', function () {

  it( 'turns sections into h3', function () {
    var p = BB.new("Section: Hello");
    assert.equal("<h3>Hello</h3>", p.to_html());
  });

}); // === end desc

describe( 'Paragraphs/Blocks', function () {

  it( 'blocks of text into div.p', function () {
    var p = BB.new("\nHello\n");
    assert.equal("<div class=\"p\">Hello</div>", p.to_html());
  });

}); // === end desc





