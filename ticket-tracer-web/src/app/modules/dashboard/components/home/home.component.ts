import { Component, inject, OnInit } from '@angular/core';
import { CategoryElement } from 'src/app/modules/category/components/category/category.component';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import { TicketService } from 'src/app/modules/shared/services/ticket.service';
import { TicketElement } from 'src/app/modules/ticket/ticket/ticket.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  public tickets: Ticket[] = [];
  public categories: Category[] = [];

  ngOnInit(): void {

    this.getTickets();
    this.getCategories();

  }

  private ticketService = inject(TicketService);
  private categoryService = inject(CategoryService);
  
  getTickets(): void {
  this.ticketService.getTickets()
    .subscribe((data:any) => {
      this.processTicketsResponse(data);
    }, (error: any) => {
      console.log("error", error);
    })
  }

  processTicketsResponse(resp: any){

    if ( resp.metadata[0].code == "00"){
      let listTicket= resp.ticketResponse.tickets;
      
      listTicket.forEach((element: TicketElement) => {
        this.tickets.push(element);
      });

      const totalTickets = document.getElementById('totalTickets');
      if (totalTickets) {
        totalTickets.innerHTML = 'Total tickets: ' + listTicket.length;
      }

    }

  }

    getCategories(): void {
      this.categoryService.getCategories()
        .subscribe((data:any) => {
          this.processCategoriesResponse(data);
        }, (error: any) => {
          console.log("error", error);
        })
    }
  
    processCategoriesResponse(resp: any){
      const dataCategory: CategoryElement[] = [];
  
      if ( resp.metadata[0].code == "00"){
        let listCategory = resp.categoryResponse.category;
        
        listCategory.forEach((element: CategoryElement) => {
          this.categories.push(element);
        });

        const totalCategories = document.getElementById('totalCategories');
        if (totalCategories) {
          totalCategories.innerHTML = 'Total categories: ' + listCategory.length;
        }

      }
  
    }

}

export interface Ticket {
  description: string;
  id: number;
  name: string;
  priority: number;
  category: any;
}

export interface Category {
  description: string;
  id: number;
  name: string;
}