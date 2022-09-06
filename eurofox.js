/* Original code lives at https://github.com/spb/tc */

// TODO replace size units as well

var regex_temperature = /(° ?)?[0-9]+(\.[0-9]+)?°? ?[fF]/g

function clean_temperature(input){
  return input.replace(/[Ff]$/, '').replace('°','').replace(' ','')
}

function to_celsius(input) {
    var f = parseInt(clean_temperature(input), 10); // TODO convert to float
    c = Math.floor((f - 32) / 1.8);
    return "°" + c + "C"
}

function textNodeFilter() {
    return this.nodeType == 3
}

$("body").find("*").contents().filter(textNodeFilter).each(function(index) {
    var textNode = $(this);
    var text = textNode.text();
    matches = text.match(regex_temperature);
    if (matches) {
        var original = matches[0];
        var celsius = to_celsius(matches[0]);
        textNode.replaceWith(text.replace(regex_temperature, '<span title="' + original + '">' + celsius + '</span>'))
    }
})

