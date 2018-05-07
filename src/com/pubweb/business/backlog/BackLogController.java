package com.pubweb.business.backlog;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.json.JSONObject;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/backlog")
public class BackLogController {
	
	 @Resource  
	 private JdbcTemplate jdbcTemplate; 
	 
	 private String class_dir = this.getClass().getClassLoader().getResource("").getPath();
	 private String web_dir = class_dir.substring(0, class_dir.indexOf("pub_web"))+"pub_resource"+File.separator;
	 
	 @RequestMapping(value="/query.do")
	 public @ResponseBody String query(HttpServletRequest request) {
		 String stat = request.getParameter("stat");
		 String limit = request.getParameter("limit");
		 String start = request.getParameter("start");
		 
		 String where_clause = "";
		 if(!StringUtils.isEmpty(stat)){
			 where_clause +=" and stat="+stat+" ";
		 }
		 
		 String sql = "select id, "+
				 "sort, "+
				 "title, "+
				 "stat, "+
				 "DATE_FORMAT(submit_time,'%m-%d') submit_time, "+
				 "create_user, "+
				 "DATE_FORMAT(create_time,'%m-%d') create_time, "+
				 "update_user, "+
				 "DATE_FORMAT(update_time,'%m-%d') update_time "+
				 "from pub_backlog "+
				 "where deleted = 'N' "+
				 where_clause+
				 "order by id desc ";
		 String totl_sql = "select count(1) cnt from pub_backlog where deleted = 'N' "+where_clause;
		 
		 JSONObject obj = new JSONObject();
		 if(!StringUtils.isEmpty(limit)) {
			if(StringUtils.isEmpty(start)) {
				start = "0";
			}
			obj.put("total", jdbcTemplate.queryForMap(totl_sql).get("cnt"));
			sql += "limit "+start+","+limit;
		 }
		 List<Map<String,Object>> res = jdbcTemplate.queryForList(sql);
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
				 "stat, "+
				 "DATE_FORMAT(submit_time,'%m-%d') submit_time, "+
				 "create_user, "+
				 "DATE_FORMAT(create_time,'%m-%d') create_time, "+
				 "update_user, "+
				 "DATE_FORMAT(update_time,'%m-%d') update_time "+
				 "from pub_backlog "+
				 "where id = ? ";
		 
		 JSONObject obj = new JSONObject();
		 Map<String,Object> res = jdbcTemplate.queryForMap(sql,id);
		 obj.put("success", true);
		 obj.put("data", res);
		 
		 return obj.toString();
	 }
	 
	 @RequestMapping(value="/save.do")
	 public @ResponseBody String save(HttpServletRequest request) {
		 
		 String title = request.getParameter("title");
		 String id = request.getParameter("id");
		 if(StringUtils.isEmpty(id)){
			 String insert = "insert into pub_backlog( "+
					 "title, "+
					 "stat,"+
					 "create_time) "+
					 "values (?,0,NOW()) ";
			 jdbcTemplate.update(insert,title);
		 } else {
			 String update ="update pub_backlog set title=?,update_time = NOW() where id = ?";
			 jdbcTemplate.update(update,title,id);
		 }
		 
		 JSONObject obj = new JSONObject();
		 obj.put("success", true);
		 
		 return obj.toString();
	 }
	 
	 @RequestMapping(value="/submit.do")
	 public @ResponseBody String submit(HttpServletRequest request) {
		 
		 String id = request.getParameter("id");
		 String update ="update pub_backlog set stat=2,update_time = NOW(),submit_time = NOW() where id = ?";
		 jdbcTemplate.update(update,id);
		 
		 JSONObject obj = new JSONObject();
		 obj.put("success", true);
		 
		 return obj.toString();
	 }
	 
	 @RequestMapping(value="/end.do")
	 public @ResponseBody String end(HttpServletRequest request) {
		 
		 String id = request.getParameter("id");
		 String update ="update pub_backlog set stat=3,update_time = NOW(),submit_time = NOW() where id = ?";
		 jdbcTemplate.update(update,id);
		 
		 JSONObject obj = new JSONObject();
		 obj.put("success", true);
		 
		 return obj.toString();
	 }
	 
	 @RequestMapping(value="/del.do")
	 public @ResponseBody String del(HttpServletRequest request) {
		 
		 String id = request.getParameter("id");
		 String update ="update pub_backlog set deleted='Y',deleted_time = NOW() where id = ?";
		 jdbcTemplate.update(update,id);
		 JSONObject obj = new JSONObject();
		 obj.put("success", true);
		 
		 return obj.toString();
	 }
	 
	 @RequestMapping(value="/loadcomp.do")
	 public @ResponseBody String loadComp(HttpServletRequest request) {
		 String id = request.getParameter("id");
		 
		 String sql = "select c.id, "+
				 "c.name, "+
				 "c.short_name, "+
				 "c.address, "+
				 "c.link_man, "+
				 "c.link_phone, "+
				 "case when isnull(b.comp_id) then 'false' else 'true' end checked "+
				 "from pub_comp c "+
				 "left join pub_comp_to_backlog b "+
				 "on b.comp_id = c.id "+
				 "and b.backlog_id = ? "+
				 "where c.deleted = 'N' "+
				 "order by c.sort asc,c.create_time desc ";
		 

		 JSONObject obj = new JSONObject();
		 List<Map<String,Object>> res = jdbcTemplate.queryForList(sql,id);
		 obj.put("success", true);
		 obj.put("data", res);
		 
		 return obj.toString();
	 }
	 
	 @RequestMapping(value="/savecomp.do")
	 @Transactional
	 public @ResponseBody String saveComp(HttpServletRequest request) {
		 
		 String backlog_id = request.getParameter("backlog_id");
		 String del ="delete from pub_comp_to_backlog where backlog_id="+backlog_id+"";
		 
		 String comp_ids = request.getParameter("comp_ids");
		 if(StringUtils.isEmpty(comp_ids)){
			 jdbcTemplate.update(del);
			 JSONObject obj = new JSONObject();
			 obj.put("success", true);
			 return obj.toString();
		 }
		 
		 String[] comps = comp_ids.split(",");
		 String[] ins = new String[comps.length+1];
		 ins[0] = del;
		 for (int i = 0; i < comps.length; i++) {
			 ins[i+1]="Insert into pub_comp_to_backlog(backlog_id,comp_id) values("+backlog_id+","+comps[i]+")";
		 }
		 jdbcTemplate.batchUpdate(ins);
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
		 Map<String,Object> data = jdbcTemplate.queryForMap("select * from pub_backlog where id = ?",id);
		 Object html_dir = data.get("html_dir");
		 if(!StringUtils.isEmpty(html_dir)){
			 saveToHtmlFile(web_dir+html_dir.toString(),html_data);
			 return obj.toString();
		 }
		 String type = "backlog";
		 SimpleDateFormat format = new SimpleDateFormat("yyyyMM");
		 String dir = type+File.separator+format.format(new Date())+File.separator;
		 String fir = web_dir+dir;
		 File f = new File(fir);
		 if(!f.exists()){
			 f.mkdirs();
		 }
		 String filename = UUID.randomUUID()+".html";
		 saveToHtmlFile(fir+filename,html_data);
		 String update ="update pub_backlog set html_dir=?,update_time = NOW() where id = ?";
		 jdbcTemplate.update(update,dir+filename,id);
		 
		 return obj.toString();
	 }
	 
	@RequestMapping(value="/getHtml.do")
	public @ResponseBody String getHtml(HttpServletRequest request) throws IOException{
		 String id = request.getParameter("id");
		 Map<String,Object> data = jdbcTemplate.queryForMap("select * from pub_backlog where id = ?",id);
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
	 
	 
}
