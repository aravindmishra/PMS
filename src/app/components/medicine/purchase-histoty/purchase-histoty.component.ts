import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { AppConfig } from 'src/app/app.config';
@Component({
  selector: 'app-purchase-histoty',
  templateUrl: './purchase-histoty.component.html',
  styleUrls: ['./purchase-histoty.component.scss']
})
export class PurchaseHistotyComponent implements OnInit {
  public URLs:any = "";
  public purchaseList:any = [];
  public p: number = 1;
  public filterContent:any = {
    mobile_no:'',
    medicine_name:''
  };
  public filterBlock:boolean = false;
  constructor(public commonService:CommonService, private appConfig:AppConfig) { }

  ngOnInit(): void {
    this.URLs = this.appConfig.config;
    this.getPurchaseList();
  }

  public getPurchaseList()
  { 
    this.commonService.LOADING = true;
    this.commonService.post(this.URLs.api.purchase_history).subscribe((response:any)=>{
      console.log(response);
      if(!response.error)
      {
        this.purchaseList = response.data;
        this.commonService.LOADING = false;
      }
    },(error)=>{
      console.log(error);
      this.commonService.LOADING = false;
    })
  }

  public filterPurchaseList()
  { 
    this.commonService.LOADING = true;
    let requestData = new FormData()
    requestData.append("filter",JSON.stringify(this.filterContent))
    this.commonService.post(this.URLs.api.filter_purchase_history, requestData).subscribe((response:any)=>{
      console.log(response);
      if(!response.error)
      {
        this.purchaseList = response.data;
        this.commonService.LOADING = false;
      }
    },(error)=>{
      console.log(error);
      this.commonService.LOADING = false;
    })
  }

  public resetFilter()
  {
    if(this.filterContent.mobile_no != "" || this.filterContent.medicine_name != "")
    {
      this.filterContent = {
        mobile_no:'',
        medicine_name:''
      };
      this.filterPurchaseList();
    }
  }

}
