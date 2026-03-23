package com.pastor.helpdesk.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pastor.helpdesk.model.Ticket;
import com.pastor.helpdesk.response.TicketResponseRest;
import com.pastor.helpdesk.services.ITicketService;

@RestController
@CrossOrigin(origins = {"http://localhost:4200"})
@RequestMapping("/api/v1")
public class TicketRestController {

	@Autowired
	private ITicketService service;

	@GetMapping("/tickets")
	public ResponseEntity<TicketResponseRest> searchTickets(){
		
		ResponseEntity<TicketResponseRest> response = service.search();
		return response;
		
	}
	
	@GetMapping("/tickets/{id}")
	public ResponseEntity<TicketResponseRest> searchTicketsById(@PathVariable Long id){
		
		ResponseEntity<TicketResponseRest> response = service.searchById(id);
		return response;
		
	}

	
	@PostMapping("/tickets")
	public ResponseEntity<TicketResponseRest> save(
			@RequestParam("name") String name,
			@RequestParam("description") String description,
			@RequestParam("priority") int priority,
			@RequestParam("categoryId") Long categoryId) throws IOException
	{
		
		Ticket ticket = new Ticket();
		ticket.setName(name);
		ticket.setDescription(description);
		ticket.setPriority(priority);
		
		ResponseEntity<TicketResponseRest> response = service.save(ticket , categoryId);
		return response;
		
	}
	
	@PutMapping("/tickets/{id}")
	public ResponseEntity<TicketResponseRest> update(@RequestBody Ticket ticket, @PathVariable Long id){
		
		ResponseEntity<TicketResponseRest> response = service.update(ticket , id);
		return response;
		
	}
	
	@DeleteMapping("/tickets/{id}")
	public ResponseEntity<TicketResponseRest> deleteById(@PathVariable Long id){
		
		ResponseEntity<TicketResponseRest> response = service.deleteById(id);
		return response;
		
	}	
	
}
