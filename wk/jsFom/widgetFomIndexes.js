/**
 * Виджет иллюстрации индексов доверия в опросах (блок для сайдбара 235px)
 * * создаёт виджеты в блоках .b-widgetFomIndexes или других, указанных явно;
 * * политика использования rel-атрибутов под настройки;
 * * непосредствееный или отложенный запуск (клик или таймер);
 * * запуск через панель настроек (для обучения);
 * @constructor
 * @param {Object} p настройки блока
 */
WidgetFomIndexes = function(p){
	this.init(p);
};
$.extend(WidgetFomIndexes, {
	inst: [], //массив экземпляров (этого конструктора)
	/**
	 * создание стартовой панели по настройкам и кнопки запуска (генерации) виджета
	 * @param {Object} p { настройки оформления панели (не обязательны) }
	 *   @param_sub {html} head  заголовок
	 *   @param_sub {String} textButton  название на кнопке пуска (внизу)
	 *   @param_sub {String} stringed  хранить отложенные параметры в rel кнопки
	 */
	startPanel: function(p, pSett){
		var th = this
			, $panelPlace = $('.b-panelSettings.widgetFomIndexes'); //шаблон настроек
		$panelPlace.each(function(i, elem){
			var defa ={}, defi ={};
			var opt = $.isArray(p) ? p[i] : p //взять элемент массива, если есть массив (кастомизация настроек)
				, sett = $.isArray(pSett) ? pSett[i] : pSett
				, defa ={}, defaO ={};
			$(elem).html('');
			for(var j in th.prototype.defa){
				defa[j] = defaO[j] = th.prototype.defa[j].v;
				defi[j] = th.prototype.defa[j].d;
			}
			for(var j in opt) //примесь "настроек настроек"
				defaO[j] = opt[j];
			for(var j in sett) //примесь новых настроек
				defa[j] = defaO[j] = sett[j];
			$('#panelSettings').tmpl(defaO, {d:defi, o:opt}).appendTo(elem);
			$(elem).find('.s0').click(WidgetFomIndexes.load);
			if(opt.stringed)
				$(elem).find('.s0').attr('rel', JSON.stringify(defa) ); //хранение настроек
		});
	},
	/**
	 * генерация виджета по строке или форме
	 *   способ их запуска (прямой или отложенный)
	 */
	load: function(){
		var th = this
			, $elems = $('.b-widgetFomIndexes')
			, sett ={}; //настройки
		
		$('#i3').hide();
		if($(th).attr('rel')) //источник настроек - rel-атрибут
			sett = $.parseJSON($(th).attr('rel'));
		var $formCont = $(th).parents('.b-panelSettings.widgetFomIndexes')
			, $formInputs = $formCont.find('input:not([type="button"]):not([type="submit"])'); //не учтены textarea
		$formInputs.each(function(i){ //объединение источников настроек (rel и форма)
			if($(this).attr('type') =='checkbox')
				sett[$(this).attr('name')] = $(this).attr('checked') ?1:0; //строго
			if($(this).attr('type') =='text') //строго
				sett[$(this).attr('name')] = $(this).attr('value');
		});
		if($formCont.next(sett.elemSel).length) //правило 1 - брать следующий за полем выбора, если он есть
			sett.$elem = $formCont.next(sett.elemSel);
		else //правило 2 - брать первый из селектора (по документу) - обычно для явного указания
			sett.$elem = $(sett.elemSel).eq(0);
		WidgetFomIndexes.create(new WidgetFomIndexes(sett));
	},
	/**
	 * создать виджет
	 * @param {Object} inst  новый виджет-объект или его настройки или пусто
	 */
	create: function(inst){
		if(typeof inst=='object' && !(inst instanceof WidgetFomIndexes)){ //создание с настройками
			inst = new WidgetFomIndexes(inst);
		}
		if(!inst)
			inst = new WidgetFomIndexes();//создание с настройками по умолчанию
		var iL = this.inst.length;
		this.inst[iL] = inst; //записать объект виджета в список экземпляров
		inst.$elem.attr('rel', iL); //обратная связь блока dom с объектом (по индексу списка)
	}
});
WidgetFomIndexes.prototype ={
	/**
	 * настройки виджета по умолчанию и описания настроек
	 */
	defa: {
		 width:
		 		{v: 235, d:'ширина виджета'}
		, height:
				{v: 323, d:'высота виджета'}
		, borderWidth:
				{v: 2,   d:'ширина бордюра тела списка'}
		, animTime:
				{v: 400, d:'скорость анимации списка [мс]'}
		, arrowsOnGraph:
				{v: !!0, d:'прокрутки - поверх графика'}
		, dateEdgesOnGraph:
				{v: !!0, d:'граничные даты размещаются поверх графика'}
		/*, listMap:
				{v: !!1, d:'показ карты списка (между кнопками прокрутки)'}
		, animateLongLine:
				{v: !!1, d:'анимация длинных строк по наведению мыши'}*/
		, listLinesInView:
				{v: 4,   d:'число видимых строк списка'}
		, listSelectRandom:
				{v: !!0, d:'случайный выбор строки для показа графика'}
		, elemSel:
				{v:'.b-widgetFomIndexes', d:'контейнер(ы) для загрузки виджета(ов)'}
	},
	/**
	 * установка настроек виджета(ов) и связей DOM-объекта с JS-объектом
	 * @param {Object} p { возможны все имена, перечисленные в defa[name] }
	 */
	init: function(p){
		if(!p) p ={};
		for(var i in p)
			this[i] = p[i] || this.defa[i].v; //явные параметры
		for(var i in this.defa)
			this[i] = p[i] || this.defa[i].v; //замены из умолчаний
		p.$elem = this.$elem = this.$elem || $(this.elemSel).eq(0);
		if(!p.firstLoad)
			p.$elem.html('').css('minHeight', 303);
		var sett = p;

		var th = this;
		//образец: jQuery.get( url, [ data ], [ success(data, textStatus, jqXHR) ], [ dataType ] )
		if(/^http:/.test(location.href)){
			$.get('js/xml.xml', function(data, status, xhr){
				th.xmlLoad ={data: data, status: status, xhr: xhr};
				if(th.csvLoad)
					th.dataStep2(th);
			});
			$.get('js/index.csv', function(data, status, xhr){
				th.csvLoad ={data: data, status: status, xhr: xhr};
				if(th.xmlLoad)
					th.dataStep2(th);
			});
		}else //запуск с тестовыми данными для демонстрации (без Ajax)
			th.dataStep2(th);
	},
	/**
	 * построение виджета (по данным из файлов и шаблону)
	 */
	dataStep2: function(th){
		//WidgetFomIndexes.inst[0].clear({$elem: WidgetFomIndexes.inst[0].$elem});
			//фиксированно выбирается место загрузки, для теста
		if(th.xmlLoad){
			var xmlJ = xml2json.parser(th.xmlLoad.xhr.responseText); //(парсинг из текста - дольше, но работает)
			//var xmlJ = xmlToJson(th.xmlLoad.xhr.responseXML);
			var csvJ = th.csvLoad.xhr.responseText.replace(/'\r/gm,'').split('\n');
			//Alert(th.csvLoad.xhr.responseText)
		}else{
			var xmlJ = xml2json.parser(xmlJTest);
			var csvJ = csvJTest.replace(/'\r/gm,'').split('\n');
		}
		var indexes = xmlJ.alldata.chartdata.index
			, allIndexLink = th.allIndexLink = xmlJ.alldata.allindexlink
			, copyCode = th.copyCode = xmlJ.alldata.copycode
			, iL = indexes.length
			, csvL = csvJ.length
			, listLinesInView = th.listLinesInView; //число линий
		th.csvJ =[];
		for(var k =0; k < csvL; k++) //таблица из CSV (87 x 14)
			csvJ[k] = th.csvJ[k] = csvJ[k].split(';');
		th.pageLast = (Math.ceil(iL / listLinesInView) || 1) -1 ; //последняя страница (счёт от 0)
		for(var i =0; i < iL; i++)
			if(indexes[i].checked =='true') //поиск выделенной (checked) линии
				break;
			//поиск в данных CSV по .name
		var carous = th.carous ={} //двойной массив для шаблона карусели
			, iDateLast = csvJ[0].length -1;
		carous.iSelect = (i != iL)? i :0; //выделенная строка (на которой построен график)
		carous.list =[];
		carous.listLinesInView = listLinesInView;
		for(var i =0; i < iL; i++){ //  (- пагинатор); строки одной страницы
			carous.list[i] = indexes[i]
				|| {checked: 0, link:'', name:'', titleinx:''}; //заполнение пустых полей в конце
			for(var j =1; j < csvL; j++) //поиск соотв.строки
				if(csvJ[j][0] == indexes[i].name)
					break;
			if(j != csvL)
				carous.list[i].csvLine = j; //соответствие строки CSV с XML; TODO случай отсутствия
			var k = iDateLast;
			while((!csvJ[j][k] || csvJ[j][k].length==1)  && k-- !=1); //прокрутка даты до значащей в данной строке i
			carous.list[i].lastValue = k >0 ? csvJ[j][k] :'';
			carous.list[i].lastDate = k >0 ? csvJ[0][k] :'';
			k--;
			while((!csvJ[j][k] || csvJ[j][k].length==1) && k-- >0); //прокрутка даты до прежней значащей
			if(k >0){
				var delt = Math.floor((carous.list[i].lastValue - csvJ[j][k]) *10 +0.5) /10;
				carous.list[i].delta = (delt >0 ?'+':'')
					+ delt.toString().replace(/([^\.]\d|[+\-]\d)$/,'$1.<span class="invis">0</span>'); //скрывание последних нулей
			}else
				carous.list[i].delta ='';
			carous.list[i].lastValue = (Math.floor((carous.list[i].lastValue) *10
				+0.5) /10).toString().replace(/([^\.]\d)$/,'$1.<span class="invis">0</span>'); //скрывание последних нулей
			var k = 1;
			while((!csvJ[j][k] || csvJ[j][k].length==1) && k++ != iDateLast);
			carous.list[i].firstDate = k <= iDateLast ? csvJ[0][k] :'';
			carous.list[i].link = indexes[i].link; //ссылки для перехода (выхода из виджета)
		}
		th.carouWidth = th.width * th.pageLast;
		if(th.listSelectRandom)
			carous.iSelect = Math.floor(iL * Math.random());
		
		$('#fomIndexes').tmpl(carous).appendTo( th.$elem ); //DOM из шаблона - в контейнер виджета
		
		if(th.borderWidth !=2){
			th.$elem.children('.body').css({border: th.borderWidth +'px solid #000', width: th.width -2* th.borderWidth});
			th.$elem.find('.body2, .body2 .list, .arrange, .graph').css({width: th.width -2* th.borderWidth});
			
		}
		th.page = Math.floor(carous.iSelect / th.listLinesInView);
		th.$elem.find('.list').css({left: -(th.width - 2* th.borderWidth)* th.page });
			//кнопки прокрутки страниц:
		th.$elem.find('.copyCode.left').click(function(ev){th.toRight.call(th, ev)});
		th.$elem.find('.copyCode.right').click(function(ev){th.toLeft.call(th, ev)});

		th.$elem.find('.button.copyCode').click(function(){th.toggleCode.call(th)});
		th.$elem.find('.button.allIndexes').click(function(){th.goIndexes.call(th)});
		
		var $txtMetrics = th.$elem.find('.line .txtCellMetric .txtMetric');
		for(var i =0; i < iL; i++){ //расстановка троеточий с подсказками
			var $txtM = $txtMetrics.eq(i);
			th.checkEllipsis($txtM.parents('.line'), $txtM.width());
			th.$elem.find('.line').eq(i).click(function(ev){th.changeLine.call(th, ev)}); //клик по линии
		}
		th.$elem.find('.graph0').click(function(){th.goByLine.call(th)}); //выход по ссылке, взятой из линии
		th.$elem.find('.arrange').click(function(){th.goByLine.call(th)}); //другой выход по ссылке из линии
		if(th.arrowsOnGraph){
			th.$elem.find('.body .graph').css({height: 148});
			th.$elem.find('.body .arrange').css({position:'relative', height: 1});
			th.$elem.find('.body .arrange .copyCode').css({position:'absolute', zIndex: 5, opacity: 0.5});
			th.$elem.find('.body .arrange .copyCode.right').css({right: 0});
		}
		if(th.listLinesInView !=4){
			th.$elem.find('.body .graph').css({height: 128 +20*(4- th.listLinesInView) +20*th.arrowsOnGraph});
			th.$elem.find('.body .list').css({height: 80 -20*(4- th.listLinesInView)});
		}
		th.showGraphics(carous.iSelect); //отрисовка графика
		th.checkArrowsActive.call(th);
		th.checkArrowsActive.call(th, 1); //начальная проверка активных кнопок ("влево" и "вправо")
	},
	/**
	 * движение списка влево
	 */
	toRight: function(ev){
		if( this.page >0 ){
			this.checkArrowsActive(1);
			this.page--;
			this.$elem.find('.list').animate(
				{left: "+=" + (this.width - 2* this.borderWidth)
				}, this.animTime
			);
		}
		ev.target.blur();
		ev.stopPropagation();
	},
	/**
	 * движение списка вправо
	 */
	toLeft: function(ev){
		if(this.page < this.pageLast){
			this.checkArrowsActive();
			//if( -parseInt(this.$elem.find('.list').css('left').replace(/px/,'')) < this.carouWidth - 2* this.borderWidth )
			this.page++;
			this.$elem.find('.list').animate(
				{left: "-=" + (this.width - 2* this.borderWidth)
				}, this.animTime
			);
		}
		ev.target.blur();
		ev.stopPropagation();
	},
	/**
	 * проверка и установка активности кнопок
	 */
	checkArrowsActive: function(isLeft){
		if(!isLeft) isLeft =0;
		var buttLeft = this.$elem.find('.copyCode.left')
			, buttRight = this.$elem.find('.copyCode.right');
		if(!isLeft && this.page >= this.pageLast -1)
			buttRight.addClass('inactive');
		else
			buttRight.removeClass('inactive');
		if( isLeft && this.page <=1)
			buttLeft.addClass('inactive');
		else
			buttLeft.removeClass('inactive');
	},
	/**
	 * проверка и установка троеточий и title для длинных строк
	 */
	checkEllipsis: function($line, width){// ширина строки текста (без цифр и отступов)
		var needEllipsis = width > this.width -27 -2 -29 -13  -2*this.borderWidth;
		$line.find('.hellip').css({display: needEllipsis && $.browser.mozilla ?'block':'none'});
		if(needEllipsis)
			$line.find('.txtMetric').addClass('hoverTitle');
	},
	/**
	 * ссылки и тексты (пока - заглушки с показом данных)
	 */
	toggleCode: function(){
		var s = this.copyCode.replace(/&(l|g)t;/gm, function(s){return s=='&lt;'?'<':'>';});
		if($.browser.msie)
			prompt('Код виджета для установки на свой сайт:', s)
		else
			alert('Код виджета для копирования: '+ s );
	},
	goIndexes: function(){
		alert('(заглушка) Перейти на страницу с индексами, '+ this.allIndexLink);
		//location.href = this.allIndexLink;
	},
	/**
	 * переключение строк (и графиков) в карусели
	 */
	changeLine: function(ev){
		var t = ev.target || ev.srcElement //добраться до порядкового номера строки, по которой кликнули...
			, $line = $(t).closest('.line')
			, iLine = $line.prevAll().length + $line.parent().prevAll().length * this.listLinesInView;
		
		$line.parent().parent().find('.line.checked').removeClass('checked');
		this.carous.iSelect = iLine;
		$line.addClass('checked');

		//отрисовка нового графика
		this.showGraphics(iLine);
		this.$elem.find('.dates .first').html(this.carous.list[iLine].firstDate);
		this.$elem.find('.dates .last').html(this.carous.list[iLine].lastDate);
		this.$elem.find('.arrange').attr('title','на страницу "'+ this.carous.list[iLine].titleinx +'"')
	},
	/**
	 * выход на страницу с "индексом" (доверия)
	 */
	goByLine: function(){
		alert('Заглушка: переход по адресу: '+ this.carous.list[this.carous.iSelect].link)
		//location.href = this.carous.list[$(this).prevAll().length].link;
	},
	getDate: function(dateMs){
		var D = new Date(dateMs), DM = D.getMonth() +1;
		return D.getDate() +'.'+ (DM >=9?'':'0') + DM +'.'+ D.getFullYear();
	},
	/**
	 * отрисовка графика
	 * @param {Number} L порядковый номер строки в общем списке this.carous
	 */
	showGraphics: function(L){
		var th = this;
		if(!this.carous.graph){
			th.carous.data =[];
			th.carous.dates =[];
			for(var i =1, a, iL = th.csvJ[0].length; i < iL; i++){ //общий массив дат для графиков
				a = th.csvJ[0][i].match(/\d+/g); //[число, месяц, год]
				if(a.length ==3) //(при ошибках в датах будет undef.)
					th.carous.dates[i -1] = Date.UTC(a[2], a[1] -1, a[0]) ||null;
			}
		}
		//Alert(th.carous.list[L].csvLine)
		if(!th.carous.data[L]){ //сохранение данных графика (1 раз)
			th.carous.data[L] =[];
			for(var i =1, k=0, iL = th.csvJ[0].length; i < iL; i++){
				if(th.carous.dates[i -1] !==null && th.csvJ[th.carous.list[L].csvLine][i] !=='' && th.csvJ[th.carous.list[L].csvLine][i] !==null) //неучёт пустых значений
					th.carous.data[L][k++] =[
						th.carous.dates[i -1] //дата
						, Number(th.csvJ[th.carous.list[L].csvLine][i]) ||null //значение (>0..100)
						//, (new Date(th.carous.dates[i -1])).getFullYear() +'-'+ ((new Date(th.carous.dates[i -1])).getMonth()+1) +'-'+ (new Date(th.carous.dates[i -1])).getDate() //для отладки
					];
			}
			//Alert(th.carous.data[L])
			//Todo тут же можно крайние даты найти, а не в начале построений
		}
		var a = th.carous.list[L].firstDate.match(/\d+/g) //[число, месяц, год]
			, firstDate = Date.UTC(a[2], a[1] -1, a[0]) ||null
			, a = th.carous.list[L].lastDate.match(/\d+/g) //[число, месяц, год]
			, lastDate = Date.UTC(a[2], a[1] -1, a[0]) ||null;
		if($.browser.webkit)
		th.$elem.find('.body2').css({position:'static'});
		var chart = new Highcharts.Chart({
			chart: {
				renderTo: th.$elem.find('.graph')[0]
				, showAxes: 0
				, spacingTop:0
				, spacingRight:0
				, spacingBottom: -20* th.dateEdgesOnGraph
				, spacingLeft:-28
				, events: {click: function(){th.goByLine.call(th)} }
			}
			,title:{text: null}
			,xAxis: {
				title:{text: null}
				, type: 'datetime'
				, endOnTick: 0
				, startOnTick: 0
				, min: firstDate  -6e8 //минус 7 дней, чтобы не скрывалась 1-я точка
				, max: lastDate  +6e8
			}
			,yAxis: {
				title:{text: null}
				, enabled: false
				, plotLines:[{value: 50, color: 'red', dashStyle: 'Dash', width: 1}]
				, min: 0
				, max: 100
				, tickInterval: 100
			}
			,series: [{data: /*[
[Date.UTC(2010, 0, 1), 29.9]
, [Date.UTC(2010, 0, 3), 106.4]
, [Date.UTC(2010, 0, 8), 176.0]	]*/
				th.carous.data[L]
				, name:'Опросы мнения'
			}]
			,labels:{
				style:{display:'none'}
			}
			,plotOptions:{
				line: {
					color:'#d44'
					,marker:{
						symbol: 'circle',
						radius: 2,
						states: {
							hover: {
								enabled: true
							}
						}
					}
					,shadow: false
					,visible: 0
				},
				spline: {
					color:'#b44'
					,marker: {
						symbol: 'circle',
						radius: 2,
						states: {
							hover: {
								enabled: true
							}
						}
					}
					,shadow: false
				}
			}
			,tooltip:{
				borderRadius: 4
				, borderWidth: 0
				, borderColor:'#fff'
				, shared: 1
				,formatter: function(){
					var s ='<b>....</b> ';
					$.each(this.points, function(i, point){ //очень малы изобразительные возможности, т.к. SVG
						s += point.y + ' <b>....</b>';
					});
					return s +'<br/>'+ th.getDate(this.x);
				}
				,style:{fontSize:'11px', color:'#bb3333'}
			}
			,legend:{enabled: false, floating: 1}
			,credits:{enabled: false}
		});
		//$('.graph svg tspan').hide();
	}
};






/** =============== документация по общим свойствам ================ *

   Общие свойства - процедуры с планами использования в других объектах.

   * настройки и панель настроек - попытка унифицировать настройки и способ экспериментирования с ними.
Настройки содержат значения по умолчанию (если есть), описание (если есть), прочие параметры (зависит от задачи).

   Все настройки обязательны для копирования в объект.
   (?унаследовать настройки, чтобы их не копировать?)
   Формат данных определяет поле ввода в панели настроек (чекбокс, однострочное, многострочное).
   Неактивная настройка - планы на будущее. Ссылка - на описание.
   Вид панели настроек определяется настройками панели настроек и может отличаться в разных программах.
(Так отделяется форма представления настроек от них самих.)

   Панель настроек - показывает все настройки с описаниями и полями ввода для изменения; кнопку запуска.
   Тип запуска: прямой, по юзер-событию, по задержке, по встроенному событию




   ** показ ссылок на релевантные статьи на графиках (с аннотациями)
*/

/**
 * Вывод отладки в консоль, если стоит разрешающая Alert.go =' ... ';
 * @param o: аргументы: 1) Alert('имя_подсистемы', аргументы); или 2) Alert({from:'имя', <другие ключи>});
 *   или 3) 'имя'.Alert(аргументы); или 4) (TODO) <объект>.Alert(аргументы);
 */
Alert = function(o){
	if(Alert.go===undefined) return; //===быстрый общий запрет===

	var alertInner = function(x, xx,a,b,c,d,e){ //x: аргументы (в FF5 - до 7, особенность Firebug для этой версии)
		var aL = arguments.length;
		if(!window.console){
			for(var i =0, args =[]; i < aL; i++)
				args[i] = arguments[i];
			alert(args);
		}else if(console.log.apply)
			console.log.apply(console, arguments);
		else{ //иначе - 5-й FF не умеет понимать console.log.apply
			if(aL ==1) console.log(x);
			else if(aL ==2) console.log(x, xx);
			else if(aL ==3) console.log(x, xx, a);
			else if(aL ==4) console.log(x, xx, a, b);
			else console.log(x, xx, a, b, c, d, e);
		}
	}, hasContext = this !== window
		, context = this;
	if(hasContext && context instanceof String){
		if(!RegExp(Alert.go,'g').test(context)) //===фильтрация по разрешениям===
			return;
		
		for(var i =1, args =[]; i <= arguments.length; i++)
			args[i] = arguments[i -1];
		args[0] = "'"+ context +"':";
		alertInner.apply(window, args); //===console.log с текстовым контекстом на первом месте===

	}else{ //место для кастомизации. Пример с {from:'имя', ...}
		if(Alert.go =='.' || Alert.go =='.*') return; //===запретить обычные алерты===
		if(o && o.from && o.from !=''){ //если в хеше в первом аргументе есть ключ "from", он оформляется особо
			var args =[], j =1;
			for(var i in o)
				if(i !='from'){
					args[j++] = '{'+ i +'}';
					args[j++] = o[i];
				}
			if(arguments.length >1) //разделитель
				args[j++] ='}; ';
			for(var i = 1, aL = arguments.length; i < aL; i++) //вывод следующих аргументов
				args[j++] = arguments[i];
			args[0] = "'"+ o.from +"':";
			alertInner.apply(window, args); //===console.log со значение ключа "from" на первом месте===

		}else
			alertInner.apply(window, arguments); //===обычный console.log===
	}
}
String.prototype.Alert = Alert;
Alert.go =''; //разрешить всё

/**http://www.JSON.org/json2.js, 2011-02-23. See http://www.JSON.org/js.html
 */
// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.
var JSON;
if(!JSON)
	JSON ={};
if(typeof JSON.stringify !=='function'){
	JSON.stringify = function (value, replacer, space){
		var i
			, gap =''
			, indent =''
			, rep = replacer
			, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g
			, meta = {	// table of character substitutions
				'\b': '\\b',
				'\t': '\\t',
				'\n': '\\n',
				'\f': '\\f',
				'\r': '\\r',
				'"' : '\\"',
				'\\': '\\\\'
			};
		if (typeof space ==='number')
			for (i =0; i < space; i++)
				indent +=' ';
		else if (typeof space ==='string')
			indent = space;
		if (replacer && typeof replacer !=='function' && (typeof replacer !=='object'
				|| typeof replacer.length !=='number'))
			throw new Error('JSON.stringify');
		return str('', {'': value});
		function str(key, holder){ // Produce a string from holder[key].
			var i // The loop counter.
				, k // The member key.
				, v // The member value.
				, length
				, mind = gap
				, partial
				, value = holder[key];
			if (value && typeof value ==='object' && typeof value.toJSON ==='function')
				value = value.toJSON(key);
			if(typeof rep ==='function')
				value = rep.call(holder, key, value);
			switch(typeof value){
			case 'string':
				return quote(value);
			case 'number':
				return isFinite(value) ? String(value) :'null';
			case 'boolean':
			case 'null':
				return String(value);
			case 'object':
				if(!value)
					return 'null';
				gap += indent;
				partial =[];
				if(Object.prototype.toString.apply(value) ==='[object Array]'){
					length = value.length;
					for(i =0; i < length; i++)
						partial[i] = str(i, value) ||'null';
					v = partial.length === 0 ?'[]': gap ?
						'[\n'+ gap + partial.join(',\n' + gap) +'\n'+ mind +']' :
						'['+ partial.join(',') +']';
					gap = mind;
					return v;
				}
				if(rep && typeof rep ==='object'){
					length = rep.length;
					for (i =0; i < length; i++) {
						if (typeof rep[i] ==='string') {
							k = rep[i];
							v = str(k, value);
							if(v){
								partial.push(quote(k) + (gap ?': ':':') + v);
							}
						}
					}
				}else
					for(k in value)
						if (Object.prototype.hasOwnProperty.call(value, k)) {
							v = str(k, value);
							if(v)
								partial.push(quote(k) + (gap ?': ':':') + v);
						}
				v = partial.length === 0 ?'{}': gap ?
					'{\n'+ gap + partial.join(',\n'+ gap) +'\n'+ mind +'}' :
					'{'+ partial.join(',') +'}';
				gap = mind;
				return v;
			}
		}
		function quote(string){
			escapable.lastIndex =0;
			return escapable.test(string) ?'"'+ string.replace(escapable, function(a){
				var c = meta[a];
				return typeof c ==='string'? c :'\\u'+ ('0000'+ a.charCodeAt(0).toString(16)).slice(-4);
			}) +'"':'"'+ string +'"';
		}
	};
}
/**
 * http://davidwalsh.name/convert-xml-json : convert XML to JSON; April 5, 2011
 *   (даёт ошибку, не полноценен)
 */
function xmlToJson(xml){
	var obj ={}; // Create the return object
	if(xml.nodeType ==1){ // element
		// do attributes
		if(xml.attributes.length >0){
			obj["@attributes"] ={};
			for(var j =0; j < xml.attributes.length; j++){
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	}else if(xml.nodeType ==3) // text
	obj = xml.nodeValue;
// do children
	if(xml.hasChildNodes()){
		for(var i =0; i < xml.childNodes.length; i++){
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) =="undefined")
				obj[nodeName] = xmlToJson(item);
			else{
				if (typeof(obj[nodeName].length) =="undefined"){
					var old = obj[nodeName];
					obj[nodeName] =[];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};


$(function(){ //=================== ready ======================
	WidgetFomIndexes.startPanel( //создание панели настроек для генерации виджета по настройкам
		[
			{head:'<b>Виджет индексов доверия #1</b>'}
			,{head:'<b>Виджет индексов доверия #2</b>'}
			, {stringed: 1}
		]
		,[
			{borderWidth: 1, arrowsOnGraph: !!1, listSelectRandom: !!1}
			,{height: 303, listLinesInView: 3, listSelectRandom: !!1, dateEdgesOnGraph: !!1}
			,{}
		]);
	WidgetFomIndexes.create({elemSel:'#i2'}); //+простой способ запуска виджета
});
//для тестов без сети
xmlJTest = '<alldata allIndexLink="http://fom.ru/indexes.html" copyCode="&lt;object height=\'323\' width=\'235\'&gt;&lt;param value=\'http://fom.ru/uploads/widget/widgetSlide.swf\' name=\'movie\'&gt;&lt;param value=\'high\' name=\'quality\'&gt;&lt;param value=\'transparent\' name=\'wmode\'&gt;&lt;param value=\'data1=/uploads/files/xml&amp;data0=/uploads/files/index\' name=\'flashvars\'&gt;&lt;embed height=\'323\' align=\'middle\' width=\'235\' pluginspage=\'http://www.macromedia.com/go/getflashplayer\' type=\'application/x-shockwave-flash\' flashvars=\'data1=/uploads/files/xml&amp;data0=/uploads/files/index\' name=\'movie\' src=\'http://fom.ru/uploads/widget/widgetSlide.swf\' wmode=\'transparent\'&gt;&lt;/object&gt;">'
+'<chartData>'
+'	<index name="Medvedev" checked="true" link="http://fom.ru/indexes/indeks-doverija-prezidentu-rfd.-medvedevu.html" titleInx="ДОВЕРИЕ Д. МЕДВЕДЕВУУУУ"/>'
+'	<index name="RostZen" link="http://fom.ru/indexes/dinamika-cen.html" checked="false" titleInx="ДИНАМИКА ЦЕН"/>'
+'	<index name="Putin" link="http://fom.ru/indexes/indeks-doverija-glave-pravitelstva-rf-v.-putinu.html" checked="false" titleInx="ДОВЕРИЕ В. ПУТИНУ"/>'
+'	<index name="RostZen" link="http://fom.ru/indexes/dinamika-cen.html" checked="false" titleInx="ДИНАМИКА ЦЕН"/>'
+'	<index name="Protest" link="http://fom.ru/indexes/uroven-protestnyh-nastroenij.html" checked="false" titleInx="ПРОТЕСТНЫЕ НАСТРОЕНИЯ"/>'
+'	<index name="PrestijRus" link="http://fom.ru/indexes/prestizh-rossii.html" checked="false" titleInx="ПРЕСТИЖ РОССИИ"/>'
+'	<index name="RusEconomica" link="http://fom.ru/indexes/sostojanie-rossijskoj-ekonomiki.html" checked="false" titleInx="РОССИЙСКАЯ ЭКОНОМИКА"/>'
+'	<index name="Pravitelstvo_RF" link="http://fom.ru/indexes/indeks-doverija-pravitelstvu-rf.html" checked="false" titleInx="ДОВЕРИЕ ПРАВИТЕЛЬСТВУ РФ"/>'
+'	<index name="Gos_Duma" link="http://fom.ru/indexes/indeks-doverija-gosudarstvennoj-dume.html" checked="false" titleInx="ДОВЕРИЕ ГОС. ДУМЕ"/>'
+'	<index name="Edinaya_Rossia" link="http://fom.ru/indexes/indeks-doverija-partii-edinaja-rossija.html" checked="false" titleInx="ДОВЕРИЕ «ЕДИНОЙ РОССИИ»"/>'
+'	<index name="Spravedlivaya_Rossia" link="http://fom.ru/indexes/indeks-partii-spravedlivaja-rossija.html" checked="false" titleInx="ДОВЕРИЕ «СПРАВЕДЛИВОЙ РОССИИ»"/>'
+'	<index name="KPRF" link="http://fom.ru/indexes/indeks-doverija-partii-kprf.html" checked="false" titleInx="ДОВЕРИЕ КПРФ"/>'
+'	<index name="LDPR" link="http://fom.ru/indexes/indeks-doverija-partii-ldpr.html" checked="false" titleInx="ДОВЕРИЕ ЛДПР"/>'
+'</chartData>'
+'</alldata>';
csvJTest = 'date;15.11.2009;22.11.2009;29.11.2009;06.12.2009;13.12.2009;20.12.2009;27.12.2009;10.01.2010;17.01.2010;24.01.2010;31.01.2010;07.02.2010;14.02.2010;21.02.2010;28.02.2010;07.03.2010;14.03.2010;21.03.2010;28.03.2010;04.04.2010;11.04.2010;18.04.2010;25.04.2010;16.05.2010;18.05.2010;23.05.2010;30.05.2010;06.06.2010;13.06.2010;20.06.2010;27.06.2010;04.07.2010;11.07.2010;18.07.2010;25.07.2010;01.08.2010;08.08.2010;15.08.2010;22.08.2010;29.08.2010;05.09.2010;12.09.2010;19.09.2010;26.09.2010;03.10.2010;10.10.2010;17.10.2010;24.10.2010;31.10.2010;07.11.2010;14.11.2010;21.11.2010;28.11.2010;05.12.2010;12.12.2010;19.12.2010;26.12.2010;16.01.2011;23.01.2011;30.01.2011;06.02.2011;13.02.2011;20.02.2011;27.02.2011;06.03.2011;13.03.2011;20.03.2011;27.03.2011;03.04.2011;10.04.2011;17.04.2011;24.04.2011;01.05.2011;15.05.2011;22.05.2011;29.05.2011;05.06.2011;12.06.2011;19.06.2011;26.06.2011;03.07.2011;10.07.2011;17.07.2011;24.07.2011;31.07.2011\n'
+'Medvedev;62.5;60.7;61.9;62.2;64.5;62.8;64.7;64.1;64.2;63;64.1;60.4;63.8;62.6;61.8;63.3;62.1;63.2;64.6;66.2;62.7;62.3;62.5;64.9;;64.5;63.1;60.5;62.9;60.6;62.9;62;63.8;61.1;62.9;60.4;62.4;62.3;60.8;63.5;62.5;61.8;62.8;60.2;61.6;63.4;61.7;62.2;64.3;62.6;63;61.5;61.7;64;61.8;62.1;62.1;62.5;62.4;61.6;58;58.8;59.6;60.4;59.4;58.6;57.9;58.7;59.2;56;56.4;56.1;57.2;55.5;55.3;56.4;52.2;56.1;53.5;54.1;54.1;52.7;54;53.9;54.2\n'
+'Putin;67.7;65.2;66.3;67.2;67.9;66;67.8;66.4;67.7;66.4;67.1;63.2;67.2;65.6;65.3;65.5;66.9;66.3;67.2;68.9;66.6;66;66.3;66.8;;68;66.2;63.5;66.1;65.4;66.7;65.5;66.8;65.2;65.4;66.7;66.3;66.9;63.6;67.2;66.6;68.8;66.7;68;65.3;66.6;64.9;64.3;66.6;65.8;64.7;66.6;64.5;69.5;65;66.2;65;66.2;65.3;65.7;62.7;61.6;62.9;63.1;62.8;61.2;61.7;62.3;62.1;59.4;59.8;59.8;60.9;60.2;58.4;59.8;57;59.1;56.7;56.9;57;57.3;57.8;57.8;57.0\n'
+'RostZen;;;87.9;;;;;;89.2;;;;;;90.5;;;;;;87.3;;;;;;;80.1;;;;;;83.4;;;;;90.9;;;92.3;91.1;88.7;90.8;90.6;88.4;;;;;;;92.4;93.1;93.8;;94.2;;;94.9;94.7;95.2;;93.7;93.4;92.7;93.5;93.3;93.4;93.1;93.1;93.2;93.6;91.7;91.7;91.7;90.7;90.8;88.4;88.7;89.9;90.3;;88.3\n'
+'Protest;;;;;;;;;;;;;;;;;30.1;;;;28.3;;;;;29;;;;32;;;;29.2;;;;29.2;;;;29.5;28.4;28.1;;27.6;27.5;26.9;25.9;26.7;29.4;31.3;30.9;29.1;28.6;28.7;28.3;32.6;33.7;32.3;35.6;38.7;39.5;35.7;34;31.9;31.5;32.8;31.6;33.9;31.4;33.8;34.1;32;33.2;33.8;31.6;32.5;32;32.5;32.3;31.8;32.1;29.6;31.4\n'
+'PrestijRus;;;;;;;;;;;;;;;;55.8;;;;;;;63.9;;;;;;;;63;;;;;;;;;;;;;;;;;62.7;;;;;;;;;;;;;;58.3;;;;;;;;;;;55.8;;;;;;;;;;;55.7;\n'
+'RusEconomica;;;;;;;;;;;;;;;;;;;;;;;;;;;;;46.1;;;;47.5;;;;44.2;;;;46.1;;;;46.2;;;;46.5;;;;44.2;;;;44.3;;;;41.9;;;40.2;;;;;;;;;;;;;;;;;;41.9;;;\n'
+'Edinaya_Rossia;;;;;;;;;;;;;;;;;;;55.3;;;;56.5;;;;;53.3;;;;56.1;;;;54.4;;;;58.1;;;;55.6;;;;55;;;;54.8;;;;55.5;;;55;;;;52.5;;;;;;;;47.6;;;;;48.3;47.5;48.5;;;50.2;;52.6;;\n'
+'Spravedlivaya_Rossia;;;;;;;;;;;;;;;;;;47;;;;47.3;;;;;45.5;;;;45.6;;;;44.7;;;;45.9;;;;45.5;;;;43.7;;;;45.1;;;;46.7;;;;;;44.5;;;;;;;;;45;;;;;;;;45.3;;;;;;;\n'
+'KPRF;;;;;;;;;;;;;;;;;42.3;;;43.2;;;;41.4;;;;;42;;;;40.8;;;;39.6;;;;40.2;;;;40.1;;;;42.2;;;;41.8;;;;;40.9;;;;39.4;;;;;;38.4;;;;;;;;41.5;;;;;;;;;\n'
+'LDPR;;;;;;;;;;;;;;;;;;36.6;;;37.2;;;;;39.3;;;;38.6;;;;38.6;;;;36.9;;;;36.1;;;;37.3;;;;37.6;;;;38.9;;;;38.2;;37.7;;;;37.1;;;;;39.6;;;;;;;;38.9;;;;;;;;40.3\n'
+'Pravitelstvo_RF;;;;;;;;;;;;;;;;;;52;;;;;55;;;;;;53.5;;;;;51.3;;;;;53.8;;;;;52.3;;;;;;55.3;;;;;53.8;;;;;;;48.9;;;;;;;49.6;;;;;;;;39.6;;;;;;;;49.6\n'
+'Gos_Duma;;;;;;;;;;;;;;;;;;;41;;;;;;42;;;;;39;;;;;42;;;;;42;;;;;40;;;;;;42;;;;;;;39;;41;;;;;44;;;;;51;;;;;;;;39.6;;;;;;;\n'
+'Sovet_Phederacii;;;;;;;;;;;;;;;;;;;;50;;;;;;50;;;;;48;;;;;49;;;;;49;;;;;48;;;;;;49;;;;;;48;;;45;;;;;;;47;;;;;;;;43.3;;;;;;;;;\n';
