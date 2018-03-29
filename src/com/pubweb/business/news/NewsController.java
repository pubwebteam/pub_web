package com.pubweb.business.news;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping("/news")
public class NewsController {
	
	 private String class_dir = this.getClass().getClassLoader().getResource("").getPath();
	 private String web_dir = class_dir.substring(0, class_dir.indexOf("pub_web"))+"pub_resource"+File.separator;
	
	 @Resource  
	 private JdbcTemplate jdbcTemplate; 
	 
	 @RequestMapping(value={"/query.do","/query.action"})
	 public @ResponseBody String query(HttpServletRequest request) {
		 String type = request.getParameter("type");
		 String stat = request.getParameter("stat");
		 String limit = request.getParameter("limit");
		 String start = request.getParameter("start");
		 
		 String where_clause = "";
		 if(!StringUtils.isEmpty(stat)){
			 where_clause +=" and stat="+stat+" ";
		 }
		 
		 
		 String basepath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+"/pub_resource/";
		 String sql = "select id, "+
				 "sort, "+
				 "title, "+
				 "type, "+
				 "html_dir, "+
				 "case when isnull(html_dir) then ''  when html_dir='' then '' else CONCAT('"+basepath+"',html_dir) end html_dir_absolute,"+
				 "main_pic_dir, "+
				 "case when isnull(main_pic_dir) then ''  when main_pic_dir='' then '' else CONCAT('"+basepath+"',main_pic_dir) end main_pic_dir_absolute,"+
				 "DATE_FORMAT(submit_time,'%m-%d') submit_time, "+
				 "stat, "+
				 "create_user, "+
				 "DATE_FORMAT(create_time,'%m-%d') create_time, "+
				 "update_user, "+
				 "DATE_FORMAT(update_time,'%m-%d') update_time "+
				 "from pub_news "+
				 "where deleted = 'N' "+
				 "and type = ? "+
				 where_clause+
				 "order by id desc ";
		 String totl_sql = "select count(1) cnt from pub_news where deleted = 'N' and type = ? "+where_clause;
		 
		 JSONObject obj = new JSONObject();
		 if(!StringUtils.isEmpty(limit)) {
			if(StringUtils.isEmpty(start)) {
				start = "0";
			}
			obj.put("total", jdbcTemplate.queryForMap(totl_sql,type).get("cnt"));
			sql += "limit "+start+","+limit;
		 }
		 List<Map<String,Object>> res = jdbcTemplate.queryForList(sql,type);
		 obj.put("success", true);
		 obj.put("data", res);
		 
		 return obj.toString();
	 }
	 
	 @RequestMapping(value="/get.do")
	 public @ResponseBody String get(HttpServletRequest request) {
		 String id = request.getParameter("id");
		 
		 String sql = "select id, "+
				 "sort, "+
				 "title, "+
				 "type, "+
				 "html_dir, "+
				 "main_pic_dir, "+
				 "DATE_FORMAT(submit_time,'%m-%d') submit_time, "+
				 "stat, "+
				 "create_user, "+
				 "DATE_FORMAT(create_time,'%m-%d') create_time, "+
				 "update_user, "+
				 "DATE_FORMAT(update_time,'%m-%d') update_time "+
				 "from pub_news "+
				 "where id = ? ";
		 
		 JSONObject obj = new JSONObject();
		 Map<String,Object> res = jdbcTemplate.queryForMap(sql,id);
		 obj.put("success", true);
		 obj.put("data", res);
		 
		 return obj.toString();
	 }
	 
	 @RequestMapping(value="/save.do")
	 public @ResponseBody String save(HttpServletRequest request) {
		 
		 String type = request.getParameter("type");
		 String title = request.getParameter("title");
		 String id = request.getParameter("id");
		 if(StringUtils.isEmpty(id)){
			 String insert = "insert into pub_news( "+
					 "title, "+
					 "type, "+
					 "stat, "+
					 "create_time) "+
					 "values (?,?,0,NOW()) ";
			 jdbcTemplate.update(insert,title,type);
		 } else {
			 String update ="update pub_news set title=?,update_time = NOW() where id = ?";
			 jdbcTemplate.update(update,title,id);
		 }
		 
		 JSONObject obj = new JSONObject();
		 obj.put("success", true);
		 
		 return obj.toString();
	 }
	 
	 @RequestMapping(value="/submit.do")
	 public @ResponseBody String submit(HttpServletRequest request) {
		 
		 String id = request.getParameter("id");
		 String update ="update pub_news set stat=2,update_time = NOW(),submit_time = NOW() where id = ?";
		 jdbcTemplate.update(update,id);
		 
		 JSONObject obj = new JSONObject();
		 obj.put("success", true);
		 
		 return obj.toString();
	 }
	 
	 @RequestMapping(value="/del.do")
	 public @ResponseBody String del(HttpServletRequest request) {
		 
		 String id = request.getParameter("id");
		 String update ="update pub_news set deleted='Y',deleted_time = NOW() where id = ?";
		 jdbcTemplate.update(update,id);
		 JSONObject obj = new JSONObject();
		 obj.put("success", true);
		 
		 return obj.toString();
	 }
	
	 @RequestMapping(value="/saveHtml.do")
	 public @ResponseBody String saveHtml(HttpServletRequest request) throws IOException{
		 String id = request.getParameter("id");
		 String html_data = request.getParameter("html_data");
		 JSONObject obj = new JSONObject();
		 obj.put("success", true);
		 if(StringUtils.isEmpty(id)){
			 obj.put("success", false); 
			 obj.put("message", "请先选择一条数据！");
			 return obj.toString();
		 }
		 Map<String,Object> data = jdbcTemplate.queryForMap("select * from pub_news where id = ?",id);
		 Object html_dir = data.get("html_dir");
		 if(!StringUtils.isEmpty(html_dir)){
			 saveToHtmlFile(web_dir+html_dir.toString(),html_data);
			 return obj.toString();
		 }
		 String type = data.get("type").toString();
		 SimpleDateFormat format = new SimpleDateFormat("yyyyMM");
		 String dir = type+File.separator+format.format(new Date())+File.separator;
		 String fir = web_dir+dir;
		 File f = new File(fir);
		 if(!f.exists()){
			 f.mkdirs();
		 }
		 String filename = UUID.randomUUID()+".html";
		 saveToHtmlFile(fir+filename,html_data);
		 String update ="update pub_news set html_dir=?,update_time = NOW() where id = ?";
		 jdbcTemplate.update(update,dir+filename,id);
		 
		 return obj.toString();
	 }
	 
	@RequestMapping(value="/getHtml.do")
	public @ResponseBody String getHtml(HttpServletRequest request) throws IOException{
		 String id = request.getParameter("id");
		 Map<String,Object> data = jdbcTemplate.queryForMap("select * from pub_news where id = ?",id);
		 Object html_dir = data.get("html_dir");
		 JSONObject obj = new JSONObject();
		 obj.put("success", true);
		 if(StringUtils.isEmpty(html_dir)){
			 obj.put("data", "");
		 } else {
			 obj.put("data", readFromHtmlFile(web_dir+html_dir.toString()));
		 }
		 
		 return obj.toString();
	}
	
	public void saveToHtmlFile(String dir, String htmldata) throws IOException {
		File f = new File(dir);
		if (!f.exists()) {
			f.createNewFile();
		}
		if (StringUtils.isEmpty(htmldata)) {
			htmldata = "";
		}
		htmldata = "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />"+htmldata;
		OutputStreamWriter write = new OutputStreamWriter(new FileOutputStream(f), "UTF-8");
		BufferedWriter writer = new BufferedWriter(write);
		writer.write(htmldata);
		writer.close();
	}
	
	public String readFromHtmlFile(String fileurl) {
		File file = new File(fileurl);
		Long filelength = file.length(); // 获取文件长度
		if (filelength == 0) {
			return " ";
		}
		byte[] filecontent = new byte[filelength.intValue()];
		try {
			FileInputStream in = new FileInputStream(file);
			in.read(filecontent);
			in.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		try {
			// 返回文件内容,默认编码
			return new String(filecontent, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			return new String(filecontent);
		}
	}
	
	
	@RequestMapping(value="/picupload.do", method=RequestMethod.POST)
	public void fileUpload(HttpServletRequest request,@RequestParam(value="file",required=true) MultipartFile file,HttpServletResponse response) throws Exception {
		String id = request.getParameter("id");
		
		response.setContentType("text/html;charset=utf-8");
        PrintWriter writer = response.getWriter();
        
		JSONObject obj = new JSONObject();
		obj.put("success", true);
		if(StringUtils.isEmpty(id)){
			obj.put("success", false); 
			obj.put("message", "请先选择一条数据！");
			
			writer.write(obj.toString());
            writer.flush();
            writer.close();
            return;
		}
		Map<String,Object> data = jdbcTemplate.queryForMap("select * from pub_news where id = ?",id);
		
		String type = data.get("type").toString()+"_pic";
		SimpleDateFormat format = new SimpleDateFormat("yyyyMM");
		String dir = type+File.separator+format.format(new Date())+File.separator;
		String fir = web_dir+dir;
		File f = new File(fir);
		if(!f.exists()){
			f.mkdirs();
		}
		
		String extention = file.getOriginalFilename().substring(file.getOriginalFilename().indexOf("."));
		String main_pic_dir = dir+UUID.randomUUID()+extention;
		
		
		
		try {
            File saveFile = new File(web_dir + main_pic_dir);
            file.transferTo(saveFile);
            if(!StringUtils.isEmpty(data.get("main_pic_dir"))){
            	File oldFile = new File(web_dir + data.get("main_pic_dir").toString());
            	oldFile.delete();
    		}
            String update ="update pub_news set main_pic_dir=?,update_time = NOW() where id = ?";
   		 	jdbcTemplate.update(update,main_pic_dir,id);
   		 
        } catch (Exception e) {
        	obj.put("success", false);
        	obj.put("message", "保存失敗！");
        	
            writer.write(obj.toString());
            writer.flush();
            writer.close();
            return;
        }
		 //ExtJS上传需要用这种方法实现返回
        writer.write(obj.toString());
        writer.flush();
        writer.close();
	}
	
}
