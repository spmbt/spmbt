<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
<html><head>
	<meta http-equiv="x-ua-compatible" content="IE=7" />
</head><body>
<style>
	dt{width: 350px; margin-bottom: 2px; padding: 2px 6px; background: #eee;}
	dd{width: 450px; margin-bottom: 12px; padding: 2px 6px; background: #eef;}
</style>
	<comment>View dynamical HTML through F12 for wiew XML results of transformations</comment>
	<dl>
		<xsl:for-each select="/params/param">
			<dt><xsl:value-of select="@name" disable-output-escaping="yes"/></dt>
		<dd><xsl:call-template name="paramGetValue">
				<xsl:with-param name="value">
		<xsl:value-of select="@value" disable-output-escaping="yes"/>
				</xsl:with-param>
			</xsl:call-template>
		</dd>
		</xsl:for-each>
	</dl>
</body></html>
</xsl:template>

<xsl:template name="paramGetValue">
	<xsl:param name="value"/>
	<xsl:value-of select="$value"/>
</xsl:template>
</xsl:stylesheet>
