(async () => {
 const translator = await import(browser.runtime.getURL("eurofox.js"));

let parser = new DOMParser();
let done = false;
function updateNode(node) {
    // console.log("updateNode:");
    // console.log(node);
    let text = translator.translate2european(node.nodeValue);
    // console.log("Replacement: " + text);
    // node.replaceWith(text);
    let html = parser.parseFromString(text, 'text/html');
    // console.log("Replacement html: ");
    // console.log(html);
    // node.innerHTML = text;
    // console.log("Innerhtml: " + node.innerHTML);
    // const newNode = document.createElement('li');
    // newNode.innerHTML = html;
    node.parentNode.replaceChild(html[0], node);

}

function nodeFilter() {
    var b = this.nodeType == 3 && this.nodeName != 'SCRIPT' && this.nodeName != 'STYLE';
    // console.log("Filter node " + this + " of type " + this.nodeType + " and name " + this.nodeName + " => " + b);
    return b;
}

function getNodes(){
  var n, a=[], walk=document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  while(n=walk.nextNode()) {
    a.push(n);
  }
  return a;
}

var nodes = getNodes();
console.log("Found " + nodes.length + " nodes.");
for (var i=0, max=nodes.length; i < max; i++) {
  let node = nodes[i];
  // console.log("Node found:");
  // console.log(node);
  updateNode(node);
}
done = true;



// --------------------------- DOM Changes Listener below: -------------------

var disableObserver = false;
const mutationCallback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    if (!disableObserver && mutation.type == "childList") {
      console.log("Mutation:");
      console.log(mutation);
      if (mutation.addedNodes) {
        console.log("Added nodes:");
        console.log(mutation.addedNodes);
        // TODO filter on text nodes
        disableObserver = true;
        mutation.addedNodes.forEach(node => updateNewNode(node));
        disableObserver = false;
      }
    }
  }
};
function updateNewNode(node){
  console.log("New node of type " + node.nodeType);
  console.log(node);
  rewriteEcma(node);
}
const targetNode = document.body;
const observerConfig = { attributes: true, childList: true, subtree: true };
const observer = new MutationObserver(mutationCallback);
/*
The observer is currently deactivated because I don't know yet how to keep it
from reaction to the mutations that it's triggering itself.
Endless loop hooray.
The disableObserver flag above does not do the job. It wasn't a great idea anyway.


*/
// if(done) observer.observe(targetNode, observerConfig);


})();
