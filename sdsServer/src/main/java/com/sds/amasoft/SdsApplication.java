package com.sds.amasoft;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication(scanBasePackages = "com.sds.amasoft")
@EnableJpaRepositories(basePackages = "com.sds.amasoft.repo")
@EnableTransactionManagement
public class SdsApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplicationBuilder app = new SpringApplicationBuilder(SdsApplication.class);
		app.run();
	}

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(SdsApplication.class);
	}
}
