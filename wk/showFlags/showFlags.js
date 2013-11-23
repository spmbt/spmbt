//show flags by countries, mash-up; &copy; spmbt, 2011.

if(document.addEventListener)
	document.addEventListener('DOMContentLoaded', load, !1);
else if(window.attachEvent)
	window.attachEvent('onload', load);
var ver2 =1;//версия 2 - без использования 1-го спрайта 1568279_432x297.png
function initFlagsTable(){
	var isIE = document.all && !window.opera;
	var container = document.createElement('DIV');
	container.style.cssText ='float: left; margin-top: 50px; background: #f2f2f2; padding: 0 12px 6px 0; text-align: center;';
	frames['ifr'].document.body.appendChild(container);
	var d = document.createElement('DIV');
	var dSCT = ver2 ?'':'background-image: url(1568279_432x297.png);';
	dSCT += 'width: 16px; height: 11px;  display: inline-block; margin-top: 6px; margin-left: 12px; *display: inline; *font-size: 1px;';
	if(ver2) dSCT +='background-image: url(fg.png); background-color: #fcfcfc; height: 9px;';
	d.style.cssText = dSCT;
	//'a'.charCodeAt()==97
	var und ='<i style="color:#'+(isIE?'999':'bbb')+';">'+(isIE?'-':'_')+'</i>';
	for(var j=0; j < 27; j++){
		var dLine = document.createElement('DIV');
		dLine.style.whiteSpace ='nowrap';
		for(var i =0; i < 27; i++){
			var dd = d.cloneNode(!1);
			if(!ver2)
				dd.style.backgroundPosition = '-'+ j*16 +'px -'+ i*11 +'px';
			var abbr = String.fromCharCode(96+ j, 96+ i);
			for(var k=0, l=fg.length, s=''; k < l; k++){
				if(abbr == fg[k][0].toLowerCase()){
					s = fg[k][2];
					break;
				}
			}
			if(i!=0 && j!=0)
				dd.title = abbr +(s ? ', '+s:'');
			else
				if(ver2){
					dd.innerHTML = i==0 && j!=0 && String.fromCharCode(96+j) + und || !j && i && und + String.fromCharCode(96+i) ||'';
					dd.style.fontSize ='12px';
					dd.style.lineHeight ='1.1';
				}
			if(ver2)
				if(s)
					dd.style.backgroundPosition = '0 -'+ k*9 +'px';
				else
					if(i!=0 && j!=0) {dd.style.background = 'none'; dd.style.backgroundColor ='#fcfcfc';}
					else dd.style.background = 'none';
			if(dd.addEventListener)
				dd.addEventListener('click', function(){
					location.hash = this.title.replace(/,.+/,'');
				}, !0);
			else if(dd.attachEvent)
				dd.attachEvent('onclick', function(ev){
					var dFlagList = document.querySelector('.flagList');
					location.hash = ev.srcElement.title.replace(/,.+/,'');
					dFlagList.style.height ='43px';
					setTimeout(function(){dFlagList.style.height ='42px';},200);
				});
			dLine.appendChild(dd);
		}
		container.appendChild(dLine);
	}
}
reInit = function(){ver2 =0;frames['ifr'].document.body.innerHTML=''; initFlagsTable();}
function load(){
	
initFlagsTable(); // ver2==0 - таблица флагов (из скайповского спрайта, http://habrahabr.ru/blogs/skype/47356/ )

if(!document.querySelector) //местный хак для IE
	document.querySelector = function(clss){
		for(var i =0, elems = document.getElementsByTagName('*'); i < elems.length; i++)
			if(RegExp(clss.replace(/\./,'')).test(elems[i].className))
				return elems[i];
	}
var dList = document.querySelector('.list');
var dItemXmp = document.querySelector('.xmp');

//плавающий блок со списком ссылок (от http://artpolikarpov.ru/flags/ )

var dFlagList = document.querySelector('.flagList'); //хак вместо :hover для IE
if(dFlagList.attachEvent && !window.opera){
	dFlagList.attachEvent('onmouseover', function(){
		if(window.ww) clearTimeout(ww);
		dFlagList.style.height ='33%';
		dFlagList.style.filter = 'none';
	});
	dFlagList.attachEvent('onmouseout', function(){
		ww = setTimeout(function(){
			dFlagList.style.height ='42px';
			dFlagList.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=78)';
		},400);
	});
}
if(window.opera){ //...иначе Опера сбрасывает положение якоря
	dFlagList.addEventListener('mouseout', function(){
		wwo = setTimeout(function(){if(location.hash) location.hash = location.hash;}, 300);
	}, !1);
	dFlagList.addEventListener('mouseover', function(){
		if(window.wwo) clearTimeout(wwo);
	}, !1);
}
var len = fg.length; //число изображений в спрайте
var wiki = 'http://ru.wikipedia.org/wiki/'
	, wikiEn = wiki.replace(/ru/,'en');
for(var i=0; i < len; i++){
	var dItem = document.createElement('DIV'); //элемент списка
	var dd = dItemXmp.cloneNode(!0);
	dList.appendChild(dd);

	if(!dd.querySelector) //жёсткий хак для IE
		dd.querySelector = function(clss){
			var elems = dd.getElementsByTagName('*');
			if(clss=='.flag') return elems[1];
			if(clss=='a[name]') return elems[0];
			if(clss=='.nameRu a') return elems[4];
			if(clss=='.nameEn a') return elems[6];
			if(clss=='.nameShort') return elems[2];
		}
	dd.querySelector('.flag').style.backgroundPosition = '0 -'+ i*9 +'px';
	dd.querySelector('a[name]').setAttribute('name', fg[i][0]);
	dd.querySelector('a[name]').id = fg[i][0];
	dd.querySelector('.nameShort').innerHTML = fg[i][0];
	dd.querySelector('.nameRu a').href = wiki + (flagLinkCorrect(i) || fg[i][2]);
	dd.querySelector('.nameRu a').innerHTML = fg[i][2];
	dd.querySelector('.nameEn a').href = wikiEn + fg[i][1];
	dd.querySelector('.nameEn a').innerHTML = fg[i][1];
	dd.querySelector('.nameRu a').onclick =
		dd.querySelector('.nameEn a').onclick = function(){
			location.hash = this.parentNode.parentNode.firstChild.id
				|| this.parentNode.parentNode.firstChild.nextSibling.id; //чтобы в закрытом flagList было видно вызванное название
			frames['ifr'].location = this.href;
			document.querySelector('.underWrite').style.display ='none';
			document.querySelector('.backLink').style.display ='block';
			return!1;
		};
	dd.style.display = 'block';
}

function flagLinkCorrect(name){
	var val, corr ={
		ax: "Аландские острова"
		, cd: "Демократическая Республика Конго"
		, cm: "Республика Кипр"
		, fk: "Фолклендские острова"
		, ht: "Республика Гаити"
		, hm: "Остров Херд и Острова Макдоналд"
		, ky: "Каймановы острова"
		, sj: "Шпицберген и Ян-Майен"
		, um: "Внешние малые острова США"
		, va: "Ватикан"
		, tf: "Французские Южные и Антарктические территории"
	};
	for(var i in corr)
		if(name == corr[i][0]){ val = corr[i]; break;}
	return val;
}

}
