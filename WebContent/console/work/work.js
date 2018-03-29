function onReady() {
	
	Ext.define('Items', {
	    extend: 'Ext.data.Model',
	    fields: [
	       {name : 'item_title',type : 'string'},
	        {name : 'mgr_comp',type : 'string'},  
	         {name : 'link_man',type : 'string'},  
	          {name : 'mgr_group',type : 'string'},  
	           {name : 'group_man',type : 'string'},  
	            {name : 'dateline',type : 'string'},  
			{name : 'item_percent',type : 'int'}  
	    ]
    });
			        
	var itemsform = Ext.create('Ext.form.Panel', {
	    height: 70,
	    bodyPadding: 10,
	    region: 'north',
	    defaultType: 'textfield',
	    items: [
	        {fieldLabel: '',name: 'id',hidden:true},
	        {allowBlank: false,fieldLabel: '标题', name: 'title'}
	    ],

	    defaults: {
	        anchor: '100%',
	        labelWidth: 60
	    }
	});
	
	
	var itemsgrid = Ext.create('Ext.grid.Panel',{
        region: 'center',
        split: true,
	    store: {
	        proxy: {
	            type: 'ajax',
	            url: basePath+'work/queryItems.do',
	            reader: {
	                type: 'json',
	                rootProperty: 'data'
	            }
	        },
	        listeners:{
	        	beforeload:function(){
	        		Ext.apply(
    				  this.proxy.extraParams,   
    				  {
    					  TYPE:type
    				  }   
    				);
	        	}
	        }
	    },
	    border:true,
	    columns: [{
	        header: '子项目',
	        dataIndex: 'item_title',
	        width:"40%"
	        
	    },{
	        header: '责任单位',
	        dataIndex: 'mgr_comp',
	        width:"15%"
	        
	    },{
	        header: '联系人',
	        dataIndex: 'link_man',
	        width:"15%"
	        
	    },{
	        header: '专班责任小组',
	        dataIndex: 'mgr_group',
	        width:"15%"
	        
	    },{
	        header: '联络员',
	        dataIndex: 'group_man',
	        width:"15%"
	        
	    },{
	        header: '完成时限',
	        dataIndex: 'dateline',
	        width:"15%"
	        
	    }, {
	        header: '完成度(%)',
	        dataIndex: 'item_percent'
	    }],
        dockedItems: [{
            xtype: 'toolbar',
            style:'border-bottom:0;border-top:0;',
            scrollable :'x',
            items: [
	        {
     			xtype:'button',
    			text:'添加子项',
    			handler:function(){
    				win.show();
    				
    			}
    		},{
    			xtype:'button',
    			text:'修改子项',
    			handler:function(){
    				 if (itemsgrid.getSelection() == null || itemsgrid.getSelection().length==0) {
    					 cx.Msg.info("请先选择一条数据!");
    					 return;
    				 }
    				 
    				  var sel = itemsgrid.getSelection()[0];
    				 form.getForm().loadRecord(sel);
    				 win.setTitle("修改");
    				 
    				 win.show();

    	        }
    		},{
    			xtype:'button',
    			text:'删除子项',
    			handler:function(){
    				
    				 if (itemsgrid.getSelection() == null || itemsgrid.getSelection().length==0) {
    					 cx.Msg.info("请先选择一条数据!");
    					 return;
    				 }
    				 
    				 var sel = itemsgrid.getSelection()[0];
    				 
    				 var index = itemsgrid.getStore().indexOf ( sel );

    				 itemsgrid.getStore().removeAt(index);
    	        }
    		}]
        }]
	});
	
	
	var button = Ext.create('Ext.button.Button',{
        	text: '保存',
        	formBind: true,
        	handler: function(){
	        	var data = itemsform.getValues();
	        	
	        	var items = new Array();
	        	
	        	for(var i=0;i<itemsgrid.getStore().getCount();i++){
	        		var rcd =itemsgrid.getStore().getAt(i);
	        		
	        		items.push(rcd.data);
	        	
	        	}
	        	
	        	data.items = Ext.encode(items);
	        	
	        	Ext.Ajax.request({
    		        url: basePath+'work/save.do',
    		        params: data,
    		        method: 'post',
    		        success: function (response, options) {
    		        	itemsform.reset();
    		        	itemsgrid.getStore().removeAll();
    		        	query();
    		        	
    		        	button.setVisible(false);
    		        	
    		        },
    		        failure: function (response, options) {
    		            Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
    		        }
    		    });
        	}
        });
	button.setVisible(false);
	
	var panel = Ext.create('Ext.panel.Panel',{
        region: 'center',
        bodyPadding: 10,
        layout:'border',
        defaults: {
	        bodyPadding: 10,
	        scrollable: true
	    },
	    buttonAlign:'center',
	    buttons: [button],
	    
		items:[itemsform,itemsgrid]
    });
	
	var grid = Ext.create('Ext.grid.Panel',{
		requires: [
           'Ext.toolbar.Paging'
        ],
        useArrows: true,
        collapsible:true,
        split: true,
	    store: {
	    	pageSize: 10,
	        proxy: {
	            type: 'ajax',
	            url: basePath+'work/query.do',
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
    					  TYPE:type
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
	        dataIndex: 'title',
	        width:"50%"
	        
	    }, {
	        header: '总完成度(%)',
	        dataIndex: 'main_percent',
	        width:"30%"
	    }, {
	        header: '创建日期',
	        dataIndex: 'create_time',
	        width:"18%"
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
    				button.setVisible(true);
    				itemsform.reset();
    				itemsgrid.getStore().removeAll();
    			}
    		},{
    			xtype:'button',
    			text:'修改',
    			handler:function(){
    				 if (grid.getSelection() == null || grid.getSelection().length==0) {
    					 cx.Msg.info("请先选择一条数据!");
    					 return;
    				 }
    				 button.setVisible(true);
    				 var sel = grid.getSelection()[0];
    				 load(sel.get("id"));
    	        }
    		}]
        }]
	});
	
	grid.on('itemclick',rowselect);
	
	function query() {
		grid.getStore().load();
	}
	
	query();
	
	
	var form = Ext.create('Ext.form.Panel', {
	    frame:true,
	    width: 320,
	    bodyPadding: 10,
	    defaultType: 'textfield',
	    items: [
	        {fieldLabel: '',name: 'id',hidden:true},
	        {allowBlank: false,fieldLabel: '标题', name: 'item_title'},
	        {allowBlank: false,fieldLabel: '责任单位', name: 'mgr_comp'},
	        {allowBlank: false,fieldLabel: '联系人', name: 'link_man'},
	        {allowBlank: false,fieldLabel: '专班责任小组', name: 'mgr_group'},
	        {allowBlank: false,fieldLabel: '联络员', name: 'group_man'},
	        {allowBlank: false,fieldLabel: '完成时限', name: 'dateline'},
	        
	        {allowBlank: false,fieldLabel: '完成度(%)', name: 'item_percent',xtype:'numberfield',minValue: 0, maxValue: 100}
	    ],
	    buttonAlign:'center',
	    buttons: [
	        {
	        	text: '保存',
	        	formBind: true,
	        	handler: function(){
		        	var data = form.getValues();
					
					if(data.id==''){
						var items = Ext.create('Items', {
						    item_title : data.item_title,
						    mgr_comp : data.mgr_comp,  
						    link_man : data.link_man,  
						    mgr_group : data.mgr_group,  
						    group_man : data.group_man,  
						    dateline : data.dateline,  
						    
				            item_percent : data.item_percent
						});
						
						itemsgrid.getStore().add(items);
					}else{
					    var sel = itemsgrid.getSelection()[0];
					    sel.set('item_title',data.item_title);
					    sel.set('mgr_comp',data.mgr_comp);
					    sel.set('link_man',data.link_man);
					    sel.set('mgr_group',data.mgr_group);
					    sel.set('group_man',data.group_man);
					    sel.set('dateline',data.dateline);
					     
					    sel.set('item_percent',data.item_percent);
					}
		        	
					form.reset();
					
					win.hide();
	        	}
	        }
	    ],

	    defaults: {
	        anchor: '100%',
	        labelWidth: 60
	    }
	});
	
	function rowselect(t,r){
		button.setVisible(false);
		
		load(r.get('id'));
	}
	
	function load(id){
		itemsgrid.getStore().load({params:{main_id:id}});
		
		itemsform.load({
			url : basePath+'work/get.do',
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
		 items: [grid, panel]
	});
	
	Ext.create('Ext.container.Viewport', {
		 layout: 'fit',
		 items: [pan]
	});
}

Ext.onReady(onReady);