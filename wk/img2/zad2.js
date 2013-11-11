

//colorSel
colorSelPosY=-40;
colorSelPosX=-360;

colorSelMDown=0;
IE=document.all;

color_over=function(e,t){
	if(t==null){ //2-й параметр - 2-€ функци€, установление цвета объекта
		var t=d.all?event.srcElement:e.target;
		if(t.tagName!='TD') return;  //отсечка не-€чеек
	}
	var colr=t.style.backgroundColor;
  g('cTableExample').style.backgroundColor = colr;  //дл€ цветов, заданных в стиле
  if(colr.search('rgb')>=0){
  	var aa=colr.match(/\d+/g);
  	colr="#"+(aa[0]<16?'0':'')+Number(aa[0]).toString(16)+(aa[1]<16?'0':'')
  	+Number(aa[1]).toString(16)+(aa[2]<16?'0':'')+Number(aa[2]).toString(16);
  }
  return g('cTableValue').innerHTML = colr.toUpperCase();
}
color_click=function(e){
	g('colorButton').style.backgroundColor = color_over(e);
	g('colorSel').style.display='none';
}
color_del=function(e){
	g('colorButton').style.backgroundColor = g('cTableExample').style.backgroundColor = '';
	g('colorSel').style.display='none';
}
color_select=function(t){ //вызов таблицы выбора цветов
	g('colorSel').style.display='block';t.blur();
	color_over(t,t); //ставитс€ текущий цвет объекта
}


colorSelAddE=function(evS,f){var f0;
  colorSelF=typeof(f0=eval(evS))=='function'?new Function('ev','('+f0.toString()+')(ev);('+f.toString()+')(ev)'):f;
  eval(evS+'=colorSelF;');
return f;}
DBTop=function(){return IE?Math.max(document.body.scrollTop,document.documentElement.scrollTop):pageYOffset}
DBLeft=function(){return IE?Math.max(document.body.scrollLeft,document.documentElement.scrollLeft):pageXOffset}
colorSelAddE('document.onselectstart',colorSelAddE('document.ondragstart',function(){ //cancel for IE
  var t=event.srcElement;
  if(t.id=="colorTableTop"||t.parentNode.id=="colorTableTop"||t.parentNode.parentNode.id=="colorTableTop")event.returnValue=!1;
}));
colorSelDrag=function(ev,t){
  if(!IE)ev.preventDefault();  //prevent "dragstart" for FF
  var t1=t.parentNode; //layer for drag
  colorSelPosY=(IE?event.y+DBTop():ev.pageY)-parseInt(t1.style.top);
  colorSelPosX=(IE?event.x+DBLeft():ev.pageX)-parseInt(t1.style.left);    //start point of caoture
  colorSelMDown=t1;
}
colorSelAddE('document.onmousemove',function(ev){if(!colorSelMDown)return;
	colorSelMDown.style.top=(!IE?ev.pageY:event.y+DBTop())-colorSelPosY+'px';
	colorSelMDown.style.left=(!IE?ev.pageX:event.x+DBLeft())-colorSelPosX+'px'; 
});
colorSelAddE('document.onmouseup',function(){  if(colorSelMDown){
	t=g('colorSel');
	t.style.top=colorSelMDown.style.top;
	colorSelPosY=DBTop()-parseInt(colorSelMDown.style.top);
	colorSelPosX=DBLeft()-parseInt(colorSelMDown.style.left);
	t.style.left=parseInt(colorSelMDown.style.left)+'px';
	colorSelMDown=0;
}});



















