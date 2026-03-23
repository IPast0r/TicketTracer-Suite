import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TicketService } from '../../shared/services/ticket.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { NewTicketComponent } from '../new-ticket/new-ticket.component';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit{

  private ticketService = inject(TicketService);
  public dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);


  ngOnInit(): void {
    this.getTickets();
  }

  displayedColumns: string[] = ['id','name','description','priority' ,'category', 'actions'];
  dataSource = new MatTableDataSource<TicketElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getTickets(): void {
  this.ticketService.getTickets()
    .subscribe((data:any) => {
      this.processTicketsResponse(data);
    }, (error: any) => {
      console.log("error", error);
    })
  }

  processTicketsResponse(resp: any){
    const dataTicket: TicketElement[] = [];

    if ( resp.metadata[0].code == "00"){
      let listTicket= resp.ticketResponse.tickets;
      
      listTicket.forEach((element: TicketElement) => {
        dataTicket.push(element);
      });
      this.dataSource = new MatTableDataSource<TicketElement>(dataTicket);
      this.dataSource.paginator = this.paginator;
    }

  }

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message,action , {
      duration: 2000
    });
  }

  openCategoryDialog(){
    const dialogRef = this.dialog.open( NewTicketComponent ,{
      width: '950px'
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      if( result == 1){
        this.openSnackBar("Ticket created", "Success");
        this.getTickets();
      }else if( result == 2 ){
        this.openSnackBar("Error creating ticket", "Error");
      }
    });
  }

  delete(id: any){
    const dialogRef = this.dialog.open( ConfirmComponent ,{
      width: '450px',
      data:{id: id, type: "Ticket"}
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      if( result == 1){
        this.openSnackBar("Ticket deleted", "Success");
        this.getTickets();
      }else if( result == 2 ){
        this.openSnackBar("Error deleting ticket", "Error");
      }
    });   
  }

  search(value: string){
    if(value.length == 0){
      return this.getTickets();
    }

    this.ticketService.getTicketById(value)
      .subscribe((resp:any) => {
        this.processTicketsResponse(resp);
      });
  }

}

export interface TicketElement {
  description: string;
  id: number;
  name: string;
  priority: number;
  category: any;
}