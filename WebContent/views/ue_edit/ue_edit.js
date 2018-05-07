function UeEditCtrl($scope,DTLang, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {
	$scope.dtlist=[];
	$scope.dt={};
	$scope.onsave=false;
	$scope.type_list=[];
	$scope.typeSelect = {};
	
	cmd("bas-base-list",{DICT_ID:'SYS_HTML_FILE_TYPE'},function(r) {
		$scope.type_list = r.data;
		$scope.typeSelect = $scope.type_list[0];
	},
	function(msg){
		
	});
	
	 
	/** **********************************配置datatable************************ */
	$scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
	'full_numbers').withOption("ordering", false).withOption("info",
			false).withOption("searching", true).withOption("paging", true)
			.withOption('bFilter', false).withOption('bInfo', false)
			.withOption('serverSide', false).withOption('data',$scope.dtlist)
			.withOption('rowCallback', rowCallback).withLanguage(DTLang); // 语言
	$scope.dtInstance = {}
	$scope.dtColumns = [
	                    DTColumnBuilder.newColumn('TITLE').withTitle('标题'),
	                    DTColumnBuilder.newColumn('TYPE').withTitle('类型').renderWith(
	                    		   function(data, type, full) {
	                    			   var obj = getArrayObjById($scope.type_list, data);
	                    			   if (obj) {
	                    				   return obj.NAME;
	                    			   }
	                    			   return "";
	                    		   }),
	                    DTColumnBuilder.newColumn('FILE_NAME').withTitle('文件名').withOption('sDefaultContent', ''),
	                    DTColumnBuilder.newColumn('REMARK').withTitle('描述').withOption('sDefaultContent', '')
	                    ]
	
	function rowCallback(nRow, aData, iDisplayIndex,
			iDisplayIndexFull) {
		$('td', nRow).unbind('click');
		$('td', nRow).bind('click', function() {
			$scope.$apply(function() {
				$scope.rowClick(aData.ID);
			});
		});
		return nRow;
	}
	
	$scope.load = function(){
		cmd("html-file-query",{},function(arr) {
			$scope.dtlist = arr;
			$scope.dtOptions.data = $scope.dtlist;
			$scope.reset();
			$scope.$apply();
		},
		function(msg){
			
		});
	}
	
	$scope.load();
	
	$scope.rowClick = function(id) {
		cmd("html-file-get",{ID:id},function(r) {
			$scope.dt = r;
			$scope.typeSelect = getArrayObjById($scope.type_list,r.TYPE);
			$scope.$apply();
		});
		getHtmldata(id);
	}
	
	$scope.saveForm = function() {
		if($scope.form.$valid){
			cmd("html-file-save",$scope.dt,function(ret) {
				if (ret.success){
					$scope.load();
				} else {
					message_error(ret.message);
				}
			},
			function(msg){
				
			});
		}
		else{
			$scope.onsave = true;
		}
	}
	
	$scope.deleteForm = function() {
		sweet_prompt('确定要删除吗?',function(){
			cmd("html-file-delete",{ID:$scope.dt.ID},function(ret) {
				if (ret.success){
					$scope.load();
				} else {
					message_error(ret.message);
				}
			},
			function(msg){
				
			});
         });
	}
	
	$scope.reset = function() {
		$scope.dt={};
		$scope.HTMLDATA = "";
		$scope.typeSelect = $scope.type_list[0];
		$scope.onsave = false;
	}
	 
	 function filldata(html){
		 if (isEmpty($scope.dt.ID)) {
			 message_error("请先选择一条数据！");
			 return;
		 }
		 cmd("html-pagehtml-add",{ID:$scope.dt.ID,HTMLDATA:html},function(ret) {
			if (ret.success){
				$scope.load();
			} else {
				message_error(ret.message);
			}
		});
	 }
	 
	 function getHtmldata(id){
		 cmd("html-pagehtml-load",{ID:id},function(ret) {
   			if (ret.success){
   				$scope.HTMLDATA=ret.data;
   				$scope.$apply();
        	}else{
        		alert("加载失败!")
        	}
	   	 });
	 }
	 
	 $scope.submit = function(){
		 filldata($scope.HTMLDATA);
	 }
};

app.register.controller('UeEditCtrl', UeEditCtrl);