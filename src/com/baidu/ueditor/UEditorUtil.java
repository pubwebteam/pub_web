package com.baidu.ueditor;

import java.io.File;

import com.baidu.ueditor.define.State;

public class UEditorUtil {

	public static String resourceName="zs";
	
	public static String transformSavePath(String basePath,String savePath) {
		
		File file=new File(basePath);
		basePath=file.getParent()+"/"+resourceName;
		
		savePath=basePath+savePath;
		
		return savePath;
	}
	
	public static State transformState(State state) {
 
		String url=state.getInfo("url")+"";
		url="/"+resourceName+url;
		state.putInfo("url", url);
		return state;
	}

	
	
}
