package com.pastor.helpdesk.dao;

import org.springframework.data.repository.CrudRepository;

import com.pastor.helpdesk.model.Ticket;

public interface ITicketDao extends CrudRepository<Ticket, Long>{

}
