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
	
	var pstr="<tr><td colspan='5' align='center' style='font-family:楷体;font-size:21px;'>$TITLE</td></tr>";
	var itemsstr="<tr style='font-family:FangSong;font-size:14px;'><td align='left' style='padding-left:20px;'>$ITEM_TITLE</td><td align='center'>$MGR_COMP</td><td align='center'>$LINK_MAN</td><td align='center'>$DATELINE</td><td align='center'>$ITEM_PERCENT</td></tr>";
	
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
