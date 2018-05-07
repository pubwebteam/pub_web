function onReady() {
	var TYPE_ARR = [{ID:"00",NAME:'新闻'},{ID:"01",NAME:'重要文件'},{ID:"02",NAME:'通知公告'},
	                {ID:"03",NAME:'简报专报'},{ID:"04",NAME:'工作动态'},{ID:"05",NAME:'先进经验'}];
	
	var pan = Ext.create('Ext.panel.Panel',{
        bodyPadding: 10,
        defaults: {
	        bodyPadding: 10,
	        scrollable: true
	    },
	    tbar:[,{
			xtype:'button',
			text:'提交',
			handler:function(){
				 panel.reset();
				 win.show();
	        }
		}],
		items:[
		    {
		    	 height:500,
		    	 html:'<iframe id="ue_frame" runat="server" src="'+basePath+'/console/ueditor/ueditor.html" width="100%" height="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes"/>'
		     }  
		]
    });
	
	var panel = Ext.create('Ext.form.Panel', {
		width : 400,       
		bodyPadding : 10,       
		frame : true,  
		defaults: {
	        anchor: '100%',
	        labelWidth: 60
		},
		items : [
		   {xtype:"textfield",allowBlank: false,fieldLabel: '标题', name: 'title'},
		   {allowBlank: false,fieldLabel: '类型',name: 'type',editable:false,xtype:'combo',
               store: {data:TYPE_ARR},displayField: 'NAME',valueField: 'ID'},
           {xtype:"combo",allowBlank: false,fieldLabel: '单位', name: 'create_org',
            displayField: 'short_name',valueField: 'id',queryMode: 'local',
            forceSelection:true, store: {
            autoLoad : true,
	        proxy: {
	            type: 'ajax',
	            url: basePath+'comp/query.do',
	            reader: {
	                type: 'json',
	                rootProperty: 'data',
	            }
	        },
	        listeners:{
	        	beforeload:function(){
	        		Ext.apply(
    				  this.proxy.extraParams,   
    				  {
    					 
    				  }   
    				);
	        	}
	        }
	    },},
           {xtype:"textfield",fieldLabel: '联系人', name: 'link_man'},
           {xtype:"textfield",fieldLabel: '联系电话', name: 'link_phone'},
		   {         
			xtype : 'filefield',         
			name : 'file',         
			fieldLabel : '主图',         
			msgTarget : 'side',         
			buttonText : '请选择文件...',
			emptyText: '请上传图片', 
            regex : /\.(png|jpg|jpeg|gif|bmp")$/,
            regexText : "请上传图片",
		}],         
		buttons : [{
			text : '提交',
			formBind: true,
			handler : function() {
				var form = panel.getForm();
				var html_data = document.getElementById("ue_frame").contentWindow.ue.getContent(); 
				if (form.isValid()) {
					form.submit({
						url : basePath+'infodevy/save.do',               
						waitMsg : '正在上传文件中...',
						params: {html_data:html_data},
						success: function (form, action) {
							var ret = Ext.decode(action.response.responseText);
				        	if(ret.success==true || ret.success == "true"){
				        		win.hide();
				        		panel.reset();
				        		document.getElementById("ue_frame").contentWindow.ue.setContent(""); 
				        	} else {
				        		cx.Msg.error(ret.message);
				        	}
				        	
						},
				        failure: function (response, options) {
				        	var ret = Ext.decode(options.response.responseText);
				        	if(!Ext.isEmpty(ret.message)){
				        		cx.Msg.error(ret.message)
				        	} else {
				        		cx.Msg.error('请求超时或网络故障,错误编号：' + response.status);
				        	}
				        }
					});           
				}         
			}       
		}]     
	});
	
	var win = Ext.create('Ext.window.Window', {
	    modal:true,
	    title: '提交',
	    closeAction:'hide',
	    layout: 'fit',
	    items: [panel]
	})
	
	Ext.create('Ext.container.Viewport', {
		 layout: 'fit',
		 items: [pan]
	});
}

Ext.onReady(onReady);