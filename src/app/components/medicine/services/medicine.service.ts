import { Injectable } from '@angular/core';
import { FormControl, FormGroup,Validators} from '@angular/forms';
import { AppConfig } from 'src/app/app.config';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  public submitted = false;
  public rackList:number[] = [];
  public medicineNameList:string[] = ["Rg","RX","Paracine","MC"];
  public submitState:string="Save";
  public allocatedRackList:number[] = [];
  public updateId:number = 0;
  public medicineForm = new FormGroup({
    rack_no :new FormControl(),
    medicine_name :new FormControl('',Validators.required),
    brand :new FormControl('',Validators.required),
    power :new FormControl('',Validators.required),
    price :new FormControl('',Validators.required),
    quantity :new FormControl('',Validators.required),
  })

  constructor(private appConfig:AppConfig) { 
  }

  public getRackList()
  {
    this.rackList = [];
    for(let i = 1; i<=20; i++)
    {
      if(!this.allocatedRackList.includes(i))
      {
        this.rackList.push(i);
      }
    }
    this.medicineForm.get("rack_no").setValue(this.rackList[0])
  }

  

}
