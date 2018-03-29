function onReady() {
	
	var grid = Ext.create('Ext.grid.Panel',{
		requires: [
           'Ext.toolbar.Paging',
        ],
	    store: {
	    	pageSize: 10,
	        proxy: {
	            type: 'ajax',
	            url: basePath+'infodevyorg/query.do',
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
	    columns: [{
	        header: '序号',
	        dataIndex: 'sort'
	    }, {
	        header: '公司全称',
	        dataIndex: 'name'
	    }, {
	        header: '公司简称',
	        dataIndex: 'short_name'
	    }, {
	        header: '地址',
	        dataIndex: 'address'
	    }, {
	        header: '联系人',
	        dataIndex: 'link_man'
	    }, {
	        header: '联系电话',
	        dataIndex: 'link_phone'
	    }, {
	        header: '信息录用数量',
	        dataIndex: 'devysum'
	    }, {
	        header: '创建时间',
	        dataIndex: 'create_time'
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
    		}
//            ,{
//    			xtype:'button',
//    			text:'新建',
//    			handler:function(){
//    				form.reset();
//    				win.setTitle('新建');
//    				win.show();
//    			}
//    		},{
//    			xtype:'button',
//    			text:'修改',
//    			handler:function(){
//    				 if (grid.getSelection() == null || grid.getSelection().length==0) {
//    					 cx.Msg.info("请先选择一条数据!");
//    					 return;
//    				 }
//    				 form.reset();
//    				 var sel = grid.getSelection()[0];
//    				 load(sel.get("id"));
//    				 win.setTitle("修改【机构:"+sel.get("name")+"】");
//    				 win.show();
//    	        }
//    		},{
//    			xtype:'button',
//    			text:'删除',
//    			handler:function(){
//    				 if (grid.getSelection() == null || grid.getSelection().length==0) {
//    					 cx.Msg.info("请先选择一条数据!");
//    					 return;
//    				 }
//    				 cx.Msg.confirm("确认删除选中的数据吗？",function(){
//    					 var sel = grid.getSelection()[0];
//    					 cx.Ajax.request('infodevyorg/del.do',{id:sel.get("id")},function(){
//    						 query();
//    					 });
//    				 });
//    				 
//    	        }
//    		}
    		]
        }]
	});
	
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
	        {allowBlank: false,fieldLabel: '机构名称', name: 'name'},
	        {fieldLabel: '地址', name: 'address'},
	        {fieldLabel: '联系人', name: 'link_man'},
	        {fieldLabel: '联系电话', name: 'link_phone'},
	        {allowBlank: false,fieldLabel: '录用数量', name: 'devysum',xtype:'numberfield',value:0,minValue: 0}
	    ],
	    buttonAlign:'center',
	    buttons: [
	        {
	        	text: '保存',
	        	formBind: true,
	        	handler: function(){
		        	var data = form.getValues();
		        	cx.Ajax.request('infodevyorg/save.do',data,function(){
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
			url : basePath+'infodevyorg/get.do',
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
	
	Ext.create('Ext.container.Viewport', {
		 layout: 'fit',
		 items: [grid]
	});
}

Ext.onReady(onReady);