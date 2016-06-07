document.addEventListener('mouseup', function(evt) {
	const range = getSelectionDimensions();
	if (!range || range.width <= 0){
		return;
	}
	createTipDiv(range);
})

function getSelectionDimensions() {
  var range = getSelectionRange();
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
}

function getSelectionRange() {
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
}

function createTipDiv(range) {
	const button = document.createElement('button');
	button.setAttribute('id', 'englishHelper_tip');
	button.style.position = 'absolute';
	document.body.appendChild(button);
}