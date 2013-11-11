d=document;
g=function(X){return document.getElementById(X);}
ieOp=d.all;
isGecko = !document.attachEvent; 
ww=wwUpper=0;
var wwDiv, wwUpperTd;
menuOver=function(e){
	var srcEl=ieOp?e.srcElement:e.target;
	var upperTd=srcEl;
	var inMenuSub=0;
	var subSubDiv;
	while(upperTd.tagName && upperTd.tagName != 'TD'){
	if(upperTd.tagName=='TABLE')return;
		if(upperTd.className=='menuSub')inMenuSub=1;
		if(upperTd.className.search('menuSubSub')>=0)subSubDiv=upperTd;
		upperTd=upperTd.parentNode;
	} //найдена яч.табл
	var uid=upperTd.id
	var uidSub=g(uid+'Sub');
	if(e.type=='click'){ //вывод пункта меню по клику. (Возможны другие действия по клику)
		if(subSubDiv){
			var ii=subSubDiv.childNodes.length;
			for(var i=0;i<ii;i++)
				if(upperTd.childNodes[i].tagName && upperTd.childNodes[i].tagName=='DIV')break;
			g('top2span').innerHTML=subSubDiv.childNodes[i].innerHTML;
		}
		else{
			var ii=upperTd.childNodes.length;
			for(var i=0;i<ii;i++)
				if(upperTd.childNodes[i].tagName && upperTd.childNodes[i].tagName=='DIV')break;
			var jj=upperTd.childNodes[i].childNodes.length;
			for(var j=0;j<jj;j++)
				if(upperTd.childNodes[i].tagName && upperTd.childNodes[i].childNodes[j].tagName=='SPAN')break;
			g('top2span').innerHTML=upperTd.childNodes[i].childNodes[j].innerHTML;
		}
		return;
	}	
	if(e.type=='mouseover'){
		if(inMenuSub)clearTimeout(ww);
		else {clearTimeout(ww),clearTimeout(wwUpper);}
		if(wwDiv)wwDiv.style.display='none';
		if(wwUpperTd){
			wwUpperTd.style.backgroundColor='transparent';
			wwUpperTd.style.color='white';
		}
		if(uid!='menu5'){
			if(!inMenuSub){
				upperTd.style.backgroundColor='white';
				upperTd.style.color='black';
			}else{
				if(subSubDiv){
					subSubDiv.style.backgroundColor='#2597bd';
					subSubDiv.style.color='white';
				}
			}
			if(uidSub)uidSub.style.display='block';
		}
	}else{
		clearTimeout(ww),clearTimeout(wwUpper);
		if(subSubDiv){
			subSubDiv.style.backgroundColor='white';
			subSubDiv.style.color='black';
		}
		wwDiv=uidSub;
		wwUpperTd=upperTd;
		ww=setTimeout(function(){
			if(wwDiv)wwDiv.style.display='none';
		},500);
		wwUpper=setTimeout(function(){
			wwUpperTd.style.backgroundColor='transparent';
			wwUpperTd.style.color='white';
		},500);
	}
}
onresize=
onload=function(){
	g('body1_1').style.height=(ieOp?document.documentElement.clientHeight :innerHeight)
		-parseInt(g('top1_1').offsetHeight)
		-parseInt(g('top2').offsetHeight)
		-parseInt(g('top3').offsetHeight)
		-parseInt(g('bottom1').offsetHeight)-39+'px';
	g('body1_1').style.width=parseInt(g('top3').offsetWidth)-19+'px';
	//if(self.opera)g('body1tb').style.width=g('body1_1').offsetWidth-40+'px';
}