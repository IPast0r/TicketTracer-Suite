package com.pastor.helpdesk;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = "com.pastor.helpdesk.model")
public class SupportTicketSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(SupportTicketSystemApplication.class, args);
	}

}
