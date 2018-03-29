var id; 
$(document).ready(function(){ 
	
	var arg = window.location.search.substring(1).split("&");
	id = arg[0].split('=')[1];
		
	$('#logimg').width($(document).width()/7);
	$('#logimg').attr('src','./img/log.png');
	 
	$('#nav_table').height($(document).width()/1445*45);
	
	$('#content').css('minHeight',$(document).height()-$('#top_table').height()-$('#nav_table').height()-100)
	
	getSystime();
	
	loadnews(id);
	 
});

function getSystime(){
	ajaxpost('/sys/systime.do',{},function(data){
		
		$('#systime').html(data.data);
		
	});
}

function loadnews(id){
	ajaxpost('/backlog/get.do',{id:id},function(data){
	
		$('#ivs_title').html(data.data.title);
	});
	
	        
	ajaxpost('/backlog/getHtml.do',{id:id},function(data){
	
		$('#zoom').html(data.data);
		
	});
	
	
	var str="<tr style='height:36px; line-height:36px;'><td align='center' style='border:1px solid #EDEDED;'>$NAME</td></tr>";
	
	ajaxpost('/backlog/loadcomp.do',{id:id},function(data){
		
		for(var i=0;i<data.data.length;i++){
			
			if(data.data[i].checked=='true'){
				var p = str.replace('$NAME',data.data[i].name);
				
				$('.detal_table').append(p);
			}
		}
	});
	
	
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

