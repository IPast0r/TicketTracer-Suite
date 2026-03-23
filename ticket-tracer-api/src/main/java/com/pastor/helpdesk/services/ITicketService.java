package com.pastor.helpdesk.services;

import org.springframework.http.ResponseEntity;

import com.pastor.helpdesk.model.Ticket;
import com.pastor.helpdesk.response.TicketResponseRest;

public interface ITicketService {

	public ResponseEntity<TicketResponseRest> search();
	public ResponseEntity<TicketResponseRest> searchById(Long id);
	public ResponseEntity<TicketResponseRest> save(Ticket ticket, Long categoryId);
	public ResponseEntity<TicketResponseRest> deleteById(Long id);
	public ResponseEntity<TicketResponseRest> update(Ticket ticket , Long id);

}
