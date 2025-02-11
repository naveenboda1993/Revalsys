import { Component } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, MinLengthValidator, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  registration!:FormGroup;
  registarData:  Array<any>;
  errorMessage!: string;
  showSpinner = false;
  getData: any;
  isedit:boolean=false;

constructor( private fb: FormBuilder){

  this.registration = this.fb.group({
    employeeid:['', Validators.required],
    name:['', Validators.required],
    email:['', Validators.required],
    salary:['', Validators.required],
    phonenumber:['', Validators.required],
    qualification:['', Validators.required],
    designation:['', Validators.required],
    gender:['', Validators.required],
  })
  var data=localStorage.getItem("data");
  console.log(data);
  if(data){
    this.registarData=JSON.parse(data);
  }else{
    this.registarData=[];
  }
 
}
 register(){
   (  err: { error: { msg: { message: string; }[]; message: string; }; })=>{
    this.showSpinner= false;
    console.log(err);
  }
 }

 onSubmit(){
  if(this.isedit){
    
  }
   this.registarData.push(this.registration.value);
   this.registration.reset();
   localStorage.setItem("data",JSON.stringify(this.registarData));
   this.display();
   this.isedit=false;
  // var registarData ={'employeeid':'', 'name':'', 'email': '', 'salary':''}
  // localStorage.setItem('getData', JSON.stringify(this.registarData.value));
  // let data = JSON.parse(localStorage.getItem('getData')||'');
  // console.log(data)
  // var getData = localStorage.getItem('registarData')
  // this.getData = JSON.parse(localStorage.getItem('getData')||'{}');
  // console.log('getData:', JSON.parse(localStorage.getItem('getData') ||'{}'));
  // localStorage.setItem('data', JSON.stringify(registarData))
  // const registarData = JSON.parse(localStorage.getItem('registarData'));
  // console.log('')
 }

 display(){
   return localStorage.getItem('registration')
 }

reset(){
  this.registration.reset();
}
edit(editid:any){
  this.registarData.forEach(element => {
    if(element.employeeid===editid){
      this.registration.setValue(element);
      this.isedit=true;
      var index = this.registarData.indexOf(element);
      if (index !== -1) {
        this.registarData.splice(index, 1);
        localStorage.setItem("data",JSON.stringify(this.registarData));
      }

    }
  });
  // this.registarData.edit();
}
remove(deleteid:any){
  // this.registarData.remove();
  alert("are you sure ?");
  this.registarData.forEach(element => {
    if(element.employeeid===deleteid){
      var index = this.registarData.indexOf(element);
      if (index !== -1) {
        this.registarData.splice(index, 1);
        localStorage.setItem("data",JSON.stringify(this.registarData));
      }
    }
  });
}
}
