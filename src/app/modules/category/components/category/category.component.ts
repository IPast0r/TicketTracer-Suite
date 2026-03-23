import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  private categoryService = inject(CategoryService);
  public dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.getCategories();
  }

  displayedColumns: string[] = ['id','name','description','actions'];
  dataSource = new MatTableDataSource<CategoryElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

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
        dataCategory.push(element);
      });
      this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);
      this.dataSource.paginator = this.paginator;
    }

  }

  openCategoryDialog(){
    const dialogRef = this.dialog.open( NewCategoryComponent ,{
      width: '950px'
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      if( result == 1){
        this.openSnackBar("Category created", "Success");
        this.getCategories();
      }else if( result == 2 ){
        this.openSnackBar("Error creating category", "Error");
      }
    });
  }

  edit(id: number , name: string , description: string){
    const dialogRef = this.dialog.open( NewCategoryComponent ,{
      width: '950px',
      data:{id: id, name: name, description: description}
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      if( result == 1){
        this.openSnackBar("Category updated", "Success");
        this.getCategories();
      }else if( result == 2 ){
        this.openSnackBar("Error updating category", "Error");
      }
    });   
  }

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message,action , {
      duration: 2000
    });
  }

  delete(id: any){
    const dialogRef = this.dialog.open( ConfirmComponent ,{
      width: '450px',
      data:{id: id, type: "Category"}
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      if( result == 1){
        this.openSnackBar("Category deleted", "Success");
        this.getCategories();
      }else if( result == 2 ){
        this.openSnackBar("Error deleting category", "Error");
      }
    });   
  }

  search(value: string){
    if(value.length == 0){
      return this.getCategories();
    }

    this.categoryService.getCategoryById(value)
      .subscribe((resp:any) => {
        this.processCategoriesResponse(resp);
      });
  }

}

export interface CategoryElement {
  description: string;
  id: number;
  name: string;
}