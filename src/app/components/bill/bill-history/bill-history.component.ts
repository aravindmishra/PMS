import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { AppConfig } from 'src/app/app.config';
import { BillService } from '../services/bill.service';

@Component({
  selector: 'app-bill-history',
  templateUrl: './bill-history.component.html',
  styleUrls: ['./bill-history.component.scss']
})
export class BillHistoryComponent implements OnInit {
  public URLs: any = "";
  public mobileNo:string = "";
  public customerName:string = "";
  public billList:any = [];
  constructor(public commonService: CommonService, private appConfig: AppConfig,public billService:BillService) { }

  ngOnInit(): void {
    this.URLs = this.appConfig.config;
    this.getBillList();
  }

  public getBillList()
  {
    this.commonService.post(this.URLs.api.bill_list).subscribe((response:any)=>{
      console.log(response)
      if(!response.error)
      {
        this.billList = response.data;
      }
    },(error)=>{
      console.log(error);
    })
  }

  public setBill(data:any)
  {
    this.billService.billMedicineList = [];
    if(data)
    {
      this.mobileNo = data.mobile_no;
      this.customerName = data.name;
      this.billService.billMedicineList = data.bill_data;
      this.billService.calculateTotal();
    }
  }

}
