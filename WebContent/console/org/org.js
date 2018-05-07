function onReady() {
	
	var TYPE_ARR = [{ID:0,NAME:'市局'},{ID:1,NAME:'县(市)区'}];
	
	var grid = Ext.create('Ext.grid.Panel',{
		requires: [
           'Ext.toolbar.Paging',
        ],
	    store: {
	    	pageSize: 10,
	        proxy: {
	            type: 'ajax',
	            url: basePath+'org/query.do',
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
	        header: '机构名称',
	        dataIndex: 'name'
	    }, {
	        header: '类型',
	        dataIndex: 'type',
	        renderer: function (value, record) {
	        	if (Ext.isEmpty(value)) {
	        		return value;
				}
	            return getArrayObjById(TYPE_ARR,value).NAME;
	        }
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
    				 win.setTitle("修改【机构:"+sel.get("name")+"】");
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
    					 cx.Ajax.request('org/del.do',{id:sel.get("id")},function(){
    						 query();
    					 });
    				 });
    				 
    	        }
    		}]
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
	        {allowBlank: false,fieldLabel: '序号', name: 'sort',xtype:'numberfield',value:0,minValue: 0},
	        {allowBlank: false,fieldLabel: '机构名称', name: 'name'},
	        {allowBlank: false,fieldLabel: '类型',name: 'type',editable:false,xtype:'combo',
                store: {data:TYPE_ARR},displayField: 'NAME',valueField: 'ID'},
	        {fieldLabel: '地址', name: 'address'},
	        {fieldLabel: '联系人', name: 'link_man'},
	        {fieldLabel: '联系电话', name: 'link_phone'},
	    ],
	    buttonAlign:'center',
	    buttons: [
	        {
	        	text: '保存',
	        	formBind: true,
	        	handler: function(){
		        	var data = form.getValues();
		        	cx.Ajax.request('org/save.do',data,function(){
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
			url : basePath+'org/get.do',
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