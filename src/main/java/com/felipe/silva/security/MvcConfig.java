package com.felipe.silva.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class MvcConfig extends WebMvcConfigurerAdapter{
	
	@Override
	public void addViewControllers(ViewControllerRegistry registry){
		registry.addViewController("/index").setViewName("index");
		registry.addViewController("/").setViewName("index");
		registry.addViewController("/login").setViewName("login");
		registry.addViewController("/dashboard").setViewName("/dashboard/index");
		registry.addViewController("/dashboard/").setViewName("/dashboard/index");
		registry.addViewController("/dashboard/index").setViewName("dashboard/index");
	}
	
}
