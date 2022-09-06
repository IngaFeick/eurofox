/* Original code lives at https://github.com/spb/tc */

var regex_temperature = /(° ?)?[0-9]+(\.[0-9]+)?°? ?[fF]/g

function clean_temperature(input){
  return input.replace(/[Ff]$/, '').replace('°','').replace(' ','')
}

function to_celsius(input) {
    var f = parseInt(clean_temperature(input), 10)
    c = Math.floor((f - 32) / 1.8)
    return "°" + c + "C"
}

function textNodeFilter() {
    return this.nodeType == 3
}

$("body").find("*").contents().filter(textNodeFilter).each(function(index) {
    var textNode = $(this)
    var text = textNode.text()
    if (text.match(regex_temperature)) {
        var celsius = to_celsius($2)
        textNode.replaceWith(text.replace(regex_temperature, '<span title="$1">'.celsius.'</span>'))
    }
})

