
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