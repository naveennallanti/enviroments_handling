import { Component } from '@angular/core';
import {ServiceService} from './app.service.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// export class AppComponent {
//   title = 'UI';
// }


export class AppComponent {
  envObj: any;
  process:String="PROCESS1";
  slected_process:String;
  key:String;
  value:String;
  constructor(private envservice: ServiceService) { }

  ngOnInit() {
    this.getEnv_cmp(this.process);
  }

  getEnv_cmp(process) {
    this.envservice.getEnv(process).subscribe((res)=>{
      console.log("res",res);
      this.envObj=res.data;
    },(err)=>{
     console.log("err",err);               
    })
   }

   addOrUpdate(){
     console.log("submitted",this.slected_process);
     let process=this.slected_process;
     let key=this.key;
     let value=this.value;
     console.log(process,key,value);
     this.envservice.addOrUpdate(process,key,value).subscribe((res)=>{
      console.log("res",res);
      this.envObj=res.data;
      this.getEnv_cmp(this.slected_process)
    },(err)=>{
     console.log("err",err);               
    })
   }
}