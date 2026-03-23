package com.pastor.helpdesk.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pastor.helpdesk.dao.ICategoryDao;
import com.pastor.helpdesk.dao.ITicketDao;
import com.pastor.helpdesk.model.Category;
import com.pastor.helpdesk.model.Ticket;
import com.pastor.helpdesk.response.TicketResponseRest;

@Service
public class TicketServiceImpl implements ITicketService{

	@Autowired
	private ITicketDao ticketDao;

	private ICategoryDao categoryDao;

	public TicketServiceImpl(ICategoryDao categoryDao) {
		super();
		this.categoryDao = categoryDao;
	}

	@Override
	@Transactional(readOnly = true)
	public ResponseEntity<TicketResponseRest> search() {
		TicketResponseRest response = new TicketResponseRest();
		try {
			List<Ticket> tickets = (List<Ticket>) ticketDao.findAll();
			response.getTicketResponse().setTickets(tickets);
			response.setMetadata("OK", "00", "Successfull response");
		}catch (Exception e){
			response.setMetadata("KO", "-1", "Error");
			e.getStackTrace();
			return new ResponseEntity<TicketResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<TicketResponseRest>(response, HttpStatus.OK);
	}

	@Override
	@Transactional(readOnly = true)
	public ResponseEntity<TicketResponseRest> searchById(Long id) {
		TicketResponseRest response = new TicketResponseRest();
		List<Ticket> tickets = new ArrayList<>();
		
		try {
			Optional<Ticket> ticket = ticketDao.findById(id);
			if(ticket.isPresent()) {
				tickets.add(ticket.get());
				response.getTicketResponse().setTickets(tickets);
				response.setMetadata("OK", "00", "Successfull response");
			}else {
				response.setMetadata("KO", "-1", "Ticket not found");
				return new ResponseEntity<TicketResponseRest>(response, HttpStatus.NOT_FOUND);
			}
		}catch (Exception e){
			response.setMetadata("KO", "-1", "Error");
			e.getStackTrace();
			return new ResponseEntity<TicketResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<TicketResponseRest>(response, HttpStatus.OK);
	}

	@Override
	@Transactional
	public ResponseEntity<TicketResponseRest> save(Ticket ticket, Long categoryId) {
		TicketResponseRest response = new TicketResponseRest();
		List<Ticket> tickets = new ArrayList<>();
		
		try {
		
			Optional<Category> category = categoryDao.findById(categoryId);
			ticket.setCategory(category.get());
			
			Ticket ticketSaved  = ticketDao.save(ticket);
			if(ticketSaved != null) {
				tickets.add(ticketSaved);
				response.getTicketResponse().setTickets(tickets);
				response.setMetadata("OK", "00", "Ticket succesfully saved");
			}else {
				response.setMetadata("KO", "-1", "Ticket not saved");
				return new ResponseEntity<TicketResponseRest>(response, HttpStatus.BAD_REQUEST);
			}
			
		}catch (Exception e){
			response.setMetadata("KO", "-1", "Error");
			e.getStackTrace();
			return new ResponseEntity<TicketResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<TicketResponseRest>(response, HttpStatus.OK);

	}
	
	@Override
	@Transactional
	public ResponseEntity<TicketResponseRest> deleteById(Long id) {
		TicketResponseRest response = new TicketResponseRest();
		try {

			ticketDao.deleteById(id);
			response.setMetadata("OK", "00", "Ticket succesfully deleted");

		}catch (Exception e){
			response.setMetadata("KO", "-1", "Error deletting ticket");
			e.getStackTrace();
			return new ResponseEntity<TicketResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<TicketResponseRest>(response, HttpStatus.OK);
	}

	@Override
	@Transactional
	public ResponseEntity<TicketResponseRest> update(Ticket ticket, Long id) {
		TicketResponseRest response = new TicketResponseRest();
		List<Ticket> tickets = new ArrayList<>();
		
		try {
			Optional<Ticket> ticketSearch = ticketDao.findById(id);
			if(ticketSearch.isPresent()) {
				
				ticketSearch.get().setName(ticket.getName());
				ticketSearch.get().setDescription(ticket.getDescription());
				ticketSearch.get().setPriority(ticket.getPriority());
				ticketSearch.get().setCategory(ticket.getCategory());

				Ticket ticketToUpdate = ticketDao.save(ticketSearch.get());
				if(ticketToUpdate != null) {
					tickets.add(ticketToUpdate);
					response.getTicketResponse().setTickets(tickets);
					response.setMetadata("OK", "00", "Ticket succesfully updated");
				}else {
					response.setMetadata("KO", "-1", "Ticket not updated");
					return new ResponseEntity<TicketResponseRest>(response, HttpStatus.BAD_REQUEST);

				}
				
			}else {
				response.setMetadata("KO", "-1", "Ticket not found");
				return new ResponseEntity<TicketResponseRest>(response, HttpStatus.NOT_FOUND);
			}
		}catch (Exception e){
			response.setMetadata("KO", "-1", "Error");
			e.getStackTrace();
			return new ResponseEntity<TicketResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<TicketResponseRest>(response, HttpStatus.OK);
	}
}
