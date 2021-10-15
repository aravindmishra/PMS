import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-bill-form',
  templateUrl: './bill-form.component.html',
  styleUrls: ['./bill-form.component.scss']
})
export class BillFormComponent implements OnInit {

  public mobileNo:any = new FormControl; 
  constructor(public commonService:CommonService) { }

  ngOnInit(): void {
  }

  public checkValidMobileNo()
  {
    console.log(this.mobileNo)
    if(this.mobileNo)
    {
      return this.mobileNo.length;
    }
  }

}
