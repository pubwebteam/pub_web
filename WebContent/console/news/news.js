function onReady() {
	var STAT_ARR = [{ID:0,NAME:'编辑'},{ID:1,NAME:'待审核'},{ID:2,NAME:'发布'},{ID:3,NAME:'下架'}];
	
	var panel = Ext.create('Ext.panel.Panel',{
        region: 'center',
        bodyPadding: 10,
        defaults: {
	        bodyPadding: 10,
	        scrollable: true
	    },
	    tbar:[{
		    	 xtype:'button',
		    	 text: '提交',
	        	 handler: function(){
	        		 if (grid.getSelection() == null || grid.getSelection().length==0) {
    					 cx.Msg.info("请先选择一条数据!");
    					 return;
    				 }
	        		 var sel = grid.getSelection()[0];
	        		 var html_data = document.getElementById("ue_frame").contentWindow.ue.getContent(); 
	        		 cx.Ajax.request('news/saveHtml.do',{html_data:html_data,id:sel.get("id")},function(){
						 query();
					 });
	        	 } 
		     }],
		items:[
		    {
		    	 height:500,
		    	 html:'<iframe id="ue_frame" runat="server" src="'+basePath+'/console/ueditor/ueditor.html" width="100%" height="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes"/>'
		     }  
		]
    });
	
	var grid = Ext.create('Ext.grid.Panel',{
		requires: [
           'Ext.toolbar.Paging',
        ],
        useArrows: true,
        collapsible:true,
        split: true,
        title:title,
	    store: {
	    	pageSize: 10,
	        proxy: {
	            type: 'ajax',
	            url: basePath+'news/query.do',
	            reader: {
	                type: 'json',
	                rootProperty: 'data',
	                totalProperty : "total" 
	            }
	        },
	        listeners:{
	        	beforeload:function(){
	        		Ext.apply(
    				  this.proxy.extraParams,   
    				  {
    					  type:type
    				  }   
    				);
	        	}
	        }
	    },
	    border:true,
	    region:'west',
	    width:'50%',
	    columns: [{
	        header: '标题',
	        dataIndex: 'title'
	    }, {
	        header: '状态',
	        dataIndex: 'stat',
	        renderer: function (value, record) {
	        	if (Ext.isEmpty(value)) {
	        		return value;
				}
	            return getArrayObjById(STAT_ARR,value).NAME;
	        }
	    }, {
	        header: '创建日期',
	        dataIndex: 'create_time'
	    }, {
	        header: '发布日期',
	        dataIndex: 'submit_time'
	    }],
		bbar: {
	        xtype: 'pagingtoolbar',
	        displayInfo: true
	    },
        dockedItems: [{
            xtype: 'toolbar',
            style:'border-bottom:0;border-top:0;',
            scrollable :'x',
            items: [
            {
    			xtype:'button',
    			text:'查询',
    			handler:function(){
    				query();
    	        }
    		},{
    			xtype:'button',
    			text:'新建',
    			handler:function(){
    				form.reset();
    				win.setTitle('新建');
    				win.show();
    			}
    		},{
    			xtype:'button',
    			text:'修改',
    			handler:function(){
    				 if (grid.getSelection() == null || grid.getSelection().length==0) {
    					 cx.Msg.info("请先选择一条数据!");
    					 return;
    				 }
    				 form.reset();
    				 var sel = grid.getSelection()[0];
    				 load(sel.get("id"));
    				 win.setTitle("修改【标题:"+sel.get("title")+"】");
    				 win.show();
    	        }
    		},{
    			xtype:'button',
    			text:'删除',
    			handler:function(){
    				 if (grid.getSelection() == null || grid.getSelection().length==0) {
    					 cx.Msg.info("请先选择一条数据!");
    					 return;
    				 }
    				 cx.Msg.confirm("确认删除选中的数据吗？",function(){
    					 var sel = grid.getSelection()[0];
    					 cx.Ajax.request('news/del.do',{id:sel.get("id")},function(){
    						 query();
    					 });
    				 });
    				 
    	        }
    		},{
    			xtype:'button',
    			text:'上传主图',
    			hidden:type != "00",
    			handler:function(){
    				 if (grid.getSelection() == null || grid.getSelection().length==0) {
    					 cx.Msg.info("请先选择一条数据!");
    					 return;
    				 }
    				 upload_form.reset();
    				 upload_win.show();
    	        }
    		},{
    			xtype:'button',
    			text:'发布',
    			handler:function(){
    				 if (grid.getSelection() == null || grid.getSelection().length==0) {
    					 cx.Msg.info("请先选择一条数据!");
    					 return;
    				 }
    				 cx.Msg.confirm("确认发布选中的数据吗？",function(){
    					 var sel = grid.getSelection()[0];
    					 cx.Ajax.request('news/submit.do',{id:sel.get("id")},function(){
    						 query();
    					 });
    				 });
    				 
    	        }
    		}]
        }]
	});
	
	grid.on('rowclick',onRowclick);
	function onRowclick (t,record,element,rowIndex,e,eOpts ) {
		var sel = grid.getSelection()[0];
		cx.Ajax.request('news/getHtml.do',{id:sel.get("id")},function(ret){
			document.getElementById("ue_frame").contentWindow.ue.setContent(ret.data); 
		});
	}
	
	function query() {
		grid.getStore().load();
		if(!Ext.isEmpty(document.getElementById("ue_frame"))){
			document.getElementById("ue_frame").contentWindow.ue.setContent(""); 
		}
	}
	
	query();
	
	var form = Ext.create('Ext.form.Panel', {
	    frame:true,
	    width: 320,
	    bodyPadding: 10,
	    defaultType: 'textfield',
	    items: [
	        {fieldLabel: '',name: 'id',hidden:true},
	        {allowBlank: false,fieldLabel: '标题', name: 'title'}
	    ],
	    buttonAlign:'center',
	    buttons: [
	        {
	        	text: '保存',
	        	formBind: true,
	        	handler: function(){
		        	var data = form.getValues();
		        	data.type = type;
		        	cx.Ajax.request('news/save.do',data,function(){
		        		query();
    		        	win.hide();
					 });
	        	}
	        }
	    ],

	    defaults: {
	        anchor: '100%',
	        labelWidth: 60
	    }
	});
	
	function load(id){
		form.load({
			url : basePath+'news/get.do',
			params: {id:id},
			success : function(a,b){
				
			}
		});
	}
	
	var win = Ext.create('Ext.window.Window', {
	    modal:true,
	    title: '新建',
	    closeAction:'hide',
	    layout: 'fit',
	    items: [form]
	})
	
	var upload_form = Ext.create('Ext.form.Panel', {
		width : 400,       
		bodyPadding : 10,       
		frame : true,       
		items : [{         
			xtype : 'filefield',         
			name : 'file',         
			fieldLabel : 'File',         
			labelWidth : 50,         
			msgTarget : 'side',         
			allowBlank : false,         
			anchor : '100%',         
			buttonText : '请选择文件...',
			emptyText: '请上传图片', 
            regex : /\.(png|jpg|jpeg|gif|bmp")$/,
            regexText : "请上传图片",
		}],         
		buttons : [{
			text : '上传',
			handler : function() {
				var form = upload_form.getForm();
				var sel = grid.getSelection()[0];
				if (form.isValid()) {
					form.submit({
						url : basePath+'news/picupload.do',               
						waitMsg : '正在上传文件中...',
						params: {id:sel.get("id")},
						success: function (form, action) {
							var ret = Ext.decode(action.response.responseText);
				        	if(ret.success==true || ret.success == "true"){
				        		upload_win.hide();
								cx.Msg.success('上传文件成功!');
				        	} else {
				        		cx.Msg.error(ret.message);
				        	}
				        	
						},
				        failure: function (response, options) {
				            Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
				        }
					});           
				}         
			}       
		}]     
	});
	
	var upload_win = Ext.create('Ext.window.Window', {
	    modal:true,
	    title: '文件上传',
	    closeAction:'hide',
	    layout: 'fit',
	    items: [upload_form]
	})
	
	var pan = Ext.create('Ext.panel.Panel', {
		 layout: 'border',
		 items: [grid, panel]
	});
	
	Ext.create('Ext.container.Viewport', {
		 layout: 'fit',
		 items: [pan]
	});
}

Ext.onReady(onReady);