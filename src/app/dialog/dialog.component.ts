import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
 
  myform!:FormGroup;
  actionbtn:string= "Save";

  constructor(private myfb:FormBuilder,private api:ApiService,
    @Inject(MAT_DIALOG_DATA) public edit:any,private dialogref:MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.myform=this.myfb.group({
      email:['',Validators.required],
      first_name:['',Validators.required],
     last_name:['',Validators.required],
     avatar:['',Validators.required]
    })
   if(this.edit){
    this.actionbtn="update"
    this.myform.controls['email'].setValue(this.edit.email);
    this.myform.controls['first_name'].setValue(this.edit.first_name);
    this.myform.controls['last_name'].setValue(this.edit.last_name);
    this.myform.controls['avatar'].setValue(this.edit.avatar);
   }
  }
  add(){
 if(!this.edit){
  if(this.myform.valid){
    console.log(this.myform.value);
    
    this.api.postData(this.myform.value)
    .subscribe({
      next:(res:any)=>{
        alert('job added successfully')
        this.myform.reset();
        this.dialogref.close('save');
      
      },
      error:()=>{
        alert('something went wrong')
      }
    })

  }
 }else{
  this.updatedata()
 }
}
updatedata(){
  this.api.putData(this.myform.value,this.edit.id)
  .subscribe({
    next:(res:any)=>{
     alert('product added succesfully')
     this.myform.reset();
     this.dialogref.close('update')
    },
    error:()=>{
    alert('something went wrong')
    }
  })
}
}
