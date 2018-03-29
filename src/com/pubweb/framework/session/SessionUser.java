package com.pubweb.framework.session;

import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class SessionUser
{

	public static final String SESSION_KEY = "LOGIN_USER_KEY_"
			+ UUID.randomUUID().toString();
	
	private String ip;
	private String userId;
	private String userAccount;
	private String userName;
	
	public void setIp(String ip) {
		this.ip = ip;
	}


	public String getIp() {
		return ip;
	}

	public String getUserId() {
		return userId;
	}

	public String getUserAccount() {
		return userAccount;
	}

	public String getUserName() {
		return userName;
	}
	
	public SessionUser(String userId,String userAccount,String userName)
	{
		this.userId=userId;
		this.userAccount=userAccount;
		this.userName=userName;
	}
	

	public static void set(HttpServletRequest request, SessionUser suser)
	{
		HttpSession session = request.getSession();
		if(suser!=null)
		{
			suser.setIp(request.getRemoteAddr());
		}
		session.setAttribute(SESSION_KEY, suser);
		
	}

	public static SessionUser get(HttpServletRequest request)
	{
		HttpSession session = request.getSession();
		return get(session);
	}

	public static SessionUser get(HttpSession session)
	{
		if (session.getAttribute(SESSION_KEY) != null)
		{
			SessionUser user = (SessionUser) session.getAttribute(SESSION_KEY);
			return user;
		} else
		{
			return null;
		}
	}
	
	public static void clear(HttpServletRequest request)
	{
		HttpSession session = request.getSession();
		if (session.getAttribute(SESSION_KEY) != null)
		{
			session.setAttribute(SESSION_KEY,null);
		}
	}
	
}
