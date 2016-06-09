/**
 * 项目初始化
 */
document.addEventListener('click', function(evt) {

  // 清除弹出框
  let TipDiv = document.querySelector('.english-helper-popover');
  if(TipDiv)  document.body.removeChild(TipDiv);
  
  // 没有选中区域就退出
	const selection = getSelection();
	if (!selection.toString().trim()) return;

  // 翻译
  translate(selection, data => {

    // 创建弹出框
    const rect = getRect(selection);
  	TipDiv = createTipDiv(rect, data);
    stopPropagation(TipDiv);

    // 弹出框添加到body下
    document.body.appendChild(TipDiv);
  });
});


function getRect(selection) {
  return selection.getRangeAt(0).getBoundingClientRect();
}

/**
 * 创建div
 * @param rect 鼠标选中的矩形对象
 * @return 弹出框div
 */
function createTipDiv(rect, data) {
  const top = (rect.bottom + scrollY) + 'px';
  const left = (rect.left + rect.right)/2 + 'px';

  const query = data.query;
  const display_content = data.basic && data.basic.explains.join('<br>') || data.translation;
  const div = `<div class="english-helper-popover" style="top:${top}; left:${left}">
                    <div class="english-helper-popover-arrow"></div>
                    <div class="english-helper-popover-title">${query}</div>
                    <div class="english-helper-popover-content">${display_content}</div>
                  </div>`
  return getDomfromHTML(div);
}

/**
 * 转换HTML字符串成为DOM
 */
function getDomfromHTML(HTML) {
  const result = document.createElement('div');
  result.innerHTML = HTML;
  return result.childNodes[0];
}

/**
 * 绑定事件
 * @param TipDiv 绑定事件的
 */
function stopPropagation(TipDiv) {
  TipDiv.addEventListener('click', e => {
    e.stopPropagation();
  });
}


/**
 * 翻译
 * @param selection 选中对象
 */
function translate(selection, callback) {
  const word = selection.toString().trim();
  const url = `//fanyi.youdao.com/openapi.do?keyfrom=sdfsffsdfsdfsdf&key=906673673&type=data&doctype=json&version=1.1&q=${word}`;

  fetch(url).then(function(res) {
    return res.json()
  }).then(data => {
    callback(data);
  }).catch(err => {})
}