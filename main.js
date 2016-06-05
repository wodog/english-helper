var tip = null;
document.addEventListener('mouseup', function(evt) {
	const selection = document.getSelection();
	const text = selection.toString();
	if (text.trim().length <= 0) {
		return;
	} 
	//获取翻译数据
	//显示对话框
	if (tip) {
		document.body.removeChild(tip);
	}
	tip = createTipDiv(evt.pageX, evt.pageY);
	document.body.appendChild(tip);
})

function createTipDiv(x, y) {
	const div = document.createElement('div');
	div.classList.add('englishTip');
	div.style.left = x + 'px';
	div.style.top = y + 'px';
	return div;
}