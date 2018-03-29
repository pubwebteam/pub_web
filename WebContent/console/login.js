function onReady() {
	
	var form = Ext.create('Ext.form.Panel', {
	    title: '登录',
	    frame:true,
	    width: 320,
	    bodyPadding: 10,
	    defaultType: 'textfield',
	    items: [{
	        allowBlank: false,
	        fieldLabel: '用户名',
	        name: 'account',
	        labelAlign:'right',
	        emptyText: ''
	    }, {
	        allowBlank: false,
	        fieldLabel: '密码',
	        name: 'passwd',
	        emptyText: '',
	        labelAlign:'right',
	        inputType: 'password'
	    }],
	    buttonAlign:'center',
	    buttons: [
	        {
	        	text: '登录',
	        	formBind: true,
	        	handler: function(){
		        	var parm = form.getValues();
		        	cx.Ajax.request('sys/login.do',parm,function(){
		        		window.location.href="index.jsp";
					});
	        	}
	        }
	    ],

	    defaults: {
	        anchor: '100%',
	        labelWidth: 60
	    }
	});
	
	Ext.create('Ext.container.Viewport', {
		layout: 'center',
		items:[form]
	})
}

Ext.onReady(onReady);