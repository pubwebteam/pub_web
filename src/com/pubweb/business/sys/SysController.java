package com.pubweb.business.sys;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.json.JSONObject;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.pubweb.framework.session.SessionUser;

@Controller
@RequestMapping("/sys")
public class SysController {
	
	 @Resource  
	 private JdbcTemplate jdbcTemplate; 
	 
	 @RequestMapping(value="/login.do")
	 public @ResponseBody String login(HttpServletRequest request) {
		 JSONObject obj = new JSONObject();
		 String account = request.getParameter("account");
		 String passwd = request.getParameter("passwd");
		 String sql = "select * from pub_user where account = ? and passwd = ?";
		 List<Map<String,Object>> list = jdbcTemplate.queryForList(sql,account,passwd);
		 
		 if (list == null || list.size() == 0) {
			 obj.put("success", false);
			 obj.put("message", "账号或密码错误！");
			 return obj.toString();
		 }
		 Map<String,Object> user = list.get(0);
		 if ("Y".equals(user.get("deleted"))) {
			 obj.put("success", false);
			 obj.put("message", "账号已作废！");
			 return obj.toString();
		 }
		 
		 SessionUser ussion = new SessionUser(user.get("id").toString(), 
				 user.get("account").toString(), 
				 user.get("name").toString());
		 SessionUser.set(request, ussion);
		 obj.put("success", true);
		 return obj.toString();
	 }
	 
	 @RequestMapping(value="/logout.do")
	 public @ResponseBody String logout(HttpServletRequest request) {
		 JSONObject obj = new JSONObject();
		 SessionUser.clear(request);
		 obj.put("success", true);
		 return obj.toString();
	 }
	 
	 @RequestMapping(value="/systime.do")
	 public @ResponseBody String systime(HttpServletRequest request) {
		 
		 SimpleDateFormat myFmt2=new SimpleDateFormat("yyyy-MM-dd E");
		 
		 JSONObject obj = new JSONObject();
		 obj.put("success", true);
		 
		 Date time = new Date();
		 
		 obj.put("data", myFmt2.format(time));
		 return obj.toString();
	 }
	 
	 public static void main(String[] args) {
		 Date time = new Date();
		 SimpleDateFormat myFmt2=new SimpleDateFormat("yyyy-MM-dd E");
		 System.out.println(myFmt2.format(time));
	}
}
