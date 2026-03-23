package com.pastor.helpdesk.response;

import java.util.List;

import com.pastor.helpdesk.model.Ticket;

import lombok.Data;

@Data
public class TicketResponse {
	private List<Ticket> tickets;

}
