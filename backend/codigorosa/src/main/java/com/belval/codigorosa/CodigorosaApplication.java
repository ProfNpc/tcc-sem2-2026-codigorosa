package com.belval.codigorosa;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
public class CodigorosaApplication {

	public static void main(String[] args) {
		SpringApplication.run(CodigorosaApplication.class, args);
	}
	
	@GetMapping("/")
	public  String eco()  {
		return "eco";
	}

}
