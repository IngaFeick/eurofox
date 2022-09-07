
import { * } from 'eurofox';

function rewrite(textNode) {
    console.log("Rewrite:");
    console.log(textNode);

    /* TODO this doesn't work when the node is passed from the Mutation Observer:
    if (textNode.parent() && textNode.parent()[0])
    {
        let nodeParentType = textNode.parent()[0].localName;
        if(ignoredNodeTypes.includes(nodeParentType) )
        {
            return;
        }
    }*/

    let text = translate2european(textNode.text());
    textNode.replaceWith(text);
}

$("body").find("*").contents().filter(nodeFilter).each(function() {
    let node = $(this);
    rewrite(node);
  });


const mutationCallback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.type == "childList") {
      // console.log("Mutation:");
      // console.log(mutation);
      if (mutation.addedNodes) {
        console.log("Added nodes:");
        console.log(mutation.addedNodes);
       // TODO filter on text nodes
        mutation.addedNodes.forEach(node => updateNewNode(node));

      }
    }
  }
};
const targetNode = document.body;
const observerConfig = { attributes: true, childList: true, subtree: true };
const observer = new MutationObserver(mutationCallback);
observer.observe(targetNode, observerConfig);
