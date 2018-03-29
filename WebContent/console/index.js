function onReady() {
	var tap = Ext.create('Ext.tab.Panel',{
        region: 'center',
        bodyPadding: 10,
        defaults: {
	        bodyPadding: 10,
	        scrollable: true
	    },
	    items: []
    });
	
	var tree = Ext.create('Ext.tree.Panel',{
        region: 'west',
        width: 250,
        useArrows: true,
        collapsible:true,
        height:'100%',
        split: true,
        title:'功能菜单',
        rootVisible: false,
        store:{
        	root: {
            	expanded: true,
            	text:'',
            	children:[{
            		menu_id:1,
            		text:"新闻",
            		leaf:'true',
            		url:"news/news.jsp"
            	},{
            		menu_id:2,
            		text:"重要文件",
            		leaf:'true',
            		url:"impfile/impfile.jsp"
            	},{
            		menu_id:3,
            		text:"通知公告",
            		leaf:'true',
            		url:"notice/notice.jsp"
            	},{
            		menu_id:4,
            		text:"简报专报",
            		leaf:'true',
            		url:"spreport/spreport.jsp"
            	},{
            		menu_id:5,
            		text:"工作动态",
            		leaf:'true',
            		url:"workdyms/workdyms.jsp"
            	},{
            		menu_id:6,
            		text:"先进经验",
            		leaf:'true',
            		url:"advexp/advexp.jsp"
            	},{
            		menu_id:7,
            		text:"单位管理",
            		leaf:'true',
            		url:"comp/comp.jsp"
            	},{
            		menu_id:8,
            		text:"待办事项",
            		leaf:'true',
            		url:"backlog/backlog.jsp"
            	},{
            		menu_id:9,
            		text:"工作推进",
            		leaf:'true',
            		url:"work/work.jsp"
            	},{
            		menu_id:10,
            		text:"机构管理",
            		leaf:'true',
            		url:"org/org.jsp"
            	},{
            		menu_id:11,
            		text:"信息报送",
            		leaf:'true',
            		url:"infodevy/infodevyquery.jsp"
            	},{
            		menu_id:12,
            		text:"信息录用",
            		leaf:'true',
            		url:"infodevyorg/infodevyorg.jsp"
            	}]
            }
        },
        listeners : {
        	rowclick: onRowclick
        }
    });
	
	function onRowclick( t, record, element, rowIndex, e, eOpts){
    	if (!record.data.leaf) {
    		if (!record.data.expanded) {
    			tree.expandNode(record);
			} else {
				t.collapse(record);
			}
			return;
		}
    	var cnt = tap.items.getCount();
    	for (var int = 0; int < cnt; int++) {
			if (record.get("menu_id") == tap.items.items[int].menu_id) {
				tap.setActiveTab(int);
				return;
			}
		}
    	var item = {
	        title: record.get("text"),
	        closable: true,
	        menu_id : record.get("menu_id"),
	        html:'<iframe runat="server" src="'+record.get("url")+'" width="100%" height="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes"/>',
	    }
    	tap.add(item);
    	tap.setActiveTab(cnt);
    }
	
	var pan = Ext.create('Ext.panel.Panel', {
		 layout: 'border',
		 items: [tree, tap],
		 bbar:[{
			 xtype:'button',
			 text:'退出',
			 handler:function(){
				 cx.Msg.confirm('确认退出吗？',function(){
					 cx.Ajax.request('sys/logout.do',{},function(){
			        		window.location.href="login.jsp";
						});
				 });
			 }
		 }]
	});
	
	Ext.create('Ext.container.Viewport', {
		 layout: 'fit',
		 items: [pan]
	});
	
}

Ext.onReady(onReady);