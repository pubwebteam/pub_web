var id; 
$(document).ready(function(){ 
	
	var arg = window.location.search.substring(1).split("&");
	id = arg[0].split('=')[1];
		
	$('#logimg').width($(document).width()/7);
	$('#logimg').attr('src','./img/log.png');
	 
	$('#nav_table').height($(document).width()/1445*45);
	
	$('#content').css('minHeight',$(document).height()-$('#top_table').height()-$('#nav_table').height()-100)
	
	
	getSystime();
	
	loadwork(id);
	 
});

function getSystime(){
	ajaxpost('/sys/systime.do',{},function(data){
		
		$('#systime').html(data.data);
		
	});
}

function loadwork(id){
	ajaxpost('/work/get.do',{id:id},function(data){
	
		$('#ivs_title').html(data.data.title);
	});
	
	
	var str="<tr style='font-family:FangSong;font-size:14px;'><td align='left' style='padding-left:20px;'>$ITEM_TITLE</td><td align='center'>$MGR_COMP</td><td align='center'>$LINK_MAN</td><td align='center'>$MGR_GROUP</td><td align='center'>$GROUP_MAN</td><td align='center'>$DATELINE</td><td align='center'>$ITEM_PERCENT</td></tr>";
	        
	ajaxpost('/work/queryItems.do',{main_id:id},function(data){
	
		for(var i=0;i<data.data.length;i++){
			
			var p = str.replace('$ITEM_TITLE',data.data[i].item_title);
			p = p.replace('$ITEM_PERCENT',data.data[i].item_percent+'%');
			
			p = p.replace('$MGR_COMP',data.data[i].mgr_comp?data.data[i].mgr_comp:"");
			p = p.replace('$LINK_MAN',data.data[i].link_man?data.data[i].link_man:"");
			p = p.replace('$MGR_GROUP',data.data[i].mgr_group?data.data[i].mgr_group:"");
			p = p.replace('$GROUP_MAN',data.data[i].group_man?data.data[i].group_man:"");
			p = p.replace('$DATELINE',data.data[i].dateline?data.data[i].dateline:"");
			
			$('.detal_table').append(p);
			
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
