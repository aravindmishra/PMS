import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { AppConfig } from 'src/app/app.config';
import { formatDate } from "@angular/common";
@Component({
  selector: 'app-purchase-histoty',
  templateUrl: './purchase-histoty.component.html',
  styleUrls: ['./purchase-histoty.component.scss']
})
export class PurchaseHistotyComponent implements OnInit {
  public URLs:any = "";
  public listIndex = 0;
  public purchaseList:any = [];
  public filteredpurchaseList:any = [];
  public p: number = 1;
  public format = 'yyyy-MM-dd';
  public locale = 'en-US';
  public formattedDate;
  public filterContent:any = {
    mobile_no:'',
    medicine_name:'',
    date:''
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
        this.filteredpurchaseList = this.purchaseList;
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
    if(this.filterContent.mobile_no != "" || this.filterContent.medicine_name != "" || this.filterContent.date != "")
    {

      this.filterContent = {
        mobile_no:'',
        medicine_name:'',
        date:''
      };
      // this.filterPurchaseList();
      this.filteredpurchaseList = this.purchaseList;
      this.p = 0;
    }
  }

  public filter()
  {
    let filter = this.purchaseList.filter((element:any)=>{
      if(this.filterContent.mobile_no && this.filterContent.medicine_name && this.filterContent.date)
      {
        return element.mobile_no.includes(this.filterContent.mobile_no) && element.medicine_name.toLowerCase().includes(this.filterContent.medicine_name) && formatDate(element.created_date, this.format, this.locale).includes(this.filterContent.date);
      }
      else
      {
        if(this.filterContent.mobile_no)
        {
          return element.mobile_no.includes(this.filterContent.mobile_no);
        }
        else if(this.filterContent.medicine_name) {
          return element.medicine_name.toLowerCase().includes(this.filterContent.medicine_name);
        }
        else if(this.filterContent.date) {          
          return formatDate(element.created_date, this.format, this.locale).includes(this.filterContent.date);
        }
        else{
          this.filteredpurchaseList = this.purchaseList;
        }
      }      
    })
    this.filteredpurchaseList = filter;
    this.p = 0;
  }

}
