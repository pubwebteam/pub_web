<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="com.pubweb.framework.session.SessionUser"%>
<%  
String path = request.getContextPath(); 
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
SessionUser currentUser = SessionUser.get(request);
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%-- <script type="text/javascript" src="<%=basePath%>js/jquery/2.1.4/jquery-2.1.4.min.js"></script> --%>
<script type="text/javascript" src="<%=basePath%>js/jquery/1.11.3/jquery-1.11.3.min.js"></script>
<script type="text/javascript" src="<%=basePath%>js/ext-6.2.0/build/ext-all.js"></script>
<%-- <script type="text/javascript" src="<%=basePath%>js/ext-6.2.0/build/ext-all-debug.js"></script> --%>
<%-- <script type="text/javascript" src="<%=basePath%>js/ext-6.2.0/ext-bootstrap.js"></script> --%>
<script type="text/javascript" src="<%=basePath%>js/ext-6.2.0/build/classic/locale/locale-zh_CN.js"></script>
<script type="text/javascript" src="<%=basePath%>js/pub_web/util.js"></script>

<link rel="stylesheet" type="text/css" href="<%=basePath%>js/ext-6.2.0/build/classic/theme-triton/resources/theme-triton-all.css" />
<%-- <link rel="stylesheet" type="text/css" href="<%=basePath%>js/ext-6.2.0/build/classic/theme-triton/resources/theme-triton-all-debug.css" /> --%>
<link rel="stylesheet" type="text/css" href="<%=basePath%>js/ext-6.2.0/build/classic/theme-triton/extfix.css" />
</head>
<body>

</body>

<script type="text/javascript">
	var path = '<%=path%>';
	var basePath = '<%=basePath%>';
</script>

</html>