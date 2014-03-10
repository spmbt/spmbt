/**
 * функции ядра (абстрактного) проекта - общие функции и данные, модуль проекта
 */
//function tst(){
	var $q = function(q, d){ // контекстный DOM-селектор
			return (d||window.document).querySelector(q);},
	$qA = function(q, d){ // контекстный DOM-селектор по группе
			return (d||window.document).querySelectorAll(q);},
	$x = function(el, h){if(h) for(var i in h) el[i] = h[i]; return el;}, //===extend===
	$e = function(g){ //===создать или использовать имеющийся элемент===
	//g={el|clone,elA,cl|(clAdd,clRemove),ht,cs,at,atRemove,on,revent,ap,apT,prT,bef,aft,f+fA}
		if(typeof g.el =='function') g.el = g.el.apply(g, g.elA);
		if(!g.el && g.el !==undefined && g.el !='') return g.el;
		g.el = g.el || g.clone && g.clone.cloneNode(!0) ||'DIV';
		var o = g.el = typeof g.el =='string'? document.createElement(g.el) : g.el;
		if(o){ //выполнять, если существует el или clone
			if(g.cl)
				o.className = g.cl;
			else{
				if(g.clAdd)
					o.classList.add(g.clAdd);
				if(g.clRemove)
					o.classList.remove(g.clRemove);}
			if(g.cs)
				$x(o.style, g.cs);
			if(g.ht || g.at){
				var at = g.at ||{}; if(g.ht) at.innerHTML = g.ht;}
			if(at)
				for(var i in at){
					if(i=='innerHTML') o[i] = at[i];
					else o.setAttribute(i, at[i]);}
			if(g.atRemove)
				for(var i in g.atRemove)
					o.removeAttribute(g.atRemove[i]);
			if(g.htT){ //подготовка шаблона
				if(!(typeof g.htTA =='object')) g.htTA =[g.htTA];
				for(var i in g.htTA)
					g.htT = g.htT.replace(RegExp('\\{\\{'+ i +'\\}\\}','g'), g.htTA[i])
				o.innerHTML = g.htT;}
			if(g.on)
				for(var i in g.on) if(g.on[i])
					o.addEventListener(i, g.on[i],!1);
			if(g.revent)
				for(var i in g.revent) if(g.revent[i])
					o.removeEventListener(i, g.revent[i],!1);
			if(g.ap){ //добавление нод
				if(g.ap instanceof Array){
					for(var i in g.ap) if(g.ap[i] && i !='length')
						o.appendChild(g.ap[i]);
				}else o.appendChild(g.ap);}
			g.apT && g.apT.appendChild(o);
			g.prT && (g.prT.firstChild
				? g.prT.insertBefore(o, g.prT.firstChild)
				: g.prT.appendChild(o) );
			g.bef && g.bef.parentNode.insertBefore(o, g.bef);
			g.aft && (g.aft.nextSibling
				? g.aft.parentNode.insertBefore(o, g.aft.nextSibling)
				: g.aft.parentNode.appendChild(o) );
			if(typeof g.f =='function')
				g.f.apply(g, g.fA); //this - это g
		}
		return o;
	},
	$css = function(css){ //подгрузка CSS
		if(typeof GM_addStyle !=u) GM_addStyle(css); //Fx,Chr
		else if(typeof addStyle !=u) addStyle(css);
		else{ //Op
			var heads = document.getElementsByTagName('head')
				,node = $e({el:'style'
					,apT: heads.length && heads[0]
				});
			node.appendChild(document.createTextNode(css)); //не проходит в Опере через $e
		}
	},
	getPosition = function(o){ //координаты элемента относительно документа
		var x =0, y =0;
		while(o){
			x += o.offsetLeft ||0;
			y += o.offsetTop ||0;
			o = o.offsetParent || o.parentNode;
		}
		return {x:x, y:y};
	},parents = function(cl, elem){ //первое нахождение регекспа в классах родительских элементов ($.closest)
		for(var el = elem; el!=null && !RegExp(cl).test(el.className); el = el.parentNode);
		return el;
	};

var logOnScreen =0 //логирование
	,logLevel =0 //0..4
	,consoleOrig
,loadLogger = function(onScreen, logLevel){ logLevel = logLevel !==undefined ? logLevel : 3;
	var w = window, wcA ={wcw:"'-w-", wci:'--', wcl:"'==", wce:"'=E="}
		,cons = w.document.getElementsByClassName('console')[0];
	if(onScreen){ //вывод сообщений консоли в блок на экране
		if(!cons)
			cons = $e({cl:'console',cs:{position:'fixed',width:'600px',minHeight:'150px',maxHeight:'800px',overflow:'auto',overflowX:'hidden',overflowY:'auto',top:'-2px',left:'300px',zIndex:99999,fontSize:'13px',fontFamily:'Arial',backgroundColor:'#a5c6ee',opacity:0.65, filter:'progid:DXImageTransform.Microsoft.Alpha(opacity=65)'}, apT: w.document.body });
		cons && (cons.style.display ='block');
		var consA = {warn:'w', info:'i', log:'', error:'E'};
		if(!w.console) w.console ={};
		consoleOrig = w.console;
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
		w.console.clear = function(a){if(cons) cons.innerHTML ='';}
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
	$x(String.prototype, {wcw: w.wcw, wci: w.wci, wcl: w.wcl, wce: w.wce, wcc: w.wcc });
};
//alert($q)
	/**
	 * модуль-конструктор календаря (основная функция задания)
	 */
	function CalendarImho(){
	var settDefault ={ //настройки / settings
		domBind:'.b-calendar-imho' //путь привязки календаря к DOM
		,css:{ //стили частей календаря (могут быть файлами)
			widthMin:'940px' //ширина блока календаря b-calendar-imho, общая
			,widthFrame: 0 //ширина рамки календаря
			,head:''
			,headCell:''
			,body:''
			,cell:''
			,footer:''},
		tmpl:{ //шаблоны частей календаря (могут быть файлами)
			rowsMin: 4 //минимальное число строк (недель) в календаре
			,head:''
			,headCell:''
			,body:''
			,row:''
			,cell:''
			,footer:''}
		,cellProportions: {width:1, height: 1}
		,i18n:{ru:{
					day:{
						full:'Воскресенье,Понедельник,Вторник,Среда,Четверг,Пятница,Суббота'.split(',')
					},
					month:{
						full:'Январь,Февраль,Март,Апрель,Май,Июнь,Июль,Август,Сентябрь,Октябрь,Ноябрь,Декабрь'.split(',')
						,fullGenitive:'Января,Февраля,Марта,Апреля,Мая,Июня,Июля,Августа,Сентября,Октября,Ноября,Декабря'.split(',')
					},
					dayFirst: 1 //первый день недели
					,meeting:{single:'заседание',pl:'заседаний',pl234:'заседания'}
					,assign:'назначить'
					,assignPassivePerfect:'назначено'
					,sign:'подписаться'
				},en:{
					day:{full:'Sunday,Monday,Tyesday,Wednesday,Thirsday,Friday,Saturday'.split(',')}
					,month:{full:'January,February,March,April,May,June,July,August,September,October,November,December'.split(',')}
					,dayFirst: 0
					,meeting:{single:'meeting',pl:'meetings'}
					,assign:'assign'
					,assignPassivePerfect:'assigned'
					,sign:'sign'
				}
			}
		};
	}
	CalendarImho.prototype ={ //методы календаря
		init: function(sett){

		},
		data: function(data){ //заполнение данными
			;
		}
	}
//}