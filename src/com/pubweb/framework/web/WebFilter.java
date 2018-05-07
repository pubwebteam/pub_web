/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.pubweb.framework.web;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.pubweb.framework.session.SessionUser;

public class WebFilter implements Filter
{
	private String encoding="UTF-8";
	public void destroy() 
	{
		
	}
	
	public void doFilter(ServletRequest _request, ServletResponse _response,
			FilterChain chain) throws IOException, ServletException
	{
		
		

		_response.setCharacterEncoding(encoding);
		_response.setContentType("text/html; charset="+encoding);
		_request.setCharacterEncoding(encoding);
		
		HttpServletRequest request=(HttpServletRequest)_request;
		HttpServletResponse response=(HttpServletResponse)_response;
 
		String uri=request.getRequestURI();
		String url=request.getRequestURL().toString();
		
		SessionUser su = SessionUser.get(request);
		if(su == null 
				&& uri.contains("console/")
				&& !uri.endsWith("login.jsp") 
				&& !uri.endsWith("/infodevy.jsp"))
		{
			String returl = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+"/pub_web/console/"+"login.jsp";
//			response.sendRedirect(returl);
//			response.sendRedirect("<script language='javascript'>window.parent.location.href='"+returl+"'</script>");
			
			if(uri.endsWith(".jsp")){
				PrintWriter out = response.getWriter();
				out.println("<script language='javascript' type='text/javascript'>");
				out.println("window.top.location.href='"+returl+"'");
				out.println("</script>");
				out.close();
			} else {
				response.sendRedirect(returl);
			} 
            
		} else {
			chain.doFilter(_request, _response);
		}
 

	}

	 

	public void init(FilterConfig filterConfig) throws ServletException
	{
		
	}
	
		
	 
		 

}
