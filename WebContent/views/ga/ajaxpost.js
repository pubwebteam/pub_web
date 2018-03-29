var sjzy="http://10.119.1.11/Edit03/index.jsp";
var ftp="";


$(document).ready(function(){ 
	$(document).bind("contextmenu",function(e){
	        return false;
	});
})


function getContextPath(){     
    var pathName = document.location.pathname;     
    var index = pathName.substr(1).indexOf("/");     
    var result = pathName.substr(0,index+1);     
    return result;     
}   
    
function ajaxpost(url,data,scall){
	var webapps= getContextPath();
	$.ajax({
		url: webapps+url,    //请求的url地址
	    dataType: "json",   //返回格式为json
	    async: true, //请求是否异步，默认为异步，这也是ajax重要特性
	    data: data,    //参数值
	    type: "POST",   //请求方式
	    success: function(req) {
	    	scall.call(this,req);
	    }
	});
	
}