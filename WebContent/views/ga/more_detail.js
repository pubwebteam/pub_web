var type;
var pagesize=20;


$(document).ready(function(){ 
	
	var arg = window.location.search.substring(1).split("&");
	type = arg[0].split('=')[1];
	
	if(type=='00'){
		$('#ivs_title').html('图片新闻');
	}else if(type=='01'){
		$('#ivs_title').html('重要文件');
	}else if(type=='02'){
		$('#ivs_title').html('通知通告');
	}else if(type=='03'){
		$('#ivs_title').html('简报专报');
	}else if(type=='04'){
		$('#ivs_title').html('工作动态');
	}else if(type=='05'){
		$('#ivs_title').html('先进经验');
	}
	
	getSystime();
	
	$('#logimg').width($(document).width()/7);
	$('#logimg').attr('src','./img/log.png');
	 
	$('#nav_table').height($(document).width()/1445*45);
	
	$('#content').css('minHeight',$(document).height()-$('#top_table').height()-$('#nav_table').height()-100)
	
	ajaxpost('/news/query.do',{type:type, limit:pagesize,start:0,stat:2},function(data){
		
		$("#page1").createPage({
			pageNum: Math.ceil(data.total/pagesize),
			current: 1,
			backfun: function(e) {
				gotopage(e.current)
			}
		});
		
		showdata(data);
		
	});
	
	 
});

function getSystime(){
	ajaxpost('/sys/systime.do',{},function(data){
		
		$('#systime').html(data.data);
		
	});
}


function gotopage(pagenum){
	
	$('#more_content').empty();
	
	ajaxpost('/news/query.do',{type:type, limit:pagesize,start:(pagenum-1)*pagesize,stat:2},function(data){
		showdata(data);
	});
}

function showdata(data){
	
	var str='<li class=""> ' +
		'<span class="dots">·</span> ' +
	    '<a href="new_detail.html?id=$ID" title="$TITLE" target="_blank">$TITLE</a>' +
	    '<span class="news-time">$CREATE_TIME</span>'+
	'</li>';

	for(var i=0;i<data.data.length;i++){
	
		var p = str.replace('$TITLE',data.data[i].title);
		p = p.replace('$TITLE',data.data[i].title);
		p = p.replace('$ID',data.data[i].id);
		
		p = p.replace('$CREATE_TIME',data.data[i].create_time);
		
		$('#more_content').append(p);
	
	}

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
			window.location.href=url;
		}
	}
}

