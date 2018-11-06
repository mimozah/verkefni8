const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;

  function init(_form, _items) {
    items = _items;
    _form.addEventListener('submit', formHandler);

    // TODO láta hluti í _items virka
	items.addEventListener('click', finish );
	items.addEventListener('click', edit );
	items.addEventListener('click', commit );
	_form.addEventListener('submit', add );
	items.addEventListener('click', deleteItem );
	items.addEventListener('click', el );
	
  }

  function formHandler(e) {
    e.preventDefault();

    console.log('halló heimur');
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
	var element = e.target;
	var parent = element.parentNode;
	if (element.tagName == "INPUT" ){
		if(element.type == "checkbox"){
			if(element.checked){
				parent.setAttribute("class", "item item--done");
			}else{
				parent.setAttribute("class", "item");			
			}
		}
	}
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
	var element = e.target;
	var parent = element.parentNode;
	if (element.tagName == "SPAN" ){
		var text = element.innerHTML;
		var input = el("input", "item__edit", "edit");
		input.setAttribute("type", "text");
		input.setAttribute("value", text);
		parent.insertBefore(input, parent.childNodes[2]);	
		element.remove();
		input.focus();		

	}
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
	var element = e.target;
	var parent = element.parentNode;
	if (element.tagName == "INPUT" ){
		if(element.type == "text"){
			var text = element.value;
			var span = el("span", "item__text", "commit");
			span.appendChild(document.createTextNode(text));		
			parent.insertBefore(span, parent.childNodes[2]);
			element.remove();
		}
	}
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
	var inputValue = document.getElementsByClassName("form__input")[0].value;
	if(inputValue.length != 0 && inputValue.trim() != ""){
		var li = el("li", "item", "finish");
		var input = el("input", "item__checkbox", "check");
		input.setAttribute("type", "checkbox");
		
		var span = el("span", "item__text", "strike");
		span.appendChild(document.createTextNode(inputValue));
		
		var button = el("button", "item__button", "delete");
		button.appendChild(document.createTextNode("Eyða"));

		li.append(input);
		li.append(span);
		li.append(button);

		var ul = document.getElementsByClassName("items");	
		ul[0].append(li);
		
		document.getElementsByClassName("form__input")[0].value= "";
		
	}
  }


  // event handler til að eyða færslu
  function deleteItem(e) {
	if (e.target.className == "item__button" ){
		e.target.parentNode.remove();
	}
  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {
  	var element = document.createElement(type);
	element.classList.add(className);
	return element;
  }

  return {
    init: init
  }
})();