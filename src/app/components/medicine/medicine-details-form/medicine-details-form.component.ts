import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service';
@Component({
  selector: 'app-medicine-details-form',
  templateUrl: './medicine-details-form.component.html',
  styleUrls: ['./medicine-details-form.component.scss']
})
export class MedicineDetailsFormComponent implements OnInit {

  public rackList:number[] = [];
  public alreadyExsistName:boolean = false;
  public medicineName:string = "";
  public medicineNameList:string[] = ["Rg","RX","Paracine","MC"];
  constructor(private commonService:CommonService) { }

  ngOnInit(): void {
    this.getRackList();
    this.medicineNameList = this.medicineNameList.map(name => name.toLocaleLowerCase());
  }

  public getRackList()
  {
    for(let i = 1; i<=10; i++)
    {
      this.rackList.push(i);
    }
  }

  public cancel()
  {
    this.commonService.redirect("/medicine/list")
  }

  public checkMedicineNameExistorNot(name:string)
  {
    if(name)
    {
      name = name.toLocaleLowerCase();
      let check = this.medicineNameList.some((element:string)=>element === name);
      this.alreadyExsistName = (check)?true:false;
    }
  }

}
