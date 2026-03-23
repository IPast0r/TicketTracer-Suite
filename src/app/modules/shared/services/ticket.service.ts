import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const base_url = "http://localhost:8080/api/v1"

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  getTickets(){
    const endpoint =`${base_url}/tickets`;
    return this.http.get(endpoint);
  }

  saveTickets(body: any){
    const endpoint =`${base_url}/tickets`;
    return this.http.post(endpoint, body);
  }

  updateTickets(body: any, id: any){
    const endpoint =`${base_url}/tickets/${id}`;
    return this.http.put(endpoint, body);
  }

  deleteTickets(id: any){
    const endpoint =`${base_url}/tickets/${id}`;
    return this.http.delete(endpoint);
  }

  getTicketById(id: any){
    const endpoint =`${base_url}/tickets/${id}`;
    return this.http.get(endpoint);
  }

}
