<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%  
String path = request.getContextPath(); 
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="initial-scale=1.0, user-scalable=no">
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;" name="viewport" />
<script type="text/javascript" src="jquery-1.11.3.min.js"></script>

<script type="text/javascript" src="ajaxpost.js"></script>
<script type="text/javascript" src="date_func.js"></script>
<script type="text/javascript" src="index.js"></script>

<link rel="stylesheet" href="../../js/swiper-3.4.1/css/swiper.css">
<script src="../../js/swiper-3.4.1/js/swiper.jquery.min.js"></script>

<script type="text/javascript">
	var path = '<%=path%>';
	var basePath = '<%=basePath%>';
</script>

<style type="text/css">
body{
	font-family: 'Helvetica Neue',Helvetica,STHeiti,'Microsoft YaHei',Arial,Verdana,sans-serif;
	-webkit-text-size-adjust: 100%!important;
	margin: 0 auto;
	padding: 0;
	min-height: 100%;
	background-repeat:no-repeat;
	background-size:cover;
	background-attachment: fixed;
}

.box{
position:absolute;
top:0;
bottom:0;
left:0;
right:0;
background:#000;
opacity:0.3;
}

.xin_table{
margin-left:10%;
width:80%;
margin-right:10%;
margin-top:15px;
height:250px;
}

 .swiper-slide{
     text-align:center;
     font-size:18px;
     display:flex;
     justify-content:center;
     align-items:center;
     background:#F2F2F2;
 }

.news-list{margin-top:5px;overflow:hidden;}
.news-list li{height:28px;margin:0;display:block;overflow:hidden;width:100%}
.news-list .dots{float:left;line-height:40px;font-size:18px;width:4%;font-weight:bold;color:#777;}
.news-new{line-height:20px;float:left;text-align:right;width:32px;height:20px;color:#fff;text-indent:9999px;overflow:hidden;display:block;background-image:url(images/new-icon.png);margin:5px 0}
.news-time{line-height:40px;float:right;width:18%;font-size:14px;text-align:right;margin-right:2%;}
.news-process{line-height:20px;margin-top:10px;float:right;width:18%;font-size:14px;text-align:center;margin-right:2%;background-color:red;color:white;}
.news-list li a{float:left;width:76%;line-height:40px;display:block;overflow:hidden;word-break:keep-all;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#777;text-decoration:none;}
.news-list a:hover{text-decoration:underline;color:#333333;}
.tcolor{
	color:#ffc954;	
}
</style>
<title></title>
</head>
<body>
<div id="main" data-role="page">
	
	<table id='tshow' style='display:none;position:absolute;width:160px;border:0;border-collapse:collapse;border-spacing:0;color:black;z-index:1000;background-color:white;opacity:1;'>
		<tr style='border:1px solid rgba(0,0,0,0.1);height:28px;'><td align='center'>市局主页市局主页</td></tr>
		<tr style='border:1px solid rgba(0,0,0,0.1);height:28px;'><td align='center'>组织机构组织机构</td></tr>
		<tr style='border:1px solid rgba(0,0,0,0.1);height:28px;'><td align='center'>信息报送信息报送</td></tr>
		<tr style='border:1px solid rgba(0,0,0,0.1);height:28px;'><td align='center'>网站管理网站管理</td></tr>
		<tr style='border:1px solid rgba(0,0,0,0.1);height:28px;'><td align='center'>信息报送信息报送</td></tr>
		<tr style='border:1px solid rgba(0,0,0,0.1);height:28px;'><td align='center'>网站管理网站管理</td></tr>
	</table>
	
	<div id='top_table' style="background-image:url('./img/top_back.jpg');background-repeat:no-repeat;	background-size:100%;width:100%;" >
			<img id='logimg'  src=''>
			
			<div id='logtext' style='color:white;font-size:42px;position:absolute;font-weight:500;text-shadow: #0395E7 3px 3px 3px;}'>深入推进公安大数据战略实施</div>
	</div>
	
	
	<table id='nav_table' style="margin-top:-4px;border:0;border-collapse:collapse;border-spacing:0;background-image:url('./img/nav_back.png');background-repeat:no-repeat;background-size:cover;width:100%;color:white;font-weight:600;">
		<tr>
			<td width='10%;'></td>
			<td align='center' class='tcolor'>首页</td>
			<td align='center' onmouseover="addcol(this);" onmouseout="delcol(this);">市局主页</td>
			<td align='center' onmouseover="addcol(this);" onmouseout="delcol(this);">组织机构</td>
			<td align='center' onmouseover="addcol(this);" onmouseout="delcol(this);">信息报送</td>
			<td align='center' onmouseover="addcol(this);" onmouseout="delcol(this);">FTP</td>
			<td align='center' onmouseover="addcol(this);" onmouseout="delcol(this);">网站管理</td>
			<td></td>
			<td>2018-01-01 星期二</td>
		</tr>
	</table>
	
	<div class='xin_table'>
		<table style='width:100%;'>
			<tr>
				<td style='width:37.5%;'>
						<div class="swiper-container"  style='height:250px;'>
			            <div class="swiper-wrapper">
			                <div class="swiper-slide">第一页</div>
			                <div class="swiper-slide">第二页</div>
			                <div class="swiper-slide">第三页</div>
			                <div class="swiper-slide">第四页</div>
			                <div class="swiper-slide">第五页</div>
			            </div>
			            <div class="swiper-pagination"></div>
			        </div>
		        </td>
				<td style='width:37.5%;' valign='top'>
					<table style='width:100%;border:0;border-collapse:collapse;border-spacing:0;'>
						<tr height='32px'><td width='80px' style='background-color:#0285E2;font-weight:700;font-size:15px;border-bottom:1px solid rgba(0,0,0,0.1);color:white;' align='center'>新闻</td><td style='border-bottom:1px solid rgba(0,0,0,0.1);'></td></tr>
						
						<tr>
							<td colspan='2'>
								<ul class="news-list" style='margin-left:-10%;'>
				                    <li class="active">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2018-02-01/20180201000266.html" title="官方预测接下来这些路段和区域容易堵" target="_blank">官方预测接下来这些</a>
				                    <span class="news-time">02-01</span>
				
				                    </li>
				                    <li class="">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2018-02-01/20180201000267.html" title="新年第一波，27个电子警察下周开始启用" target="_blank">新年第一波，</a>
				                    <span class="news-time">02-01</span>
				
				                    </li>
				                    <li class="">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2018-01-25/20180125000265.html" title="你的车今后还能骑上路吗？电动自行车“新国标”正在公示！" target="_blank">你的车今后还能骑上路</a>
				                    <span class="news-time">01-25</span>
				
				                    </li>
				                    <li class="">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2018-01-05/20180105000261.html" title="宁波交警发布年度交通热词" target="_blank">宁波交警发布年</a>
				                    <span class="news-time">01-05</span>
				
				                    </li>
				                    <li class="">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2017-12-29/20171229000258.html" title="微信违法自助处理平台有新变化！" target="_blank">微信违法自助处</a>
				                    <span class="news-time">12-29</span>
				
				                    </li>
				                    
				                     <li class="">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2017-12-29/20171229000258.html" title="微信违法自助处理平台有新变化！" target="_blank">微信违法自助处</a>
				                    <span class="news-time">12-29</span>
				
				                    </li>
				                    
				                     <li class="">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2017-12-29/20171229000258.html" title="微信违法自助处理平台有新变化！" target="_blank">微信违法自助处</a>
				                    <span class="news-time">12-29</span>
				
				                    </li>
				                    
			       			 	</ul>
							</td>
						</tr>
					</table>
				</td>
				<td style='width:25%;padding-left:20px;'>
					<table style='width:100%;border:0;border-collapse:collapse;border-spacing:0;'>
						<tr height='32px'><td width='80px' style='background-color:#0285E2;font-weight:700;font-size:15px;border-bottom:1px solid rgba(0,0,0,0.1);color:white;' align='center'>重要文件</td><td style='border-bottom:1px solid rgba(0,0,0,0.1);'></td></tr>
						
						<tr>
							<td colspan='2'>
								<ul class="news-list" style='margin-left:-16%;'>
				                    <li class="active">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2018-02-01/20180201000266.html" title="官方预测接下来这些路段和区域容易堵" target="_blank">官方预测接下来这些</a>
				                    <span class="news-time">02-01</span>
				
				                    </li>
				                    <li class="">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2018-02-01/20180201000267.html" title="新年第一波，27个电子警察下周开始启用" target="_blank">新年第一波，</a>
				                    <span class="news-time">02-01</span>
				
				                    </li>
				                    <li class="">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2018-01-25/20180125000265.html" title="你的车今后还能骑上路吗？电动自行车“新国标”正在公示！" target="_blank">你的车今后还能骑上路</a>
				                    <span class="news-time">01-25</span>
				
				                    </li>
				                    <li class="">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2018-01-05/20180105000261.html" title="宁波交警发布年度交通热词" target="_blank">宁波交警发布年</a>
				                    <span class="news-time">01-05</span>
				
				                    </li>
				                    <li class="">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2017-12-29/20171229000258.html" title="微信违法自助处理平台有新变化！" target="_blank">微信违法自助处</a>
				                    <span class="news-time">12-29</span>
				
				                    </li>
				                    
				                     <li class="">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2017-12-29/20171229000258.html" title="微信违法自助处理平台有新变化！" target="_blank">微信违法自助处</a>
				                    <span class="news-time">12-29</span>
				
				                    </li>
				                    
				                     <li class="">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2017-12-29/20171229000258.html" title="微信违法自助处理平台有新变化！" target="_blank">微信违法自助处</a>
				                    <span class="news-time">12-29</span>
				
				                    </li>
				                    
			       			 	</ul>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</div>
	
	
	
	<div class='xin_table'>
		<table style='width:100%;'>
			<tr>
				<td style='width:50%;' valign='top'>
					<table style='width:100%;border:0;border-collapse:collapse;border-spacing:0;'>
						<tr height='32px'><td width='80px' style='background-color:#0285E2;font-weight:700;font-size:15px;border-bottom:1px solid rgba(0,0,0,0.1);color:white;' align='center'>通知公告</td><td style='border-bottom:1px solid rgba(0,0,0,0.1);'></td></tr>
						
						<tr>
							<td colspan='2'>
								<ul class="news-list" style='margin-left:-8%;'>
				                    <li class="active">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2018-02-01/20180201000266.html" title="官方预测接下来这些路段和区域容易堵" target="_blank">官方预测接下来这些</a>
				                    <span class="news-time">02-01</span>
				
				                    </li>
				                    <li class="">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2018-02-01/20180201000267.html" title="新年第一波，27个电子警察下周开始启用" target="_blank">新年第一波，</a>
				                    <span class="news-time">02-01</span>
				
				                    </li>
				                    <li class="">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2018-01-25/20180125000265.html" title="你的车今后还能骑上路吗？电动自行车“新国标”正在公示！" target="_blank">你的车今后还能骑上路</a>
				                    <span class="news-time">01-25</span>
				
				                    </li>
				                    <li class="">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2018-01-05/20180105000261.html" title="宁波交警发布年度交通热词" target="_blank">宁波交警发布年</a>
				                    <span class="news-time">01-05</span>
				
				                    </li>
				                    <li class="">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2017-12-29/20171229000258.html" title="微信违法自助处理平台有新变化！" target="_blank">微信违法自助处</a>
				                    <span class="news-time">12-29</span>
				
				                    </li>
				                    
				                     <li class="">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2017-12-29/20171229000258.html" title="微信违法自助处理平台有新变化！" target="_blank">微信违法自助处</a>
				                    <span class="news-time">12-29</span>
				
				                    </li>
				                    
				                     <li class="">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2017-12-29/20171229000258.html" title="微信违法自助处理平台有新变化！" target="_blank">微信违法自助处</a>
				                    <span class="news-time">12-29</span>
				
				                    </li>
				                    
			       			 	</ul>
							</td>
						</tr>
					</table>
				</td>
				<td style='width:50%;padding-left:20px;'>
					<table style='width:100%;border:0;border-collapse:collapse;border-spacing:0;'>
						<tr height='32px'><td width='80px' style='background-color:#0285E2;font-weight:700;font-size:15px;border-bottom:1px solid rgba(0,0,0,0.1);color:white;' align='center'>待办事项</td><td style='border-bottom:1px solid rgba(0,0,0,0.1);'></td></tr>
						
						<tr>
							<td colspan='2'>
								<ul class="news-list" style='margin-left:-8%;'>
				                    <li class="active" >
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2018-02-01/20180201000266.html" title="官方预测接下来这些路段和区域容易堵" target="_blank"><span onmouseover="onshowtable(this,event);" onmouseout="ondiss();">官方预测接下来这些</span></a>
				                    <span class="news-time">02-01</span>
				
				                    </li>
				                    <li class="">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2018-02-01/20180201000267.html" title="新年第一波，27个电子警察下周开始启用" target="_blank">新年第一波，</a>
				                    <span class="news-time">02-01</span>
				
				                    </li>
				                    <li class="">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2018-01-25/20180125000265.html" title="你的车今后还能骑上路吗？电动自行车“新国标”正在公示！" target="_blank">你的车今后还能骑上路</a>
				                    <span class="news-time">01-25</span>
				
				                    </li>
				                    <li class="">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2018-01-05/20180105000261.html" title="宁波交警发布年度交通热词" target="_blank">宁波交警发布年</a>
				                    <span class="news-time">01-05</span>
				
				                    </li>
				                    <li class="">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2017-12-29/20171229000258.html" title="微信违法自助处理平台有新变化！" target="_blank">微信违法自助处</a>
				                    <span class="news-time">12-29</span>
				
				                    </li>
				                    
				                     <li class="">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2017-12-29/20171229000258.html" title="微信违法自助处理平台有新变化！" target="_blank">微信违法自助处</a>
				                    <span class="news-time">12-29</span>
				
				                    </li>
				                    
				                     <li class="">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2017-12-29/20171229000258.html" title="微信违法自助处理平台有新变化！" target="_blank">微信违法自助处</a>
				                    <span class="news-time">12-29</span>
				
				                    </li>
				                    
			       			 	</ul>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</div>
	
	
	
	<div class='xin_table'>
		<table style='width:100%;'>
			<tr>
				<td style='width:33%;' valign='top'>
					<table style='width:100%;border:0;border-collapse:collapse;border-spacing:0;'>
						<tr height='32px'><td width='80px' style='background-color:#0285E2;font-weight:700;font-size:15px;border-bottom:1px solid rgba(0,0,0,0.1);color:white;' align='center'>简报专报</td><td style='border-bottom:1px solid rgba(0,0,0,0.1);'></td></tr>
						
						<tr>
							<td colspan='2'>
								<ul class="news-list" style='margin-left:-12%;'>
				                    <li class="active">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2018-02-01/20180201000266.html" title="官方预测接下来这些路段和区域容易堵" target="_blank">官方预测接下来这些</a>
				                    <span class="news-time">02-01</span>
				
				                    </li>
				                    <li class="">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2018-02-01/20180201000267.html" title="新年第一波，27个电子警察下周开始启用" target="_blank">新年第一波，</a>
				                    <span class="news-time">02-01</span>
				
				                    </li>
				                    <li class="">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2018-01-25/20180125000265.html" title="你的车今后还能骑上路吗？电动自行车“新国标”正在公示！" target="_blank">你的车今后还能骑上路</a>
				                    <span class="news-time">01-25</span>
				
				                    </li>
				                    <li class="">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2018-01-05/20180105000261.html" title="宁波交警发布年度交通热词" target="_blank">宁波交警发布年</a>
				                    <span class="news-time">01-05</span>
				
				                    </li>
				                    <li class="">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2017-12-29/20171229000258.html" title="微信违法自助处理平台有新变化！" target="_blank">微信违法自助处</a>
				                    <span class="news-time">12-29</span>
				
				                    </li>
				                    
				                     <li class="">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2017-12-29/20171229000258.html" title="微信违法自助处理平台有新变化！" target="_blank">微信违法自助处</a>
				                    <span class="news-time">12-29</span>
				
				                    </li>
				                    
				                     <li class="">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2017-12-29/20171229000258.html" title="微信违法自助处理平台有新变化！" target="_blank">微信违法自助处</a>
				                    <span class="news-time">12-29</span>
				
				                    </li>
				                    
			       			 	</ul>
							</td>
						</tr>
					</table>
				</td>
				<td style='width:33%;padding-left:20px;'>
					<table style='width:100%;border:0;border-collapse:collapse;border-spacing:0;'>
						<tr height='32px'><td width='80px' style='background-color:#0285E2;font-weight:700;font-size:15px;border-bottom:1px solid rgba(0,0,0,0.1);color:white;' align='center'>工作动态</td><td style='border-bottom:1px solid rgba(0,0,0,0.1);'></td></tr>
						
						<tr>
							<td colspan='2'>
								<ul class="news-list" style='margin-left:-12%;'>
				                    <li class="active">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2018-02-01/20180201000266.html" title="官方预测接下来这些路段和区域容易堵" target="_blank">官方预测接下来这些</a>
				                    <span class="news-time">02-01</span>
				
				                    </li>
				                    <li class="">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2018-02-01/20180201000267.html" title="新年第一波，27个电子警察下周开始启用" target="_blank">新年第一波，</a>
				                    <span class="news-time">02-01</span>
				
				                    </li>
				                    <li class="">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2018-01-25/20180125000265.html" title="你的车今后还能骑上路吗？电动自行车“新国标”正在公示！" target="_blank">你的车今后还能骑上路</a>
				                    <span class="news-time">01-25</span>
				
				                    </li>
				                    <li class="">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2018-01-05/20180105000261.html" title="宁波交警发布年度交通热词" target="_blank">宁波交警发布年</a>
				                    <span class="news-time">01-05</span>
				
				                    </li>
				                    <li class="">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2017-12-29/20171229000258.html" title="微信违法自助处理平台有新变化！" target="_blank">微信违法自助处</a>
				                    <span class="news-time">12-29</span>
				
				                    </li>
				                    
				                     <li class="">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2017-12-29/20171229000258.html" title="微信违法自助处理平台有新变化！" target="_blank">微信违法自助处</a>
				                    <span class="news-time">12-29</span>
				
				                    </li>
				                    
				                     <li class="">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2017-12-29/20171229000258.html" title="微信违法自助处理平台有新变化！" target="_blank">微信违法自助处</a>
				                    <span class="news-time">12-29</span>
				
				                    </li>
				                    
			       			 	</ul>
							</td>
						</tr>
					</table>
				</td>
				
				<td style='width:34%;padding-left:20px;'>
					<table style='width:100%;border:0;border-collapse:collapse;border-spacing:0;'>
						<tr height='32px'><td width='80px' style='background-color:#0285E2;font-weight:700;font-size:15px;border-bottom:1px solid rgba(0,0,0,0.1);color:white;' align='center'>先进经验</td><td style='border-bottom:1px solid rgba(0,0,0,0.1);'></td></tr>
						
						<tr>
							<td colspan='2'>
								<ul class="news-list" style='margin-left:-12%;'>
				                    <li class="active">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2018-02-01/20180201000266.html" title="官方预测接下来这些路段和区域容易堵" target="_blank">官方预测接下来这些</a>
				                    <span class="news-time">02-01</span>
				
				                    </li>
				                    <li class="">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2018-02-01/20180201000267.html" title="新年第一波，27个电子警察下周开始启用" target="_blank">新年第一波，</a>
				                    <span class="news-time">02-01</span>
				
				                    </li>
				                    <li class="">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2018-01-25/20180125000265.html" title="你的车今后还能骑上路吗？电动自行车“新国标”正在公示！" target="_blank">你的车今后还能骑上路</a>
				                    <span class="news-time">01-25</span>
				
				                    </li>
				                    <li class="">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2018-01-05/20180105000261.html" title="宁波交警发布年度交通热词" target="_blank">宁波交警发布年</a>
				                    <span class="news-time">01-05</span>
				
				                    </li>
				                    <li class="">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2017-12-29/20171229000258.html" title="微信违法自助处理平台有新变化！" target="_blank">微信违法自助处</a>
				                    <span class="news-time">12-29</span>
				
				                    </li>
				                    
				                     <li class="">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2017-12-29/20171229000258.html" title="微信违法自助处理平台有新变化！" target="_blank">微信违法自助处</a>
				                    <span class="news-time">12-29</span>
				
				                    </li>
				                    
				                     <li class="">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2017-12-29/20171229000258.html" title="微信违法自助处理平台有新变化！" target="_blank">微信违法自助处</a>
				                    <span class="news-time">12-29</span>
				
				                    </li>
				                    
			       			 	</ul>
							</td>
						</tr>
					</table>
				</td>
				
			</tr>
		</table>
	</div>
	
	
	<div class='xin_table'>
		<table style='width:100%;'>
			<tr>
				<td style='width:67%;' valign='top'>
					<table style='width:100%;border:0;border-collapse:collapse;border-spacing:0;'>
						<tr height='32px'><td width='120px' style='background-color:#0285E2;font-weight:700;font-size:15px;border-bottom:1px solid rgba(0,0,0,0.1);color:white;' align='center'>工作推进进度</td><td style='border-bottom:1px solid rgba(0,0,0,0.1);'></td></tr>
						
						<tr>
							<td colspan='2'>
								<ul class="news-list" style='margin-left:-5%;'>
				                    <li class="active">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2018-02-01/20180201000266.html" title="官方预测接下来这些路段和区域容易堵" target="_blank">官方预测接下来这些</a>
				                    <span class="news-process">30.3%</span>
				
				                    </li>
				                    <li class="">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2018-02-01/20180201000267.html" title="新年第一波，27个电子警察下周开始启用" target="_blank">新年第一波，</a>
				                    <span class="news-process">02-01</span>
				                    </li>
				                    <li class="">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2018-01-25/20180125000265.html" title="你的车今后还能骑上路吗？电动自行车“新国标”正在公示！" target="_blank">你的车今后还能骑上路</a>
				                    <span class="news-process">01-25</span>
				
				                    </li>
				                    <li class="">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2018-01-05/20180105000261.html" title="宁波交警发布年度交通热词" target="_blank">宁波交警发布年</a>
				                    <span class="news-process">01-05</span>
				
				                    </li>
				                    <li class="">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2017-12-29/20171229000258.html" title="微信违法自助处理平台有新变化！" target="_blank">微信违法自助处</a>
				                    <span class="news-process">12-29</span>
				
				                    </li>
				                    
				                     <li class="">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2017-12-29/20171229000258.html" title="微信违法自助处理平台有新变化！" target="_blank">微信违法自助处</a>
				                    <span class="news-process">12-29</span>
				
				                    </li>
				                    
				                     <li class="">
				                        <span class="dots">·</span>
				                        <a href="/cmspage/jgdt/2017-12-29/20171229000258.html" title="微信违法自助处理平台有新变化！" target="_blank">微信违法自助处</a>
				                    <span class="news-process">12-29</span>
				
				                    </li>
				                    
			       			 	</ul>
							</td>
						</tr>
					</table>
				</td>
				<td style='width:33%;padding-left:20px;' valign='top'>
					<table style='width:100%;border:0;border-collapse:collapse;border-spacing:0;'>
						<tr height='32px'><td width='80px' style='background-color:#0285E2;font-weight:700;font-size:15px;color:white;' align='center'>信息录用</td><td ></td></tr>
						<tr>
							<td colspan='2'>
								<table style='width:100%;border:0;border-collapse:collapse;border-spacing:0;color:#777'>
									<tr height='32px' style='border:1px solid rgba(0,0,0,0.1);'><td width='75%' align='center'>信息录用</td><td style='border-left:1px solid rgba(0,0,0,0.1);' align='center'>1</td></tr>
									<tr height='32px' style='border:1px solid rgba(0,0,0,0.1);'><td width='75%' align='center'>信息录用</td><td style='border-left:1px solid rgba(0,0,0,0.1);' align='center'>1</td></tr>
									<tr height='32px' style='border:1px solid rgba(0,0,0,0.1);'><td width='75%' align='center'>信息录用</td><td style='border-left:1px solid rgba(0,0,0,0.1);' align='center'>1</td></tr>
									<tr height='32px' style='border:1px solid rgba(0,0,0,0.1);'><td width='75%' align='center'>信息录用</td><td style='border-left:1px solid rgba(0,0,0,0.1);' align='center'>1</td></tr>
								</table>
								
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</div>
	
</div>
</body>
</html>