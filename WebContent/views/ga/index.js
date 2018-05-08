var loading=false;
var pagesize=7;

var x=0,y=0;  
var xin=true,yin=true;  
var step=1;  
var xstep=20;  
var ystep=5;  
var delay=200;  

$(document).ready(function(){ 
	
	if(IEVersion()<=8&&IEVersion()!=-1){
		$('.bclc').height(31);
		pagesize=6;
	}else{
		$('.bclc').height(35);
	}
	
	$('#logimg').width($(document).width()/7);
	$('#logimg').attr('src','./img/log.png');
	 
	$('#nav_table').height($(document).width()/1445*45);
	
	$('#container').width($(document).width()*0.8*0.368);
	
	 getSystime();
	  
	 loadwork();
	 loadNews();
	 loadImpfile();
	 loadNotice();
	 loadSpreport();
	 loadWorkdyms();
	 loadAdvexp();
	 
	 loadBacklog();
	 loadInfodevyorg();
	 
	
	 //window.open("work_detail_total.html",'重点项目推进进度','width='+(window.screen.availWidth-10)+',height='+(window.screen.availHeight-30)+',top=0,left=0,resizable=yes,status=yes,menubar=no,scrollbars=yes');

 
 loadworkTotal();
 
 start();

});

function openWorkerWindow(){
	window.open("work_detail_total.html");
}

function loadworkTotal(){
	
	var pstr="<tr><td colspan='5' align='center' style='font-family:楷体;font-size:12px;'>$TITLE</td></tr>";
	var itemsstr="<tr style='font-family:FangSong;font-size:12px;'><td align='left' style='padding-left:20px;'>$ITEM_TITLE</td><td align='center'>$MGR_COMP</td><td align='center'>$LINK_MAN</td><td align='center'>$DATELINE</td><td align='center'>$ITEM_PERCENT</td></tr>";
	
	ajaxpost('/work/queryAllChildren.do',{stat:2},function(data){
		for(var i=0;i<data.data.length;i++){
		
			var pst = pstr.replace('$TITLE',data.data[i].title);
			$('.detal_table').append(pst);
			
			var mxlist = data.data[i].MXLIST;
			
			for(var j=0;j<mxlist.length;j++){
			
				var p = itemsstr.replace('$ITEM_TITLE',mxlist[j].item_title);
				p = p.replace('$ITEM_PERCENT',mxlist[j].item_percent+'%');
				
				p = p.replace('$MGR_COMP',mxlist[j].mgr_comp?mxlist[j].mgr_comp:"");
				p = p.replace('$LINK_MAN',mxlist[j].link_man?mxlist[j].link_man:"");
				p = p.replace('$MGR_GROUP',mxlist[j].mgr_group?mxlist[j].mgr_group:"");
				p = p.replace('$GROUP_MAN',mxlist[j].group_man?mxlist[j].group_man:"");
				p = p.replace('$DATELINE',mxlist[j].dateline?mxlist[j].dateline:"");
				
				$('.detal_table').append(p);
				
			}
			
		}
	});
}

function float(){  
	var obj=$("#codefans_net"); 
    var L=T=0;  
    var R=document.documentElement.clientWidth-480;  
    var B=document.documentElement.clientHeight-300;  
    /*x=x+step*(xin?1:-1);  
    if(x<L){xin=true;x=L;}  
    if(x>R){xin=false;x=R;}  
    y=y+step*(yin?1:-1);  
    if(y<T){yin=true;y=T;}  
    if(y>B){yin=false;y=B;}*/  
      
    if(x<L||x>R){xstep=-xstep;}  
    if(y<T||y>B){ystep=-ystep;}  
    x=x+xstep;  
    y=y+ystep;  
    
    obj.css('left', x+document.documentElement.scrollLeft+"px");
    obj.css('top', y+document.documentElement.scrollTop+"px");
    
//    obj.style.left=x+document.documentElement.scrollLeft+"px";  
//    obj.style.top=y+document.documentElement.scrollTop+"px";  
      
      
}

function start() {
	var obj=$("#codefans_net"); 
	var itl=setInterval("float()",delay);  
    obj.onmouseover=function(){clearInterval(itl)}  
    obj.onmouseout=function(){itl=setInterval("float()",delay)}  
    
}



function IEVersion() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if(isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if(fIEVersion == 7) {
            return 7;
        } else if(fIEVersion == 8) {
            return 8;
        } else if(fIEVersion == 9) {
            return 9;
        } else if(fIEVersion == 10) {
            return 10;
        } else {
            return 6;//IE版本<=7
        }   
    } else if(isEdge) {
        return 11;//edge
    } else if(isIE11) {
        return 11; //IE11  
    }else{
        return -1;//不是ie浏览器
    }
}


function getSystime(){
	ajaxpost('/sys/systime.do',{},function(data){
		
		$('#systime').html(data.data);
		
	});
}

function loadInfodevyorg(){


	var str1="<tr height='32px' ><td width='50%' align='center' style='background-color:#DFF2FF;color:#222222;border:1px solid white;' >单位</td><td style='border-left:1px solid white;background-color:#297ED4;color:white;border:1px solid white;' align='center'>录用数</td></tr>";
	var str2="<tr height='32px' ><td width='50%' align='center' style='background-color:#DFF2FF;color:#222222;border:1px solid white;'>$NAME</td><td style='border-left:1px solid white;background-color:#297ED4;color:white;border:1px solid white;' align='center'>$DEVYSUM</td></tr>";
	var str3="<tr height='32px' ><td width='25%' align='center' style='background-color:#DFF2FF;color:#222222;border:1px solid white;'>单位</td><td width='25%' style='border-left:1px solid #EDEDED;background-color:#297ED4;color:white;border:1px solid white;' align='center'>录用数</td><td width='25%' align='center' style='background-color:#DFF2FF;color:#222222;border:1px solid white;'>单位</td><td width='25%' style='border-left:1px solid white;background-color:#297ED4;color:white;border:1px solid white;' align='center'>录用数</td></tr>";
	var str4="<tr height='32px' ><td width='25%' align='center' style='background-color:#DFF2FF;color:#222222;border:1px solid white;'>$NAME_1</td><td width='25%' style='border-left:1px solid #EDEDED;background-color:#297ED4;color:white;border:1px solid white;' align='center'>$DEVYSUM_1</td><td width='25%' align='center' style='background-color:#DFF2FF;color:#222222;border:1px solid white;'>$NAME_2</td><td width='25%' style='border-left:1px solid white;background-color:#297ED4;color:white;border:1px solid white;' align='center'>$DEVYSUM_2</td></tr>";
	
	
	ajaxpost('/infodevyorg/query.do',{limit:10,start:0,orderby:' devysum DESC '},function(data){
		
		
		if(data.data.length>=6){
			$('#infodevyorg_content').append(str3);
			
			for(var i=0;i<5;i++){			
				var p = str4.replace('$NAME_1',data.data[i].name);
				p = p.replace('$DEVYSUM_1',data.data[i].devysum);
				
				if(i+5<data.data.length){
					p = p.replace('$NAME_2',data.data[i+5].name);
					p = p.replace('$DEVYSUM_2',data.data[i+5].devysum);
				}
				
				$('#infodevyorg_content').append(p);
				
			}
			
		}else{
			$('#infodevyorg_content').append(str1);
			
			for(var i=0;i<data.data.length;i++){			
				var p = str2.replace('$NAME',data.data[i].name);
				p = p.replace('$DEVYSUM',data.data[i].devysum);
				
				$('#infodevyorg_content').append(p);
				
			}
		}
		
	});
	
}

function loadBacklog(){

	var str='<li class=""> ' +
	        	'<span class="dots">·</span> ' +
		        '<a href="backlog_detail.html?id=$ID" title="$TITLE" target="_blank"><span backlogId="$ID" onmouseover="onshowtable(this,event);" onmouseout="ondiss();">$TITLE</span></a>' +
		        '<span class="news-time">$CREATE_TIME</span>'+
	        '</li>';
	
	ajaxpost('/backlog/query.do',{limit:pagesize,start:0,stat:2},function(data){
		for(var i=0;i<data.data.length;i++){
			
			var p = str.replace('$TITLE',data.data[i].title);
			p = p.replace('$TITLE',data.data[i].title);
			p = p.replace('$ID',data.data[i].id);
			p = p.replace('$ID',data.data[i].id);
			
			p = p.replace('$CREATE_TIME',data.data[i].create_time);
		
			$('#backlog_content').append(p);
			
		}
	});
	
}

function loadAdvexp(){

	var str='<li class=""> ' +
	        	'<span class="dots">·</span> ' +
		        '<a href="new_detail.html?id=$ID" title="$TITLE" target="_blank">$TITLE</a>' +
		        '<span class="news-time">$CREATE_TIME</span>'+
	        '</li>';
	
	ajaxpost('/news/query.do',{type:'05', limit:pagesize,start:0,stat:2},function(data){
		for(var i=0;i<data.data.length;i++){
			
			var p = str.replace('$TITLE',data.data[i].title);
			p = p.replace('$TITLE',data.data[i].title);
			p = p.replace('$ID',data.data[i].id);
			
			p = p.replace('$CREATE_TIME',data.data[i].create_time);
		
			
			$('#advexp_content').append(p);
			
		}
	});
}

function loadWorkdyms(){

	var str='<li class=""> ' +
	        	'<span class="dots">·</span> ' +
		        '<a href="new_detail.html?id=$ID" title="$TITLE" target="_blank">$TITLE</a>' +
		        '<span class="news-time">$CREATE_TIME</span>'+
	        '</li>';
	
	ajaxpost('/news/query.do',{type:'04', limit:pagesize,start:0,stat:2},function(data){
		for(var i=0;i<data.data.length;i++){
			
			var p = str.replace('$TITLE',data.data[i].title);
			p = p.replace('$TITLE',data.data[i].title);
			p = p.replace('$ID',data.data[i].id);
			
			p = p.replace('$CREATE_TIME',data.data[i].create_time);
		
			
			$('#workdyms_content').append(p);
			
		}
	});
}


function loadSpreport(){

	var str='<li class=""> ' +
	        	'<span class="dots">·</span> ' +
		        '<a href="new_detail.html?id=$ID" title="$TITLE" target="_blank">$TITLE</a>' +
		        '<span class="news-time">$CREATE_TIME</span>'+
	        '</li>';
	
	ajaxpost('/news/query.do',{type:'03', limit:pagesize,start:0,stat:2},function(data){
		for(var i=0;i<data.data.length;i++){
			
			var p = str.replace('$TITLE',data.data[i].title);
			p = p.replace('$TITLE',data.data[i].title);
			p = p.replace('$ID',data.data[i].id);
			
			p = p.replace('$CREATE_TIME',data.data[i].create_time);
		
			
			$('#spreport_content').append(p);
			
		}
	});
}


function loadNotice(){

	var str='<li class=""> ' +
	        	'<span class="dots">·</span> ' +
		        '<a href="new_detail.html?id=$ID" title="$TITLE" target="_blank">$TITLE</a>' +
		        '<span class="news-time">$CREATE_TIME</span>'+
	        '</li>';
	
	ajaxpost('/news/query.do',{type:'02', limit:pagesize,start:0,stat:2},function(data){
		for(var i=0;i<data.data.length;i++){
			
			var p = str.replace('$TITLE',data.data[i].title);
			p = p.replace('$TITLE',data.data[i].title);
			p = p.replace('$ID',data.data[i].id);
			
			p = p.replace('$CREATE_TIME',data.data[i].create_time);
		
			
			$('#notice_content').append(p);
			
		}
	});
}

function loadImpfile(){

	var str='<li class=""> ' +
	        	'<span class="dots">·</span> ' +
		        '<a href="new_detail.html?id=$ID" title="$TITLE" target="_blank">$TITLE</a>' +
		        '<span class="news-time">$CREATE_TIME</span>'+
	        '</li>';
	
	ajaxpost('/news/query.do',{type:'01', limit:pagesize,start:0,stat:2},function(data){
		for(var i=0;i<data.data.length;i++){
			
			var p = str.replace('$TITLE',data.data[i].title);
			p = p.replace('$TITLE',data.data[i].title);
			p = p.replace('$ID',data.data[i].id);
			
			p = p.replace('$CREATE_TIME',data.data[i].create_time);
		
			
			$('#impfile_content').append(p);
			
		}
	});
}


function loadNews(){

	var str='<li class=""> ' +
	        	'<span class="dots">·</span> ' +
		        '<a href="new_detail.html?id=$ID" title="$TITLE" target="_blank">$TITLE</a>' +
		        '<span class="news-time">$CREATE_TIME</span>'+
	        '</li>';
	
	ajaxpost('/news/query.do',{type:'00', limit:pagesize,start:0,stat:2},function(data){
		for(var i=0;i<data.data.length;i++){
			
			var p = str.replace('$TITLE',data.data[i].title);
			p = p.replace('$TITLE',data.data[i].title);
			p = p.replace('$ID',data.data[i].id);
			
			p = p.replace('$CREATE_TIME',data.data[i].create_time);
		
			
			$('#news_content').append(p);
			
			
			
			if(data.data[i].main_pic_dir_absolute){
//				alert(data.data[i].main_pic_dir_absolute);
				$('.sections').append('<div class="section"><img style ="width:100%;height:265px;" onclick="gotoDetail(this)" url="new_detail.html?id='+data.data[i].id+'" src="'+data.data[i].main_pic_dir_absolute+'"/></div>');
			}
		}
		
		
		$("#container").PageSwitch({
			direction:'horizontal',
			easing:'ease-in',
			duration:1000,
			autoPlay:true,
			loop:'true'
		});
		
		
//		var swiper = new Swiper('.swiper-container',{
//			speed:500,
//		    pagination: '.swiper-pagination',
//		    paginationClickable: true,
//		    spaceBetween: 30,
//		    centeredSlides: true,
//	        autoplay: 1500,
//	        autoplayDisableOnInteraction: false
//	     });
     
	});
}

function gotoDetail(obj){
	window.open($(obj).attr('url'));
}

function loadwork(){
	var str='<li class=""> ' +
	        	'<span class="dots">·</span> ' +
		        '<a href="work_detail.html?id=$ID" title="$TITLE" target="_blank">$TITLE</a>' +
		        '<span class="$CLASS">$MAIN_PERCENT</span>'+
	        '</li>';
	
	ajaxpost('/work/query.do',{limit:pagesize,start:0,stat:2},function(data){
		for(var i=0;i<data.data.length;i++){
			
			var p = str.replace('$TITLE',data.data[i].title);
			p = p.replace('$TITLE',data.data[i].title);
			p = p.replace('$ID',data.data[i].id);
			
			p = p.replace('$MAIN_PERCENT',data.data[i].main_percent+'%');
			p = p.replace('$CLASS',data.data[i].main_percent<=30?'news-process_error':data.data[i].main_percent>=60?'news-process_finish':'news-process_warn');
			
			$('#work_content').append(p);
			
		}
	});
}

function onshowtable(obj,event){
	
	 var e = event || window.event;
     var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
     var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
     var x = e.pageX || e.clientX + scrollX;
     var y = e.pageY || e.clientY + scrollY;
     
	$('#tshow').css('top',y+10);
	$('#tshow').css('left',x+10);
	
	$('#tshow').empty();
	
	loadComp($(obj).attr('backlogId'));
}

function loadComp(id){
	
	if(loading){
		return;
	}
	
	loading = true;
	
	$('#tshow').empty();
	
	var str="<tr style='height:28px; line-height:18px;'><td align='center' style='font-size:14px;border:1px solid #EDEDED;'>$NAME</td></tr>";
	var thr="<tr style='height:28px; line-height:20px;'><td align='center' style='font-size:16px;font-weight:600;border:1px solid #EDEDED;'>未完成单位</td></tr>";
	
	
	ajaxpost('/backlog/loadcomp.do',{id:id},function(data){
		$('#tshow').append(thr);
		
		for(var i=0;i<data.data.length;i++){
			
			if(data.data[i].checked=='true'){
				var p = str.replace('$NAME',data.data[i].name);
				
				$('#tshow').append(p);
			}
			
		}
		loading =false;
		$('#tshow').show();
	});
	
}

function ondiss(){
	$('#tshow').empty();
	$('#tshow').hide();
}

function addcol(obj){
	$(obj).addClass('tcolor');
}

function delcol(obj){
	$(obj).removeClass('tcolor');
}
function gotopage(obj){
	var url="";
	if($(obj).attr('url')=='sjzy'){
		url=sjzy;
	}else if($(obj).attr('url')=='ftp'){
		url=ftp;
	}else{
		url=$(obj).attr('url');
	}
	
	if(url){
		if($(obj).attr('newwindow')=='Y'){
			window.open(url,'信息报送','width='+(window.screen.availWidth-10)+',height='+(window.screen.availHeight-30)+',top=0,left=0,resizable=yes,status=yes,menubar=no,scrollbars=yes');
		}else{
			window.open(url);
		}
	}
}
