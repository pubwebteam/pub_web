package com.pubweb.business.infodevy;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping("/infodevy")
public class InfoDevyController {
	
	 private String class_dir = this.getClass().getClassLoader().getResource("").getPath();
	 private String web_dir = class_dir.substring(0, class_dir.indexOf("pub_web"))+"pub_resource"+File.separator;
	
	 @Resource  
	 private JdbcTemplate jdbcTemplate; 
	 
	 @RequestMapping(value="/query.do")
	 public @ResponseBody String query(HttpServletRequest request) {
		 String limit = request.getParameter("limit");
		 String start = request.getParameter("start");
		 
		 String basepath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+"/pub_resource/";
		 String sql = "select i.id, "+
				 "i.sort, "+
				 "i.title, "+
				 "i.type, "+
				 "i.create_org, "+
				 "c.short_name create_org_name, "+
				 "i.link_man, "+
				 "i.link_phone, "+
				 "html_dir, "+
				 "case when isnull(html_dir) then '' when html_dir='' then '' else CONCAT('"+basepath+"',html_dir) end html_dir_absolute, "+
				 "i.main_pic_dir, "+
				 "case when isnull(main_pic_dir) then '' when main_pic_dir='' then '' else CONCAT('"+basepath+"',main_pic_dir) end main_pic_dir_absolute, "+
				 "i.stat, "+
				 "i.create_user, "+
				 "DATE_FORMAT(i.create_time,'%m-%d') create_time, "+
				 "i.update_user, "+
				 "DATE_FORMAT(i.update_time,'%m-%d') update_time "+
				 "from pub_infodevy i "+
				 "left join pub_comp c "+
				 "on c.id = i.create_org "+
				 "where i.deleted = 'N' "+
				 "order by i.id desc ";
		 String totl_sql = "select count(1) cnt from pub_infodevy where deleted = 'N' ";
		 
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
				 "type, "+
				 "create_org, "+
				 "link_man, "+
				 "link_phone, "+
				 "html_dir, "+
				 "main_pic_dir, "+
				 "DATE_FORMAT(submit_time,'%m-%d') submit_time, "+
				 "stat, "+
				 "create_user, "+
				 "DATE_FORMAT(create_time,'%m-%d') create_time, "+
				 "update_user, "+
				 "DATE_FORMAT(update_time,'%m-%d') update_time "+
				 "from pub_infodevy "+
				 "where id = ? ";
		 
		 JSONObject obj = new JSONObject();
		 Map<String,Object> res = jdbcTemplate.queryForMap(sql,id);
		 obj.put("success", true);
		 obj.put("data", res);
		 
		 return obj.toString();
	 }
	 
	 @RequestMapping(value="/save.do", method=RequestMethod.POST)
	 public void save(HttpServletRequest request,@RequestParam(value="file") MultipartFile file,
			 HttpServletResponse response) throws IOException {
		 String type = request.getParameter("type");
		 String title = request.getParameter("title");
		 String create_org = request.getParameter("create_org");
		 String link_man = request.getParameter("link_man")==null?"":request.getParameter("link_man");;
		 String link_phone = request.getParameter("link_phone")==null?"":request.getParameter("link_phone");;
		 String html_data = request.getParameter("html_data");
		 
		 response.setContentType("text/html;charset=utf-8");
         PrintWriter writer = response.getWriter();
         
         JSONObject obj = new JSONObject();
         if(StringUtils.isEmpty(type)||StringUtils.isEmpty(title)||StringUtils.isEmpty(create_org)){
        	obj.put("success", false);
         	obj.put("message", "必填项为空！");
         	writer.write(obj.toString());
            writer.flush();
            writer.close();
            return;
         }
		 
         if("00".equals(type) && (file == null || StringUtils.isEmpty(file.getOriginalFilename()))){
        	 obj.put("success", false);
        	 obj.put("message", "新闻主图不能为空！");
        	 writer.write(obj.toString());
        	 writer.flush();
        	 writer.close();
        	 return;
         }
         
		 obj.put("success", true);
		 
		 String html_dir = "";
		 String main_pic_dir = "";
		 
		 if(!StringUtils.isEmpty(html_data)){
			 html_dir = saveHtml(request);
		 }
		
		 if(file != null && !StringUtils.isEmpty(file.getOriginalFilename())){
			 main_pic_dir = fileUpload(request, file);
		 }
		 
		 try {
            String insert = "insert into pub_infodevy( "+
					 "title, "+
					 "type, "+
					 "create_org, "+
					 "link_man, "+
					 "link_phone, "+
					 "html_dir, "+
					 "main_pic_dir, "+
					 "stat, "+
					 "create_time) "+
					 "values (?,?,?,?,?,?,?,1,NOW()) ";
			 jdbcTemplate.update(insert,title,type,create_org,link_man,link_phone,html_dir,main_pic_dir);
   		 
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
	 
	 private String fileUpload(HttpServletRequest request,MultipartFile file) {
		String type = request.getParameter("type");
		SimpleDateFormat format = new SimpleDateFormat("yyyyMM");
		String dir = type+"_pic"+File.separator+format.format(new Date())+File.separator;
		String fir = web_dir+dir;
		File f = new File(fir);
		if(!f.exists()){
			f.mkdirs();
		}
		
		String extention = file.getOriginalFilename().substring(file.getOriginalFilename().indexOf("."));
		String main_pic_dir = dir+UUID.randomUUID()+extention;
		
		File saveFile = new File(web_dir + main_pic_dir);
        try {
			file.transferTo(saveFile);
		} catch (IllegalStateException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
        
		return main_pic_dir;
	}
	
	private String saveHtml(HttpServletRequest request) throws IOException {
		 String html_data = request.getParameter("html_data");
		 String type = request.getParameter("type");
		 SimpleDateFormat format = new SimpleDateFormat("yyyyMM");
		 String dir = type+File.separator+format.format(new Date())+File.separator;
		 String fir = web_dir+dir;
		 File f = new File(fir);
		 if(!f.exists()){
			 f.mkdirs();
		 }
		 String filename = UUID.randomUUID()+".html";
		 saveToHtmlFile(fir+filename,html_data);
		 
		 return dir+filename;
	}
	
	private void saveToHtmlFile(String dir, String htmldata) throws IOException {
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
	
	 @RequestMapping(value="/submit3.do")
	 public @ResponseBody String submit3(HttpServletRequest request) {
		 
		 String id = request.getParameter("id");
		 String update ="update pub_infodevy set stat=3,update_time = NOW() where id = ?";
		 jdbcTemplate.update(update,id);
		 
		 JSONObject obj = new JSONObject();
		 obj.put("success", true);
		 
		 return obj.toString();
	 }
	 
	 @RequestMapping(value="/submit2.do")
	 @Transactional
	 public @ResponseBody String submit2(HttpServletRequest request) {
		 
		 String id = request.getParameter("id");
		 String stat = request.getParameter("stat");
		 String update ="update pub_infodevy set stat=2,update_time = NOW() where id = "+id;
		 
		 String insert = "insert pub_news( "+
				 "title, "+
				 "type, "+
				 "create_org, "+
				 "html_dir, "+
				 "main_pic_dir, "+
				 "stat, "+
				 "infodevy_id, "+
				 "create_user, "+
				 "create_time) "+
				 "select "+
				 "title, "+
				 "type, "+
				 "create_org, "+
				 "html_dir, "+
				 "main_pic_dir, "+
				 stat+", "+
				 "id,"+
				 "create_user, "+
				 "create_time "+
				 "from pub_infodevy "+
				 "where id = "+id;
		 
		 jdbcTemplate.batchUpdate(update,insert);
		 
		 JSONObject obj = new JSONObject();
		 obj.put("success", true);
		 
		 return obj.toString();
	 }
	 
	 @RequestMapping(value="/del.do")
	 public @ResponseBody String del(HttpServletRequest request) {
		 
		 String id = request.getParameter("id");
		 String update ="update pub_infodevy set deleted='Y',deleted_time = NOW() where id = ?";
		 jdbcTemplate.update(update,id);
		 JSONObject obj = new JSONObject();
		 obj.put("success", true);
		 
		 return obj.toString();
	 }
	
	
}
