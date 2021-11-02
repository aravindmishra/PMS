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
}
