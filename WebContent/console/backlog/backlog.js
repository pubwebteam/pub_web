function onReady() {
	var STAT_ARR = [{ID:0,NAME:'编辑'},{ID:2,NAME:'发布'},{ID:3,NAME:'结束'}];
	
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
	        		 cx.Ajax.request('backlog/saveHtml.do',{html_data:html_data,id:sel.get("id")},function(){
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
	
	var comp_grid = Ext.create('Ext.grid.Panel',{
	    border:true,
	    region:'east',
	    width: 200,
	    multiSelect: true,
	    selModel: {
            type: 'checkboxmodel',
            checkOnly: true
        },
        store: {
	        data : []
	    },
	    columns: [{
	        header: '公司',
	        dataIndex: 'short_name',
	        width: 160,
	    }],
	    dockedItems: [{
            xtype: 'toolbar',
            style:'border-bottom:0;border-top:0;',
            scrollable :'x',
            items: [
            {
    			xtype:'button',
    			text:'保存',
    			handler:function(){
    				 if (grid.getSelection() == null || grid.getSelection().length==0) {
    					 cx.Msg.info("请先选择一条待办数据!");
    					 return;
    				 }
    				 var backlog_id = grid.getSelection()[0].get("id");
    				 var comp_ids = "";
    				 if (comp_grid.getSelection() != null && comp_grid.getSelection().length>0) {
    					 for (var int = 0; int < comp_grid.getSelection().length-1; int++) {
    						 comp_ids+=comp_grid.getSelection()[int].get("id")+",";
    					 }
    					 comp_ids+=comp_grid.getSelection()[comp_grid.getSelection().length-1].get("id");
    				 }
    				 cx.Ajax.request('backlog/savecomp.do',{backlog_id:backlog_id,comp_ids:comp_ids},function(ret){
    					 cx.Msg.success("保存成功！");
    				 });
    	        }
    		}]
	    }]
	});
	
	var grid = Ext.create('Ext.grid.Panel',{
		requires: [
           'Ext.toolbar.Paging',
        ],
	    store: {
	    	pageSize: 10,
	        proxy: {
	            type: 'ajax',
	            url: basePath+'backlog/query.do',
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
    					 
    				  }   
    				);
	        	}
	        }
	    },
	    border:true,
	    region:'center',
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
    			text:'发布',
    			handler:function(){
    				 if (grid.getSelection() == null || grid.getSelection().length==0) {
    					 cx.Msg.info("请先选择一条数据!");
    					 return;
    				 }
    				 cx.Msg.confirm("确认发布选中的数据吗？",function(){
    					 var sel = grid.getSelection()[0];
    					 cx.Ajax.request('backlog/submit.do',{id:sel.get("id")},function(){
    						 query();
    					 });
    				 });
    				 
    	        }
    		},{
    			xtype:'button',
    			text:'结束',
    			handler:function(){
    				 if (grid.getSelection() == null || grid.getSelection().length==0) {
    					 cx.Msg.info("请先选择一条数据!");
    					 return;
    				 }
    				 cx.Msg.confirm("确认结束选中的数据吗？",function(){
    					 var sel = grid.getSelection()[0];
    					 cx.Ajax.request('backlog/end.do',{id:sel.get("id")},function(){
    						 query();
    					 });
    				 });
    				 
    	        }
    		}]
        },{
            xtype: 'toolbar',
            style:'border-bottom:0;border-top:0;',
            scrollable :'x',
            items: [
           {
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
    					 cx.Ajax.request('backlog/del.do',{id:sel.get("id")},function(){
    						 query();
    					 });
    				 });
    				 
    	        }
    		}]
        }]
	});
	
	grid.on('rowclick',onRowclick);
	function onRowclick (t,record,element,rowIndex,e,eOpts ) {
		comp_grid.getStore().removeAll();
		var sel = grid.getSelection()[0];
		cx.Ajax.request('backlog/getHtml.do',{id:sel.get("id")},function(ret){
			document.getElementById("ue_frame").contentWindow.ue.setContent(ret.data); 
		});
		cx.Ajax.request('backlog/loadcomp.do',{id:sel.get("id")},function(ret){
			comp_grid.setStore({
				data : ret.data
			});
			
			var selmod = comp_grid.getSelectionModel();
			for (var int = 0; int < ret.data.length; int++) {
				if(ret.data[int].checked == 'true'){
					selmod.select(int,true,true);
				}
			}
		});
	}
	
	function query() {
		grid.getStore().load();
		if(!Ext.isEmpty(document.getElementById("ue_frame"))){
			document.getElementById("ue_frame").contentWindow.ue.setContent(""); 
		}
		//comp_grid.getStore().removeAll();
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
		        	cx.Ajax.request('backlog/save.do',data,function(){
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
			url : basePath+'backlog/get.do',
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
	
	var pan = Ext.create('Ext.panel.Panel', {
		 layout: 'border',
		 items: [{layout: 'border',
			      items: [grid,comp_grid],
			      region:'west',
			      width:'50%',
			      useArrows: true,
		          collapsible:true,
		          split: true
		          }, panel]
	});
	
	Ext.create('Ext.container.Viewport', {
		 layout: 'fit',
		 items: [pan]
	});
}

Ext.onReady(onReady);