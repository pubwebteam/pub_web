/**
 * 类cx.Msg
 * 消息提示的封装
 * 静态方法
 * 		success
 *      error
 * 		warning
 *      info
 *      confirm
 *      prompt
 *      ync YesNoCancel
    },
 */
Ext.define("cx.Msg",{
    config:{  
         
    }, 
    statics:{
        success:function(msg){
            Ext.MessageBox.alert("提示",!Ext.isEmpty(msg)?msg:'操作成功！');
        },
        error:function(msg){
        	Ext.MessageBox.show({
        		title: '错误',
        		msg: !Ext.isEmpty(msg)?msg:'系统错误！',
        		buttons: Ext.MessageBox.OK,
        		icon: Ext.MessageBox.ERROR
        	});
        },
        warning:function(msg){
        	Ext.MessageBox.show({
        		title: '警告',
        		msg: !Ext.isEmpty(msg)?msg:'系统警告！',
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.WARNING
        	});
        },
        info:function(msg){
            Ext.MessageBox.show({
                title: '提示',
                msg: !Ext.isEmpty(msg)?msg:'操作成功！',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.INFO
            });
        },
        confirm:function(msg,fnOK,fnCL){
	    	Ext.MessageBox.confirm('确认',msg, function(btn){
	    		if (btn=='yes') {
	    			fnOK==null?'':fnOK();
				} else {
					fnCL==null?'':fnCL();
				}
	    	});
	    },
	    prompt:function(title,msg,fnOK,fnCL){
        	Ext.MessageBox.show({
                title: title,
                msg: msg,
                width:300,
                buttons: Ext.MessageBox.OKCANCEL,
                multiline: true,
                fn: function(btn,text){
                	if (btn=='ok') {
    	    			fnOK==null?'':fnOK(text);
    				} else {
    					fnCL==null?'':fnCL(text);
    				}
                }
            });
        },
        ync: function(title,msg,fnOK,fnNO,fnCL) {
            Ext.MessageBox.show({
                title:title,
                msg: msg,
                buttons: Ext.MessageBox.YESNOCANCEL,
                fn: function(btn,text){
                	if (btn=='yes') {
    	    			fnOK==null?'':fnOK(text);
    				} else if (btn=='no') {
    					fnNO==null?'':fnNO(text);
    				} else {
    					fnCL==null?'':fnCL(text);
    				}
                },
                icon: Ext.MessageBox.QUESTION
            });
        },
        wait: function(msg,progressText,maskClickAction){
        	return Ext.MessageBox.show({
				modal:true,
	            msg: Ext.isEmpty(msg)?'正在处理数据，请稍等...':msg,
	            progressText: Ext.isEmpty(progressText)?"处理中...":progressText,
	            width: 300,
	            maskClickAction: Ext.isEmpty(maskClickAction)?"hide":maskClickAction
	        });
        }
    },  
    inheritableStatics:{  
        
    },  
    constructor:function(config){  
        var me = this ;   
        me.initConfig(config);  
    }  
});

/**
 * 类cx.Ajax
 * 请求
 * 静态方法
 * 		request
    },
 */
Ext.define("cx.Ajax",{
	config:{  
		
	}, 
	statics:{
		request: function(cmd,params,success){
			Ext.Ajax.request({
		        url: basePath+cmd,
		        params: params,
		        method: 'post',
		        success: function (response, options) {
		        	var ret = Ext.decode(response.responseText);
		        	if(ret.success==true || ret.success == "true"){
		        		success(ret,response,options);
		        	} else {
		        		cx.Msg.error(ret.message);
		        	}
		        	
		        },
		        failure: function (response, options) {
		            Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
		        }
		    });
		}
	},  
	inheritableStatics:{  
		
	},  
	constructor:function(config){  
		var me = this ;   
		me.initConfig(config);  
	}  
});

/**
 * 
 * @param num 数字
 * @param pre 精度
 * @return 去掉尾数之后的指定进度的数字(不进行四舍五入)
 */
function toFloor(num,pre){
	var f = parseFloat(num).toFixed(pre+1);
	return f.substring(0, f.toString().length - 1);
}

/**
 * 根据某个key的值寻找数组中的obj对象
 * @param arr 数组
 * @param val 匹配值
 * @param ser key 不填默认是id、ID
 * @returns 找到的obj对象
 */
function getArrayObjById(arr,val,ser) {
	for (var int = 0; int < arr.length; int++) {
		var obj = arr[int];
		if (ser) {
			if (obj[ser] == val) {
				return obj;
			}
		} else if (obj.id == val || obj.ID == val) {
			return obj;
		}
	}
	return null;
}

/**
 * 根据某个key的值寻找数组中的obj对象的index
 * @param arr 数组
 * @param val 匹配值
 * @param ser key 不填默认是id、ID
 * @returns 找到的obj对象的index
 */
function getArrayIdxById(arr,val,ser) {
	for (var int = 0; int < arr.length; int++) {
		var obj = arr[int];
		if (ser) {
			if (obj[ser] == val) {
				return int;
			}
		} else if (obj.id == val || obj.ID == val) {
			return int;
		}
	}
	return null;
}

/**
 * 根据某个位置的值寻找数组中的arr对象
 * @param arr 数组
 * @param val 匹配值
 * @param idx1 位置，默认第一个
 * @returns 找到的arr对象
 */
function getArrayArrById(arr,val,idx1) {
	for (var int = 0; int < arr.length; int++) {
		var obj = arr[int];
		if (idx1) {
			if (obj[idx1] == val) {
				return obj;
			}
		} else if (obj[0] == val) {
			return obj;
		}
	}
	return null;
}