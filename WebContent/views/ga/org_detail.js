$(document).ready(function(){ 
	
	$('#logimg').width($(document).width()/7);
	$('#logimg').attr('src','./img/log.png');
	 
	$('#nav_table').height($(document).width()/1445*45);
	
	$('#content').css('minHeight',$(document).height()-$('#top_table').height()-$('#nav_table').height()-100)
	
	getSystime();
	
	loadOrg(0,'type_0');
	
	loadOrg(1,'type_1');
	 
});

function getSystime(){
	ajaxpost('/sys/systime.do',{},function(data){
		
		$('#systime').html(data.data);
		
	});
}

function loadOrg(type,docuid){
	
	var str="<tr><td width='60%' align='center'>$NAME</td><td width='20%' align='center'>$LINK_MAN</td><td width='20%' align='center'>$LINK_PHONE</td></tr>";
	        
	ajaxpost('/org/query.do',{type:type,limit:10000,start:0},function(data){
	
		for(var i=0;i<data.data.length;i++){
			
			var p = str.replace('$NAME',data.data[i].name);
			p = p.replace('$LINK_MAN',data.data[i].link_man);
			p = p.replace('$LINK_PHONE',data.data[i].link_phone);
			
			$('#'+docuid).append(p);
			
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
