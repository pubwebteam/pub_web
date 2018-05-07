package com.pubweb.business.comp;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.json.JSONObject;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/comp")
public class CompController {
	
	 @Resource  
	 private JdbcTemplate jdbcTemplate; 
	 
	 @RequestMapping(value="/query.do")
	 public @ResponseBody String query(HttpServletRequest request) {
		 String limit = request.getParameter("limit");
		 String start = request.getParameter("start");
		 
		 String sql = "select id, "+
				 "sort, "+
				 "name, "+
				 "short_name, "+
				 "address,"+
				 "link_man, "+
				 "link_phone, "+
				 "create_user, "+
				 "DATE_FORMAT(create_time,'%m-%d') create_time, "+
				 "update_user, "+
				 "DATE_FORMAT(update_time,'%m-%d') update_time, "+
				 "(select count(1) from pub_infodevy where create_org = c.id and deleted = 'N' and stat=2) devysum "+
				 "from pub_comp c "+
				 "where deleted = 'N' "+
				 "order by sort asc,create_time desc ";
		 String totl_sql = "select count(1) cnt from pub_comp where deleted = 'N'";
		 
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
				 "name, "+
				 "short_name, "+
				 "address,"+
				 "link_man, "+
				 "link_phone, "+
				 "create_user, "+
				 "DATE_FORMAT(create_time,'%m-%d') create_time, "+
				 "update_user, "+
				 "DATE_FORMAT(update_time,'%m-%d') update_time "+
				 "from pub_comp "+
				 "where id = ? ";
		 
		 JSONObject obj = new JSONObject();
		 Map<String,Object> res = jdbcTemplate.queryForMap(sql,id);
		 obj.put("success", true);
		 obj.put("data", res);
		 
		 return obj.toString();
	 }
	 
	 @RequestMapping(value="/save.do")
	 public @ResponseBody String save(HttpServletRequest request) {
		 
		 String sort = request.getParameter("sort")==null?"0":request.getParameter("sort");
		 String name = request.getParameter("name")==null?"":request.getParameter("name");
		 String short_name = request.getParameter("short_name")==null?"":request.getParameter("short_name");
		 String address = request.getParameter("address")==null?"":request.getParameter("address");
		 String link_man = request.getParameter("link_man")==null?"":request.getParameter("link_man");
		 String link_phone = request.getParameter("link_phone")==null?"":request.getParameter("link_phone");
		 String id = request.getParameter("id");
		 if(StringUtils.isEmpty(id)){
			 String insert = "insert into pub_comp( "+
					 "sort,"+
					 "name, "+
					 "short_name, "+
					 "address,"+
					 "link_man, "+
					 "link_phone, "+
					 "create_time) "+
					 "values (?,?,?,?,?,?,NOW()) ";
			 jdbcTemplate.update(insert,sort,name,short_name,address,link_man,link_phone);
		 } else {
			 String update ="update pub_comp set sort=?,name=?,short_name=?,address=?,link_man=?,link_phone=?,update_time = NOW() where id = ?";
			 jdbcTemplate.update(update,sort,name,short_name,address,link_man,link_phone,id);
		 }
		 
		 JSONObject obj = new JSONObject();
		 obj.put("success", true);
		 
		 return obj.toString();
	 }
	 
	 @RequestMapping(value="/del.do")
	 public @ResponseBody String del(HttpServletRequest request) {
		 
		 String id = request.getParameter("id");
		 String update ="update pub_comp set deleted='Y',deleted_time = NOW() where id = ?";
		 jdbcTemplate.update(update,id);
		 JSONObject obj = new JSONObject();
		 obj.put("success", true);
		 
		 return obj.toString();
	 }
	
}
