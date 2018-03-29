package com.pubweb.business.work;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;


import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

@Controller
@RequestMapping("/work")
public class WorkController {

	 @Resource  
	 private JdbcTemplate jdbcTemplate; 
	 
	 @RequestMapping(value="/save.do")
	 public @ResponseBody String save(HttpServletRequest request) {
		 
		 String id = request.getParameter("id");
		 String title = request.getParameter("title");
		 String items = request.getParameter("items");
		 
		 if(StringUtils.isEmpty(id)){
			 String insert = "insert into pub_work( "+
					 "title, "+
					 "create_time) "+
					 "values (?,NOW()) ";
			 
			 jdbcTemplate.update(insert,title);
			 
			 id =  jdbcTemplate.queryForObject("SELECT MAX(id) FROM pub_work",String.class);
		 } else {
			 String update ="update pub_work set title=?,update_time = NOW() where id = ?";
			 jdbcTemplate.update(update,title,id);
		 }
		 
		 JSONArray jsonArray = JSONArray.parseArray(items);
		 
		 String itemsinsert = "insert into pub_work_items(main_id,"+
				 "item_title, "+
				 "item_percent,"
				 + "create_time,mgr_comp,link_man,mgr_group,group_man,dateline) "+
				 "values (?,?,?,NOW(),?,?,?,?,?) ";
		 
		 String itemsupdate = "update pub_work_items SET item_title=? , item_percent=?, update_time =NOW(),"
		 		+ " mgr_comp=?,link_man=?,mgr_group=?,group_man=?,dateline=? WHERE id=?";
		 
		 String itemsId="";
		 for (int i = 0; i < jsonArray.size(); i++) {
			 JSONObject item = jsonArray.getJSONObject(i);
			 
			 String itemid = item.getString("id");
			 
			 if(-1==itemid.indexOf("Item")){
				 jdbcTemplate.update(itemsupdate,item.getString("item_title"),item.getString("item_percent")
						 ,item.getString("mgr_comp"),item.getString("link_man"),item.getString("mgr_group")
						 ,item.getString("group_man"),item.getString("dateline"),itemid);
				
				 
			 }else{
				 jdbcTemplate.update(itemsinsert,id,item.getString("item_title"),item.getString("item_percent")
						 ,item.getString("mgr_comp"),item.getString("link_man"),item.getString("mgr_group")
						 ,item.getString("group_man"),item.getString("dateline"));
				 
				 itemid =  jdbcTemplate.queryForObject("SELECT MAX(id) FROM pub_work_items",String.class);
			 }
			 
			 itemsId+=itemid+",";
		}
		 
		 if(!StringUtils.isEmpty(itemsId)){
		
			 itemsId = itemsId.substring(0,itemsId.length()-1);
			 
			 jdbcTemplate.update("update pub_work_items SET deleted='Y' WHERE main_id=? AND id NOT IN ("+itemsId+")",id);
			 
		 }
		 
		 String mainpercent = jdbcTemplate.queryForObject("SELECT FORMAT(IFNULL(SUM(item_percent)/COUNT(*),0),2) FROM pub_work_items WHERE main_id=? AND deleted = 'N' ",String.class, id );
		 
		 jdbcTemplate.update("UPDATE pub_work SET main_percent=? WHERE id=?",mainpercent,id);
		 
		 JSONObject obj = new JSONObject();
		 obj.put("success", true);
		 
		 return obj.toString();
	 }
	 
	 
	 @RequestMapping(value="/query.do")
	 public @ResponseBody String query(HttpServletRequest request) {
		 
		 String limit = request.getParameter("limit");
		 String start = request.getParameter("start");
		 
		 String sql = "select id, "+
				 "title,"+
				 "main_percent,"+
				 "create_user, "+
				 "DATE_FORMAT(create_time,'%m-%d') create_time "+
				 
				 "from pub_work "+
				 "where deleted = 'N' "+
				 "order by id desc ";
		 
		 String totl_sql = "select count(1) cnt from pub_work where deleted = 'N'";
		 
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
				 "title,"+
				 "main_percent,"+
				 "create_user, "+
				 "DATE_FORMAT(create_time,'%m-%d') create_time "+
				 
				 "from pub_work "+
				 "where deleted = 'N' AND id=?";
		 
		 JSONObject obj = new JSONObject();
		 
		 Map<String,Object> res = jdbcTemplate.queryForMap(sql,id);
		 
		 obj.put("success", true);
		 obj.put("data", res);
		 
		 return obj.toString();
		 
	 }
	 
	 
	 @RequestMapping(value="/queryItems.do")
	 public @ResponseBody String queryItems(HttpServletRequest request) {
		 
		 String mainid = request.getParameter("main_id");
		 
		 String sql = "select id, main_id, "+
				 "item_title,"+
				 "item_percent,"+
				 "create_user, "+
				 "DATE_FORMAT(create_time,'%m-%d') create_time ,mgr_comp,link_man,mgr_group,group_man,dateline "+
				 
				 "from pub_work_items "+
				 "where deleted = 'N' AND main_id =? ";
		 
		 JSONObject obj = new JSONObject();
		 
		 List<Map<String,Object>> res = jdbcTemplate.queryForList(sql,mainid);
		 
		 obj.put("success", true);
		 obj.put("data", res);
		 
		 return obj.toString();
		 
	 }
	

}
