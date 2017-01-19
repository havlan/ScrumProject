import { Component, AfterViewInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'my-app',
  templateUrl: `app.component.html`,
  styleUrls: ['app.component.css']
})
export class AppComponent  {
  name = 'Angular';

  ngAfterViewInit(){
    console.log("hei");
    $.get('/getEmployee', {}, function(data){

      console.log(data);
      console.log(data[1]);


      console.log("hentet data");

    });
  }

}
