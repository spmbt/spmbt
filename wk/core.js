var $q = function(q, el){return (el || document).querySelector(q)}	//=====общие функции=====
,$qA = function(q, el){return (el || document).querySelectorAll(q)}
,$x = function(el, h){if(h) for(var i in h) el[i] = h[i]; return el}
$xDeep = function(el, h){if(h) for(var i in h){
	var ei = el[i];
	if(h[i] && h[i].constructor && h[i].constructor === Object)
		arguments.callee(ei = ei ||{}, h[i]);
	else
		ei = h[i];}
	return el;
}
,$isIE = !!document.all
,$pd = function(ev){!$isIE&& ev.preventDefault();},$sp = function(ev){!$isIE&& ev.stopPropagation();}
,$pdsp = function(ev){!$isIE&& ev.preventDefault(); !$isIE&& ev.stopPropagation();}
,$e = function(h, obj){ //el|clone,remove,IF+ifA,q|[q,el],cl|(clAdd,clRemove),ht,cs,at, atRemove,htT+htTA,on,revent,ap,apT,prT,bef,aft,f+fA
	if(typeof h.IF =='function'){
		h.IF = h.IF.apply(h, h.ifA ||[]); h.IF = h.IF || h.IF instanceof Array && h.IF[0];}
	h.el = h.el || h.clone && h.clone.cloneNode(!0) || h.IF && h.IF.attributes && h.IF || h.remove ||'DIV';
	var i,s ='',o = h.el = typeof h.el =='string'? (obj||document).createElement(h.el) : h.el;
	if(o){ //выполнять, если существует
		if(h.cl)
			o.className = h.cl;
		else{
			if(h.clAdd)
				o.classList.add(h.clAdd);
			if(h.clRemove)
				o.classList.remove(h.clRemove);}
		if(h.cs){
			if(!$isIE) $x(o.style, h.cs);
			else{
				for(i in h.cs)
					s += (function(i){return i.replace(/-(.)/g, function(match, gr){return gr.toUpperCase();});})(i) +':'+ h.cs[i] +';';
				o.style.cssText = s;
		}}
		if(h.ht || h.at){
			var at = h.at ||{}; if(h.ht) at.innerHTML = h.ht;}
		if(at)
			for(i in at){
				if(i=='innerHTML') o[i] = at[i];
				else o.setAttribute(i, at[i]);
			}
		if(h.atRemove)
			for(i in h.atRemove)
				o.removeAttribute(h.atRemove[i]);
		if(h.htT){ //подготовка шаблона
			if(typeof h.htTA !='object') h.htTA =[h.htTA];
			for(i in h.htTA)
				h.htT = h.htT.replace(RegExp('\\{\\{'+ i +'\\}\\}','g'), h.htTA[i]) //todo
			o.innerHTML = h.htT;}
		if(h.on)
			for(i in h.on)
				o[['addEventListener','attachEvent'][+$isIE]](['','on'][+$isIE]+i, h.on[i],!1);
		if(h.onCapture)
			for(i in h.onCapture) if(h.onCapture[i])
				o.addEventListener(i, h.onCapture[i],!0);
		if(h.revent)
			for(i in h.revent) if(h.revent[i])
				o[['removeEventListener','detachEvent'][+$isIE]](['','on'][+$isIE]+i, h.revent[i],!1);
		if(h.ap){ //добавление нод
			if(h.ap instanceof Array){
				for(i in h.ap) if(h.ap[i] && i !='length')
					o.appendChild(h.ap[i]);
			}else o.appendChild(h.ap);}
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
$loadJs = function(url, id, callback, obj){ //||(url, callback)
	var d = obj || document;
	if(typeof id =='function'){
		callback = id;
		id = null;}
	if(id && d.getElementById(id)) return; //no new script with same id
	if(url.charAt(0) =='+')
		url = SPRu +'/'+ url.substr(1); //relative path
	if(cF = typeof callback =='function')
		var cF, called =0, cFEx = function(nCall){if(!nCall && !called){called =1; callback();} };
	$e({el:'script'
		,at: $x({type:'text/javascript', charset:'UTF-8', async:'true', src: url}, id || id==0 ?{id: id}:{} )
		,apT: d.getElementsByTagName('body')[0]
		,on: cF ? {readystatechange: function(){cFEx(this.readyState !='complete')}
			,load: cFEx}:{}
	},obj);
},
$css = function(css, o, h){
	var s = $e({el:'style'
		,at:{type:'text/css'}
		,ap: (o||document).createTextNode(css)
		,apT: (o||document).getElementsByTagName('head')[0]});
	s.styleSheet &&(s.styleSheet.cssText = css);
},
addRules = $css,
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
},
$ready = function(f){
	if(window.addEventListener)
		addEventListener('DOMContentLoaded',f,!1);
	else if(winow.attachEvent)
		winow.attachEvent('onload',f);
},
loadLogger = function(onScreen, logLevel /*0:4*/){
	logLevel = logLevel !==undefined ? logLevel : 3;
	var w = window, wcA ={wcw:"'-w-", wci:'--', wcl:"'==", wce:"'=E="}
	,cons = w.document.getElementsByClassName('console')[0];
	if(onScreen){ //вывод сообщений консоли в блок на экране
		if(!cons)
			cons = $e({cl:'console',cs:{position:'fixed',width:'600px',minHeight:'150px',maxHeight:'800px',overflow:'auto',overflowX:'hidden',overflowY:'auto',top:'-2px',left:'300px',zIndex:99999,fontSize:'13px',fontFamily:'Arial',backgroundColor:'#a5c6ee',opacity:0.65, filter:'progid:DXImageTransform.Microsoft.Alpha(opacity=65)'}, apT: w.document.body });
		cons && (cons.style.display ='block');
		var consA = {warn:'w', info:'i', log:'', error:'E'};
		if(!w.console) w.console ={};
		w.consoleOrig = w.console;
		w.console ={};
		lvl =0;
		for(var i in consA){
			w.console[i] = (function(lvl, consAI, conCA){return function(aa){
				if(cons && logLevel <= lvl){
					cons.innerHTML +=['<i class=cons'+ conCA +'>'+ (this instanceof String ?"'=="+ this +"'": consAI) +'</i>'].concat([].slice.call(arguments))
						.join('<i class=consDelim>/ </i>') +'<br>';
					cons.scrollTop = Math.max(0, cons.scrollHeight);
				}
			} })(lvl++, consA[i], i.charAt(0).toUpperCase() + i.substr(1) );
		}
		w.console.clear = function(){if(cons) cons.innerHTML ='';};
	}else
		cons && (cons.style.display ='none');
	lvl =0;
	for(var i in wcA) //консоль[i] как метод строки или функция
		w[i] = (function(lvl, wcAI, i){
			return function(a){ a = a!==undefined|| arguments.length ? a :'';
				if(w.console && logLevel <= lvl)
				Function.prototype.apply.call(w.console[i], w.console, this instanceof String
				//w.console[i].apply(console, this instanceof String //--for without IE
					? [wcAI + this +"'"].concat([].slice.call(arguments))
					: arguments);
				else
					w.console[i] = function(){};
		} })(lvl++, wcA[i], {wcw:'warn', wci:'info', wcl:'log', wce:'error'}[i]);
	w.wcc = w.console.clear;
	w.wct = !IE && logTime ? (function(lvl, wcAI, i){
		return function(a){
			arguments.length ? (arguments.length !=1 || this != w ? this.wcl.apply(this,arguments) :0
			,console.timeEnd.call(console, this != w ? this : a) ): console.time.call(console,this);
		} })() : function(){};
	$x(String.prototype, {wcw: w.wcw, wci: w.wci, wcl: w.wcl, wce: w.wce, wcc: w.wcc, wct: w.wct });
};
//if(onScreen) $ready(function(){loadLogger(1, logLevel);}); else loadLogger(0, logLevel);
String.prototype.trim = function(s){var s = this ||s;
	return s.replace(/(^\s+|\s+$)/g,'')};
