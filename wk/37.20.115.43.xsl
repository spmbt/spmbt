<?xml version="1.0"?>
<!DOCTYPE html>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
<html>
	<head><title>Someone Log, page <xsl:value-of select="/ha/page"/></title>
	<meta http-equiv="x-ua-compatible" content="IE=8" />
	<style>
body{
	margin: 0 20px;
	font: 12px verdana,Helvetica,Tahoma,Arial,sans-serif;
	background: #f5f5f5}
table.tb1{
	width: 100%;
	overflow: hidden;
	max-width: 980px;
	border-collapse: collapse;
	box-shadow: 0 0 5px #ccc;
	background: #fff}
.tb1 tr:hover td{background: #f0f3f5}
.tb1 th{background:#9acd32}
.tb1 td,.tb1 th{
	max-width: 300px;
	padding: 7px 1px;
	font-size: 12px;
	white-space: nowrap}
.tb1 td{
	text-overflow: ellipsis;
	padding: 2px 3px 3px;
	text-align: center;
	border-bottom: 1px solid #eee}
.tb1 td.leftJust{text-align: left}
.tb1 a{
	padding: 0 3px;
	color:#1A3DC1}
.tb1 td:hover a{
	display: inline-block;
	position: relative;
	z-index: 2;
	background: #f5f5f5;
	color: #f00}
.tb1 td:not(.UA){overflow: hidden;}
.tb1 td:hover:not(.UA){
	overflow: inherit;
}
/*.tb1 td.agent{padding-bottom: 0; font-size: 10px; font-style: italic; color: #88b}*/
.tb1 .true{color: #b33}
.tb1 .false{color: #bbb}
.tb1 .help{cursor:text}
.tb1 .help{position: relative;}
.tb1 .help .full{
	display: none;
	position: absolute;
	width: 1px;
	text-align: center;
	background: #f5f5f5}
.tb1 .help:hover .full{display: block}
.tb1 .help .full .fullRel{
	position: relative;
	width: 1000px;
	margin: auto 0;
	left:-420px}
.tb1 .help .full span{
	position: relative;
	left:-3px;
	padding: 0 12px 0 3px;
	border:1px solid #ddd;
	background: #eee}
.tb1 .UA:hover .brief{visibility: hidden}
.tb1 .help.leftJust .full span{color:#c33; background: #f3e8e8}
.tb1 .agent,
.tb1 th .n{color:#a33}

.account-1 td{background: #cfc; border-color: #bfb}
.account-2 td{background-color: #ebedf2}
.account-3 td{background: #ffc; border-color: #ffb}
.account-4 td{opacity: 0.14; filter: alpha(opacity=17);}
.account-4:hover td{opacity: 1; filter: none;}

.pagination{
	position: fixed;
	left: 5px; top: 4px;
	margin: 0;
	padding: 1px 10px 2px;
	box-shadow: 0 0 5px #ccc;
	background:#fff;
	opacity: 0.412; filter: alpha(opacity=15);}
.pagination:hover{
	white-space: nowrap;
	transition: opacity 0.5s;
	opacity: 1; filter: none;}
.pagination span{margin: 0;}
.pagination span a{padding: 5px 12px; border-radius: 4px;}
.pagination span.active1{padding: 1px 0 2px; background-color: #f6e8e8;}
.pagination span.gaps{background-color: #e8e8e8;}
.pagination span a.ellip{padding: 5px 2px; text-decoration: none;}
.pagination span a:hover{background-color: #e0e6f2}
.pagination .active1 a{color: #d33; text-decoration:none; font-weight:bold}
}
<xsl:for-each select="/ha/actions/action">
	.tb1.<xsl:value-of select="fileName"/>:hover tr.<xsl:value-of select="fileName"/> td{background-color: #f3e6e8; opacity:1; filter: none;}
		.tb1.<xsl:value-of select="fileName"/>:hover td.<xsl:value-of select="fileName"/>{color: #e33}
</xsl:for-each>
		</style>
		<script type="text/javascript">
var IE = +!!document.all
	,listen = ['addEventListener','attachEvent'][IE]
	,target = ['target','srcElement'][IE]
	,on = ['','on'][IE];
window[listen](on +'load', function(){

	var tb1 = document.getElementById('tb1');
	tb1[listen](on +'mousemove', function(ev){
		var tC = ev[target].className, fN;
		if(/fileName/.test(tC) &amp;&amp; !RegExp(fN = tC.replace(/fileName /,'')).test(this.className))
			this.className ='tb1 '+ fN;
	},!1);
	tb1[listen](on +'mouseout', function(ev){
		var tC = ev[target].className;
		if(/fileName/.test(tC) )
			this.className ='tb1';
	},!1);

if(!IE){

var $q = function(q, el){return (el || document).querySelector(q)}
,$qA = function(q, el){return (el || document).querySelectorAll(q)}
,uaA = $qA('.help.UA');
if(uaA.length){
	for(var i in uaA){ var uI = uaA[i]; if(uI.attributes){
		var ua = $q('.agent', uI).innerHTML
			,brow = (function(ua){
				var s ='';
				if(/Chrome/.test(ua)){
					var a = ua.match(/Chrome\/([\d\.]+)/);
					if(a)
						s ='Ch'+ a[1];
				}else if(/KHTML, like Gecko/.test(ua)){
					var a = ua.match(/Version\/([\d\.]+)/);
					if(a)
						s = (/Android/.test(ua) ?'Webk':'Saf') + a[1];
					else{
						a = ua.match(/Mobile\/([\d\w]+)/);
						if(a)
							s ='SafMob'+ a[1];
						else{
							a = ua.match(/(KHTML, like Gecko.*)/);
							s = a[1];}}
				}
				if(/Opera/.test(ua)){
					var a = ua.match(/Version\/([\d\.]+)/);
					if(a)
						s ='Op'+ a[1];
					else{
						a = ua.match(/Opera\/([\d\w]+)/);
						if(a)
							s ='Op'+ a[1];
						else{
							a = ua.match(/(Opera.*)/);
							s = a[1];}}
				}
				if(/MSIE/.test(ua)){
					var a = ua.match(/MSIE ([\d\.]+)/);
					if(a)
						s ='Ie'+ a[1];
					else{
						a = ua.match(/(MSIE.*)/);
						s = a[1];}
				}
				if(/Konqueror/.test(ua)){
					var a = ua.match(/Konqueror\/([\d\.]+)/);
					if(a)
						s ='Konq'+ a[1];
					else{
						a = ua.match(/(Konqueror.*)/);
						s = a[1];}
				}
				if(/Firefox/.test(ua)){
					var a = ua.match(/Firefox\/([\d\.]+)/);
					if(a)
						s ='Fx'+ a[1];
					else{
						a = ua.match(/(MSIE.*)/);
						s = a[1];}
				}
				var sua = s.replace(/(\.0)+$|\.\d+\.\d+(\.\d+)?$/,'') || ua;
				return sua + (/compat/.test(ua) &amp;&amp; !/MSIE/.test(ua) ?' --- compat':'');
			})(ua)
			, os = (function(ua){
					var s ='';
					if(/Macintosh/.test(ua)){
						var a = ua.match(/Mac OS X ([\d\._]+)/);
						if(a)
							s ='Mac'+ a[1];
						else{
							a = ua.match(/Macintosh(.*)/);
							s ='Mac '+ a[1];}
					}
					if(/Android/.test(ua)){
						var a = ua.match(/Android ([\d\._]+)/);
						if(a)
							s ='Android '+ a[1];
						else if(/Opera Mini/.test(ua)){
							a = ua.match(/(Android.*)/);
							s = 'Android Opera Mini';}
						else{
							a = ua.match(/(Android.*)/);
							s = a[1];}
					}
					if(/iPhone|iPad|iPod/.test(ua)){
						var a = ua.match(/(iPhone|iPad|iPod)([^\d]+)([\d\._]+)/);
						if(a)
							s = a[1] +' '+ a[3];
						else{
							a = ua.match(/((iPhone|iPad|iPod).*)/);
							s = a[1];}
					}
					if(/Windows/.test(ua)){
						var a = ua.match(/Windows ([^\d]+)([\d\.]+).+?(\d{1,2})/)
							, ver ={"6.2":"8"
								,"6.1":"7"
								,"6.0":"Vist"
								,"5.2":"2K3"
								,"5.1":"XP"
								,"5.0":"2K"
								,"4.0":"NT4"};
						if(a)
							s ='Win'+ (/NT/.test(a[1]) &amp;&amp; a[2]
								? ver[a[2].substr(0,3)] + (a[3]==64 ?'-'+a[3]:'')
								: /Phone/.test(a[1])
									? 'Win '+ a[1] + a[2]
									: a[0]
							);
						else{
							a = ua.match(/Windows(.*)/);
							s ='Win '+ a[1];}
					}
					if(/Linux/.test(ua) &amp;&amp; s==''){
						var a = ua.match(/Linux.+?86_?(\d*)/);
						if(a)
							s ='Lin'+ (/Ubuntu/.test(ua) ?'-Ubu':'') + (a[1] ||'32');
						else{
							a = ua.match(/(Linux.*)/);
							s ='Lin: '+ua;}
					}
					return s;
				})(ua)
			, uaBr = $q('.brief', uI);

		uaBr.innerHTML += ' &amp;nbsp; '+ brow.substr(0,15) +', '+ os.substr(0,15);
	}}
}

}

},!1);

		</script>
</head>
<body>
	<table class="tb1" id="tb1">
		<tr>
			<th>ip + <span class="n">#</span></th>
			<th>path</th>
			<th>browser</th>
			<th>accType</th>
			<th>fileName</th>
			<th>settings</th>
			<th>date</th>
		</tr>
		<xsl:for-each select="/ha/actions/action">
			<tr class="account-{accountType} {fileName}">
				<td class="help leftJust" title2="{@id}">
					<div class="full">
						<span><xsl:value-of select="@id"/></span>
					</div>
					<div class="brief"><xsl:value-of select="ip"/></div>
				</td>
				<td class="leftJust"><a href="http://habrahabr.ru{path}" target="_blank">
					<xsl:value-of select="path"/>
				</a></td>
				<td class="help UA" title2="{agent}" align="center">
					<div class="full">
						<div class="fullRel">
							<span class="agent"><xsl:value-of select="agent"/></span>
						</div>
					</div>
					<div class="brief"><xsl:value-of select="browser"/></div>
				</td>
				<td><xsl:value-of select="accountType"/></td>
				<td class="fileName {fileName}"><xsl:value-of select="fileName"/></td>
				<td>
					<span class="{settings/property/@value}">
						<xsl:value-of select="settings/property/@name"/>
					</span>
				</td>
				<xsl:variable name="dt" select="date"/>
				<td><span title="{substring($dt,1,10)}">
					<xsl:value-of select="substring($dt,12,10)"/>
				</span></td>
			</tr>
			<!--tr>
				<xsl:variable name="ag" select="agent"/>
				<td title="{agent}" class="agent" colspan="6" align="right"><xsl:value-of select="concat(substring($ag,1,10),' ...',substring($ag,string-length($ag)-6,7))"/></td>
			</tr-->
		</xsl:for-each>
	</table>
	<div class="pagination">
		Страницы:
		<xsl:variable name="p" select="/ha/page"/> <xsl:comment>текущая страница</xsl:comment>
		<xsl:variable name="nL" select="11"/> <xsl:comment>сколько ссылок в пагинаторе</xsl:comment>
		<xsl:variable name="pLast" select="/ha/pageLast"/> <xsl:comment>последняя (если есть; а если нет, то здесь будет пустая строка)</xsl:comment>
		<xsl:variable name="url"><xsl:if test="string-length($pLast) !=0">last.xml?</xsl:if><xsl:if test="string-length($pLast) =0">#</xsl:if>page=</xsl:variable>

		<xsl:variable name="pn2" select="$p - floor($nL div 2)"/>
		<xsl:if test="$pn2 &gt; 1">
			<span class="">
				<a href="{concat($url, 1)}">1</a>
				<xsl:if test="$pn2 &gt; 2">
					<a class="ellip" title="{floor(($pn2 +1) div 2)}" href="{concat($url, floor(($pn2 +1) div 2) )}">...</a>
				</xsl:if>
			</span>
		</xsl:if>

		<xsl:call-template name="paginate">
			<xsl:with-param name="i" select="$p"/>
			<xsl:with-param name="nLinks" select="$nL"/>
			<xsl:with-param name="pLast" select="$pLast"/>
			<xsl:with-param name="url" select="$url"/>
		</xsl:call-template>

		<xsl:if test="string-length($pLast) =0">
			<xsl:variable name="nL2" select="5"/>
			<xsl:variable name="step" select="10"/>
			<xsl:call-template name="paginate">
				<xsl:with-param name="i" select="floor(($p + $nL + $step +1) div $step) * $step + floor($nL2 div 2)"/>
				<xsl:with-param name="nLinks" select="$nL2"/>
				<xsl:with-param name="pLast" select="$pLast"/>
				<xsl:with-param name="step" select="$step"/>
				<xsl:with-param name="url" select="$url"/>
				<xsl:with-param name="class" select="'gaps'"/>
			</xsl:call-template>
		</xsl:if>

		<xsl:variable name="pp2" select="$p + floor(($nL -1) div 2)"/>
		<xsl:if test="$pp2 &lt; $pLast">
			<span class="">
				<xsl:if test="$pp2 &lt; $pLast -1">
					<a class="ellip" title="{$pLast - floor(($pLast - $pp2) div 2)}" href="{concat($url, $pLast - floor(($pLast - $pp2) div 2) )}">...</a>
				</xsl:if>
				<a href="{concat($url, $pLast)}"><xsl:value-of select="$pLast"/></a>
			</span>
		</xsl:if>

	</div>
</body>
</html>
</xsl:template>

<xsl:template name="paginate">
	<xsl:param name="i" select="1"/>
	<xsl:param name="nLinks"/>
	<xsl:param name="pLast"/>
	<xsl:param name="step" select="1"/>
	<xsl:param name="to" select="$i + $nLinks"/>
	<xsl:param name="url"/>
	<xsl:param name="class"/>
	<xsl:param name="count" select="1"/>
	<xsl:param name="stop" select="50"/>
	<xsl:variable name="n2" select="floor($nLinks div 2)"/>
	<xsl:if test="($i &lt; $to or $count &lt;= $nLinks) and $stop &gt; 0">
		<xsl:if test="$i - $n2 &gt;= 1 and $i - $n2 &lt;= $pLast or $i - $n2 &gt;= 1 and string-length($pLast) =0">
			<span class="{concat($class,' active', number($i = $to - ceiling($nLinks div 2)))}">
				<a href="{concat($url, $i - $n2)}">
					<xsl:value-of select="$i - $n2"/>
				</a>
			</span>
		</xsl:if>
		<xsl:call-template name="paginate">
			<xsl:with-param name="i" select="$i + $step"/>
			<xsl:with-param name="to" select="$to"/>
			<xsl:with-param name="nLinks" select="$nLinks"/>
			<xsl:with-param name="pLast" select="$pLast"/>
			<xsl:with-param name="step" select="$step"/>
			<xsl:with-param name="url" select="$url"/>
			<xsl:with-param name="class" select="$class"/>
			<xsl:with-param name="count" select="$count + number($i - $n2 &gt;= 1 and $i - $n2 &lt;= $pLast or $i - $n2 &gt;= 1 and string-length($pLast) =0)"/>
			<xsl:with-param name="stop" select="$stop - 1"/>
		</xsl:call-template>
	</xsl:if>
</xsl:template>
</xsl:stylesheet>

