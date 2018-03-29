function onReady() {
	var STAT_ARR = [{ID:1,NAME:'待审核'},{ID:2,NAME:'审核通过'},{ID:3,NAME:'审核不通过'}];
	var TYPE_ARR = [{ID:"00",NAME:'新闻'},{ID:"01",NAME:'重要文件'},{ID:"02",NAME:'通知公告'},
	                {ID:"03",NAME:'简报专报'},{ID:"04",NAME:'工作动态'},{ID:"05",NAME:'先进经验'}];
	
	var imgPanel = Ext.create('Ext.panel.Panel',{
		 	useArrows: true,
	        collapsible:true,
	        split: true,
			title:'主图',
			region: 'north',
			height:300,
			html: '' 
	});
	
	var htmlPanel = Ext.create('Ext.panel.Panel',{
		 	region: 'center',
			title:'页面',
			html:''
    }); 
	
	var panel = Ext.create('Ext.panel.Panel',{
        region: 'center',
        layout:'border',
        bodyPadding: 10,
        defaults: {
	        bodyPadding: 10,
	        scrollable: true
	    },
		items:[imgPanel,htmlPanel]
    });
	
	var grid = Ext.create('Ext.grid.Panel',{
		requires: [
           'Ext.toolbar.Paging',
        ],
        useArrows: true,
        collapsible:true,
        split: true,
        title:'信息报送列表',
	    store: {
	    	pageSize: 10,
	        proxy: {
	            type: 'ajax',
	            url: basePath+'infodevy/query.do',
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
	    region:'west',
	    width:'50%',
	    columns: [{
	        header: '标题',
	        dataIndex: 'title'
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
	        header: '状态',
	        dataIndex: 'stat',
	        renderer: function (value, record) {
	        	if (Ext.isEmpty(value)) {
	        		return value;
				}
	            return getArrayObjById(STAT_ARR,value).NAME;
	        }
	    }, {
	        header: '上报单位',
	        dataIndex: 'create_org_name'
	    }, {
	        header: '联系人',
	        dataIndex: 'link_man'
	    }, {
	        header: '联系电话',
	        dataIndex: 'link_phone'
	    }, {
	        header: '创建日期',
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
    			text:'删除',
    			handler:function(){
    				 if (grid.getSelection() == null || grid.getSelection().length==0) {
    					 cx.Msg.info("请先选择一条数据!");
    					 return;
    				 }
    				 cx.Msg.confirm("确认删除选中的数据吗？",function(){
    					 var sel = grid.getSelection()[0];
    					 cx.Ajax.request('infodevy/del.do',{id:sel.get("id")},function(){
    						 query();
    					 });
    				 });
    				 
    	        }
    		},{
    			xtype:'button',
    			text:'审核不通过',
    			handler:function(){
    				 if (grid.getSelection() == null || grid.getSelection().length==0) {
    					 cx.Msg.info("请先选择一条数据!");
    					 return;
    				 }
    				 cx.Msg.confirm("确认不采纳选中的数据吗？",function(){
    					 var sel = grid.getSelection()[0];
    					 cx.Ajax.request('infodevy/submit3.do',{id:sel.get("id")},function(){
    						 query();
    					 });
    				 });
    				 
    	        }
    		},{
    			xtype:'button',
    			text:'通过转编辑',
    			handler:function(){
    				 if (grid.getSelection() == null || grid.getSelection().length==0) {
    					 cx.Msg.info("请先选择一条数据!");
    					 return;
    				 }
    				 cx.Msg.confirm("确认采纳选中的数据吗？",function(){
    					 var sel = grid.getSelection()[0];
    					 cx.Ajax.request('infodevy/submit2.do',{id:sel.get("id"),stat:0},function(){
    						 query();
    					 });
    				 });
    				 
    	        }
    		},{
    			xtype:'button',
    			text:'通过并发布',
    			handler:function(){
    				 if (grid.getSelection() == null || grid.getSelection().length==0) {
    					 cx.Msg.info("请先选择一条数据!");
    					 return;
    				 }
    				 cx.Msg.confirm("确认发布选中的数据吗？",function(){
    					 var sel = grid.getSelection()[0];
    					 cx.Ajax.request('infodevy/submit2.do',{id:sel.get("id"),stat:2},function(){
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
		if(Ext.isEmpty(sel.get('main_pic_dir_absolute'))){
			imgPanel.body.update('');
		} else {
			imgPanel.body.update('<img src="'+sel.get('main_pic_dir_absolute')+'" width=300 height=200 />');
		}
		if(Ext.isEmpty(sel.get('html_dir_absolute'))){
			htmlPanel.body.update('');
		} else {
			htmlPanel.body.update('<iframe runat="server" src="'+sel.get('html_dir_absolute')+'" width="100%" height="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="yes" allowtransparency="yes"/>');
		}
	}
	
	function query() {
		grid.getStore().load();
		if(!Ext.isEmpty(imgPanel.body)){
			imgPanel.body.update('');
		}
		if(!Ext.isEmpty(htmlPanel.body)){
			htmlPanel.body.update('');
		}
	}
	
	query();
	
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