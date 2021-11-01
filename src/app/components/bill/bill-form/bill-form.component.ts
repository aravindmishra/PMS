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
  public URLs: any = "";
  public submitted:boolean = false;
  public mobileNo: string = "";
  public medicineName: string = "";
  public customerName: string = "";
  public quantity: any = "";
  public medicineNameList: string[] = [];
  public medicineList: any = [];
  public billMedicineList: any = [];
  public totalAmount: number = 0;
  public disableNameBox: boolean = false;
  public availableQtyAlert:string = "";
  constructor(public commonService: CommonService, private appConfig: AppConfig,) { }

  ngOnInit(): void {
    this.URLs = this.appConfig.config;
    this.getMedicineNameList()
  }

  public checkValidMobileNo() {
    if (this.mobileNo) {
      return this.mobileNo.length;
    }
  }

  public getMedicineNameList() {
    this.commonService.post(this.URLs.api.medicine_list).subscribe((response: any) => {
      if (!response.error) {
        this.medicineList = response.data;
        this.medicineNameList = response.data.map((element: any) => element.medicine_name);
        this.medicineNameList.sort()
      }
    }, (error) => {
      console.log(error);
    })
  }

  public checkValidMedicine(name: string) {
    let valid = this.medicineNameList.filter((element: any) => element === name);
    (valid.length == 0) ? this.medicineName = "" : null;
  }

  public addMedicineInBill() {
    if (this.medicineName && this.quantity > 0) {
      let list = this.medicineList.filter((element: any) => element.medicine_name === this.medicineName && element.quantity >= this.quantity);
      if (list.length > 0) {
        let billList = {};
        billList["medicine_id"] = list[0]["medicine_id"];
        billList["medicine_name"] = list[0]["medicine_name"];
        billList["purchased_qty"] = this.quantity;
        billList["avaiable_qty"] = list[0]["quantity"];
        billList["price"] = list[0]["price"];
        billList["total"] = parseInt(this.quantity) * parseInt(list[0]["price"])
        this.billMedicineList.push(billList);
        this.medicineName = ""; this.quantity = "";
        this.calculateTotal();
        this.balanceMedicineList("add",billList["medicine_name"]);
      }
    }
  }

  public checkQuantity()
  {
    if (this.medicineName && this.quantity) {
      let list = this.medicineList.filter((element: any) => element.medicine_name === this.medicineName );
      if(list.length > 0)
      {
        if(list[0]['quantity']>= this.quantity) {
          this.availableQtyAlert = "";
          this.addMedicineInBill();
        }
        else {
          this.availableQtyAlert = "Available Quantity : "+ list[0]['quantity'];
          // this.commonService.warningMessage(this.availableQtyAlert);
        }
      }
    }
  }

  public removeMedicineInBill(item: any) {
    let index = this.billMedicineList.indexOf(item)
    if (index !== -1) {
      this.billMedicineList.splice(index, 1);
      this.calculateTotal();
      this.balanceMedicineList("removed",item.medicine_name);
    }
  }

  public calculateTotal() {
    if (this.billMedicineList.length === 0) {
      this.totalAmount = 0
    }
    else {
      (this.billMedicineList.length > 1) ? this.totalAmount = this.billMedicineList.reduce((a, b) => a.total + b.total) : this.totalAmount = this.billMedicineList[0]["total"];
    }
  }

  public checkCustomer() {
    console.log("ENTER")
    // this.disableNameBox = true;
    if (this.checkValidMobileNo() == 10) {
      let requestData = new FormData()
      requestData.append("mobile_no", this.mobileNo);
      this.commonService.post(this.URLs.api.check_customer_exist, requestData).subscribe((response: any) => {
        console.log(response);
        if (!response.error) {
          if (response.status_code == 200) {
            this.customerName = response.data["name"];
            // this.disableNameBox = true;
          }
          else if (response.status_code == 201) {
            this.customerName = "";
            // this.disableNameBox = false;
          }
        }
      }, (error) => {
        console.log(error);
      })
    }
  }

  public submit()
  {
    this.submitted = true;
    if(this.medicineName && this.customerName && this.mobileNo && this.quantity)
    {
      if(this.checkValidMobileNo()== 10)
      {
        this.checkQuantity();
        this.submitted = false;
      }
    }
  }

  public balanceMedicineList(state:string,medicine:any)
  {
    if(state == 'add')
    {
      let index = this.medicineNameList.indexOf(medicine);
      (index != -1)? this.medicineNameList.splice(index,1):null;
    }
    else if(state == 'removed')
    {
      this.medicineNameList.push(medicine);
    }
    this.medicineNameList.sort()
  }

  public submitBill()
  {
    console.log(this.customerName,this.mobileNo,this.billMedicineList);
    let requestData = new FormData()
    requestData.append("name", this.customerName);
    requestData.append("mobile_no", this.mobileNo);
    requestData.append("bill_medicine_list", JSON.stringify(this.billMedicineList));
    this.commonService.post(this.URLs.api.add_bill, requestData).subscribe((response: any) => {
      console.log(response);
      if (!response.error) {
        if (response.status_code == 200) {
          this.commonService.successMessage("Bill Generatored..!")
        }
      }
    }, (error) => {
      console.log(error);
    })
  }

}
