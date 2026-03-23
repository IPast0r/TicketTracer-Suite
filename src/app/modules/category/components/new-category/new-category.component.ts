import { Component , inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/modules/shared/services/category.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit{

  public categoryForm!: FormGroup;
  formState: string = "";
  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private dialogRef = inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);

  ngOnInit(): void {

    this.formState = "Add";
    this.categoryForm = this.fb.group({
      name: ['',Validators.required],
      description: ['',Validators.required]
    })

    if(null != this.data){
      this.updateForm(this.data);
      this.formState = "Update";
    }
  }

  onSave(){
    let data ={
      name: this.categoryForm.get('name')?.value,
      description: this.categoryForm.get('description')?.value,
    }
    
    if(null != this.data){
      this.categoryService.updateCategories(data, this.data.id)
        .subscribe( (data : any) => {
          this.dialogRef.close(1);
        }),(error: any) => {
          this.dialogRef.close(2);
        }
      }else {
      this.categoryService.saveCategories(data)
        .subscribe( (data : any) => {
          this.dialogRef.close(1);
        }),(error: any) => {
          this.dialogRef.close(2);
        }
    }
  }
  onCancel(){
    this.dialogRef.close();
  }

  updateForm(data: any){
    this.categoryForm = this.fb.group({
      name: [data.name,Validators.required],
      description: [data.description,Validators.required]
    })
  }
}
