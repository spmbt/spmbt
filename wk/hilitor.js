// Original JavaScript code by Chirp Internet: www.chirp.com.au
// Please acknowledge use of this code by including this header.
// modified by spmbt, 2013-05-18

function Hilitor(el, tag){
	var targetNode = el.attributes && el || document.getElementById(el) || document.body
		,hiliteTag = tag ||'EM'
		,skipTags = new RegExp('^(?:'+ hiliteTag +'|SCRIPT|FORM|SPAN)$')
		,colors =['#ff6','#a0ffff','#9f9','#f9c3c3','#bbe']
		,iColor =0
		,wordColor =[]
		,matchRegex ='';
	this.setRegex = function(input){
		input = input.replace(/^[^\wа-яА-ЯёЁ]+|[^\wа-яА-ЯёЁ]+$/g,'').replace(/[^\wа-яА-ЯёЁ'-]+/g,'|');
		matchRegex = new RegExp('(^|[\\s\.,;:-])('+ input +')([\\s\.,;:-]|$)','i');
	}; // note: \\b + cyrillic is not works
	this.getRegex = function(){
		return matchRegex.toString()//.replace(/^\/[\\s\.,;:-]\(|\)[\\s\.,;:-]\/i$/g,'').replace(/\|/g,' ');
	};
	this.hiliteWords = function(node){ // recursively apply word highlighting
		if(node == null || !node || !matchRegex || skipTags.test(node.nodeName)) return;
		var count =0;
		if(node.hasChildNodes())
			for(var i =0, nL = node.childNodes.length; i < nL; i++){
				var h = this.hiliteWords(node.childNodes[i]);
				count += h.count ||0;
				if(h && h.nodeAdd){ nL += h.nodeAdd; i++; } //(добавилось 1-2 ноды)
			}
		if(node.nodeType ==3 && (nv = node.nodeValue) && (regs = matchRegex.exec(nv)) ){ // NODE_TEXT
			if(!wordColor[regs[2].toLowerCase()])
				wordColor[regs[2].toLowerCase()] = colors[iColor++ % colors.length];

			var match = document.createElement(hiliteTag);
			match.appendChild(document.createTextNode(regs[2]));
			match.style.backgroundColor = wordColor[regs[2].toLowerCase()];
			match.style.fontStyle ='inherit';
			match.style.color ='#000';

			var after = node.splitText(regs.index + regs[1].length);
			after.nodeValue = after.nodeValue.substring(regs[2].length);
			node.parentNode.insertBefore(match, after);
			return {count: count +1, nodeAdd: 2};
		}else return {count: count, nodeAdd: 0};
	};
	this.remove = function(){ // remove highlighting
		var arr = document.getElementsByTagName(hiliteTag);
		while(arr.length && (el = arr[0]))
			el.parentNode.replaceChild(el.firstChild, el);
	};
	this.apply = function(input){ // start highlighting at target node
		if(!input) return;
		this.remove();
		this.setRegex(input);
		return this.hiliteWords(targetNode).count;
	};
}