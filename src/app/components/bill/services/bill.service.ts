import { Injectable } from '@angular/core';
import { NgxNumToWordsService, SUPPORTED_LANGUAGE } from 'ngx-num-to-words';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  public billMedicineList: any = [];
  public totalAmount: number = 0;
  public customerName: string = "";

  lang: SUPPORTED_LANGUAGE = 'en';

  constructor(private ngxNumToWordsService: NgxNumToWordsService) { }

  public convertNumberToWords(value:number)
  {
    return this.ngxNumToWordsService.inWords(value, this.lang);
  }

  public calculateTotal() {
    if (this.billMedicineList.length === 0) {
      this.totalAmount = 0
    }
    else {
      (this.billMedicineList.length > 1) ? this.totalAmount = this.billMedicineList.reduce((a, b) => a.total + b.total) : this.totalAmount = this.billMedicineList[0]["total"];
    }
  }
}
