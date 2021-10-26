import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CommonService } from '../../../services/common.service';
import { AppConfig } from 'src/app/app.config';

@Component({
  selector: 'app-bill-form',
  templateUrl: './bill-form.component.html',
  styleUrls: ['./bill-form.component.scss']
})
export class BillFormComponent implements OnInit {
  public URLs:any = "";
  public submitted = false;
  public mobileNo:string = ""; 
  public medicineName:string = "";
  public quantity:any = "";
  public medicineNameList:string[] = [];
  public medicineList:any = [];
  public billMedicineList:any = [];
  public totalAmount:number = 0;
  constructor(public commonService:CommonService,private appConfig:AppConfig,) { }

  ngOnInit(): void {
    this.URLs = this.appConfig.config;
    this.getMedicineNameList()
  }

  public checkValidMobileNo()
  {
    if(this.mobileNo)
    {
      return this.mobileNo.length;
    }
  }

  public getMedicineNameList()
  {
    this.commonService.post(this.URLs.api.medicine_list).subscribe((response:any)=>{
      if(!response.error)
      {
        this.medicineList = response.data;
        this.medicineNameList = response.data.map((element:any)=>element.medicine_name);
      }
    })
  }

  public checkValidMedicine(name:string)
  {
    console.log(this.medicineNameList,name);
    let valid = this.medicineNameList.filter((element:any)=>element === name);
    (valid.length == 0)?this.medicineName = "":null;
  }

  public addMedicineInBill()
  {
    if(this.medicineName && this.quantity)
    {
      let list = this.medicineList.filter((element:any)=>element.medicine_name === this.medicineName && element.quantity >= this.quantity);
      if(list.length > 0)
      {
        let billList = {};
        billList["medicine_id"] = list[0]["medicine_id"];
        billList["medicine_name"] = list[0]["medicine_name"];
        billList["purchased_qty"] = this.quantity;
        billList["avaiable_qty"] = list[0]["price"];
        billList["price"] = list[0]["quantity"];
        billList["total"] = parseInt(this.quantity) * parseInt(list[0]["price"])
        this.billMedicineList.push(billList);
        this.medicineName = "" ;this.quantity = "";
        this.calculateTotal();
      }
    }
  }

  public removeMedicineInBill(item:any)
  {
    let index = this.billMedicineList.indexOf(item)
    if(index !== -1)
    {
      this.billMedicineList.splice(index,1);
      this.calculateTotal();
    }
  }

  public calculateTotal()
  {
    this.totalAmount = this.billMedicineList.reduce((a, b)=> a.total + b.total );
  }

}
