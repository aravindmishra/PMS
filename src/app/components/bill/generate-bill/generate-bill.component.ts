import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { BillService } from '../services/bill.service';
import { AppConfig } from 'src/app/app.config';
@Component({
  selector: 'app-generate-bill',
  templateUrl: './generate-bill.component.html',
  styleUrls: ['./generate-bill.component.scss']
})
export class GenerateBillComponent implements OnInit {
  public URLs: any = "";
  @Input() customerMobileNo:string = "";
  @Input() customerName:string = "";

  public todayDate = new Date();

  constructor(public commonService: CommonService,private appConfig: AppConfig,public billService:BillService) { 
    this.URLs = this.appConfig.config;
  }

  ngOnInit(): void {
    console.log(this.billService.convertNumberToWords(1234))
  }

}
