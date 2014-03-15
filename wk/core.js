var $q = function(q, el){return (el || document).querySelector(q)}  //=====общие функции=====
,$qA = function(q, el){return (el || document).querySelectorAll(q)}
,$x = function(el, h){	if(h) for(var i in h) el[i] = h[i]; return el}
,$pd = function(ev){ev.preventDefault();},$sp = function(ev){ev.stopPropagation();}
,$pdsp = function(ev){ev.preventDefault(); ev.stopPropagation();}
,$e = function(h){ //el|clone,remove,IF+ifA,q|[q,el],cl,ht,cs,at,on,apT,prT,bef,aft,f+fA
	if(h.ht || h.at){
		var at = h.at ||{}; if(h.ht) at.innerHTML = h.ht;}
	if(typeof h.IF =='function')
		h.IF = h.IF.apply(h, h.ifA ||[]);
	h.el = h.el || h.clone || h.IF && h.IF.attributes && h.IF ||'DIV';
	var o = h.el = h.clone && h.clone.cloneNode(!0)
			|| (typeof h.el =='string' ? document.createElement(h.el) : h.el) || h.remove;
	var i
		,toCsKey = function(s){
			return s.replace(/([A-Z])/g,'-$1').toLowerCase();
		};
	if(o && (h.IF===undefined || h.IF) && (!h.q || h.q && (h.dQ = h.q instanceof Array ? $q(h.q[0], h.q[1]) : $q(h.q)) ) ){ //выполнять, если существует; h.dQ - результат селектора для функций IF,f
		if(h.cl)
			o.className = h.cl;
		if(h.cs)
			$x(o.style, h.cs);
		if(at)
			for(i in at){
				if(i=='innerHTML') o[i] = at[i];
				else o.setAttribute(i, at[i]);
			}
		if(h.on)
			for(i in h.on)
				o.addEventListener(i, h.on[i],!1);
		h.apT && h.apT.appendChild(o);
		h.prT && (h.prT.firstChild
			? h.prT.insertBefore(o, h.prT.firstChild)
			: h.prT.appendChild(o) );
		h.bef && h.bef.parentNode.insertBefore(o, h.bef);
		h.aft && (h.aft.nextSibling
			? h.aft.parentNode.insertBefore(o, h.aft.nextSibling)
			: h.aft.parentNode.appendChild(o) );
		h.remove && h.remove.parentNode && h.remove.parentNode.removeChild(h.remove);
		if(typeof h.f =='function')
			h.f.apply(h, h.fA ||[]); //this - это h
	}
	return o;
},
$parents = function(clss, elem){ //регексп класса
	for(var el = elem; el!=null && !RegExp(clss).test(el.className); el = el.parentNode);
	return el;
},
$prev = function(clss, elem){
	for(var el = elem; el!=null && !RegExp(clss).test(el.className); el = el.previousSibling);
	return el;
},
$next = function(clss, elem){
	for(var el = elem; el!=null && !RegExp(clss).test(el.className); el = el.nextSibling);
	return el;
},
$index = function(clss, elem){ var i =-1;
	for(var el = elem; el!=null; el = el.previousSibling) if(RegExp(clss).test(el.className) ) i++;
	return i;
},
$getPosition = function(o){
	var x =0, y =0;
	while(o){
		x += o.offsetLeft ||0;
		y += o.offsetTop ||0;
		o = o.offsetParent || o.parentNode;
	}
	return {x:x, y:y};
},
addRules = function(css){
	var heads = document.getElementsByTagName('head');
	if(heads.length){
		var node = document.createElement('style');
		node.type ='text/css';
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node);
	}
},
$ajax = function(h){
	h.success = h.success || function(){};
	h.error = h.error || function(){};
	var xhr = new XMLHttpRequest();
	xhr.open(h.method ||'get', h.url,!0);
	xhr.send();
	xhr.onreadystatechange = function(req){ //параметр - req (для req.responseText)
		if(xhr.readyState ==4){
			if(xhr.status ==200)
				h.success(req, xhr);
			else
				h.error(req, xhr);
		}
	}
};
var $css = addRules
,$ready = function(f){
	if(window.addEventListener)
		addEventListener('DOMContentLoaded',f,!1);
	else if(winow.attachEvent)
		winow.attachEvent('onload',f);
};
String.prototype.trim = function(s){var s = this ||s;
	return s.replace(/(^\s+|\s+$)/g,'')};
