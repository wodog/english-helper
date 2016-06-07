document.addEventListener('mouseup', function(evt) {
	const selection = window.getSelection();
	if (!selection.toString()) {
		return;
	}
	const range = selection.getRangeAt(0).cloneRange();
	const rect = range.getBoundingClientRect();
	createTipDiv(rect);
})

/*function getSelectionDimensions() {
  var range = getSelectionRange();
  console.log(range)
  if (!range)
    return null;
  var sel = document.selection;
  var width = 0, height = 0, left = 0, top = 0;
  if (sel) {
    if (sel.type != "Control") {
      width = range.boundingWidth;
      height = range.boundingHeight;
      left = range.boundingLeft;
      top = range.boundingTop;
    }
  } else if (window.getSelection) {
    sel = window.getSelection();
    if (sel.rangeCount) {
      if (range.getBoundingClientRect) {
        var rect = range.getBoundingClientRect();
        width = rect.right - rect.left;
        height = rect.bottom - rect.top;
        left = rect.left;
        top = rect.top;
      }
    }
  }
  return { width: width , height: height, left: left, top: top };
}*/

/*function getSelectionRange() {
  var sel = document.selection, range = null;
  var width = 0, height = 0, left = 0, top = 0;
  if (sel) {
    if (sel.type != "Control") {
      range = sel.createRange();
    }
  } else if (window.getSelection) {
    sel = window.getSelection();
    if (sel.rangeCount) {
      range = sel.getRangeAt(0).cloneRange();
    }
  }
  return range;
}*/

function createTipDiv(rect) {
	const button = document.createElement('a');
	button.style.position = 'absolute';
	button.style.left = (rect.left  + rect.right)/2 + 'px';
	button.style.top = (rect.bottom + window.scrollY) + 'px';
	button.setAttribute('title', "popover");
	button.setAttribute('data-placement', "bottom");
	document.body.appendChild(button);
	$(button).popover('show');
}