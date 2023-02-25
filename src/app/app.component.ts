import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';  
import { MatPaginator } from '@angular/material/paginator';

import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import { datainterface } from './services/getdata';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'task';
  displayedColumns: string[] = ['email', 'first_name', 'last_name', 'avatar', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  data: any;
 
  constructor(private dialog:MatDialog,private api:ApiService){}

  ngOnInit(): void {
    this.getcall();
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
     width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getcall()
      }
    })
  }

  getcall(){
    this.api.getData().subscribe({
     next:(res:any)=>{
      console.log(res)
      
      this.dataSource=new MatTableDataSource(res.data);
      this.dataSource.paginator=this.paginator
      console.log(this.dataSource.data)
      
     },
     error:(err)=>{
      alert('error occured')
     }
    })
  }
  edit(row:any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val === 'update'){
        this.getcall()
      }
    })
  }
  delete(id:number){
    this.api.delete(id)
    .subscribe({
      next:(res:any)=>{
        alert('deleted successfully');
        console.log(res)
        this.getcall()
      },
      error:()=>{
        alert('something wrong')
      }
    })
  }

}
