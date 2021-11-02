import { Component, OnInit } from '@angular/core';
import { AppConfig } from 'src/app/app.config';
import { CommonService } from 'src/app/services/common.service';
import { MedicineService } from '../services/medicine.service';
@Component({
  selector: 'app-medicine-details-list',
  templateUrl: './medicine-details-list.component.html',
  styleUrls: ['./medicine-details-list.component.scss']
})
export class MedicineDetailsListComponent implements OnInit {
  public URLs:any = "";
  public medicineList:any = [];
  public filterMedicineList:any = [];
  public search:string = "";
  constructor(private appConfig:AppConfig, private commonService:CommonService,private medicineService:MedicineService) {
   }

  ngOnInit(): void {
    this.medicineService.routerState = false;
    this.URLs = this.appConfig.config;
    this.getMedicineList()
  }

  public getMedicineList()
  {
    this.commonService.LOADING = true;
    this.commonService.post(this.URLs.api.medicine_list).subscribe((response:any)=>{
      if(!response.error)
      {
        this.medicineList = response.data;
        this.filterMedicineList = this.medicineList;
        this.medicineService.medicineNameList = this.medicineList.map((element:any)=>element.medicine_name);
        this.medicineService.allocatedRackList = response.data.map((element:any)=>element.rack_no);
        this.commonService.LOADING = false;
      }
    },(error)=>{
      console.log(error);
      this.commonService.LOADING = false;
    })
  }

  public searchFilter(searchValue:string)
  {
    if(searchValue)
    {
      this.filterMedicineList = this.medicineList.filter((element:any)=> element.medicine_name.toLowerCase().includes(searchValue));
    }
    else
    {
      this.filterMedicineList = this.medicineList;
    }
  }

  public addNewMedicine()
  {
    this.medicineService.submitState = 'Save';
    this.medicineService.submitted = false;
    this.commonService.redirect("/medicine/form");
    this.medicineService.medicineForm.reset({
      status:1
    });
  }

  public updateMedicine(item:any)
  {
    if(item)
    {
      console.log(item)
      this.medicineService.updateId = item.medicine_id;
      this.medicineService.submitState = 'Update';
      this.removeUpdateRack(item.rack_no);
      this.medicineService.medicineForm.get("rack_no").setValue(item.rack_no);
      this.medicineService.medicineForm.reset(item);
      (item.status == 'Active')?this.medicineService.medicineForm.get('status').setValue(1):this.medicineService.medicineForm.get('status').setValue(2);
      this.commonService.redirect("/medicine/form");
    }
  }
  
  public removeUpdateRack(rack_no:number)
  {
    if(rack_no)
    {
      let index = this.medicineService.allocatedRackList.indexOf(rack_no);
      (index != -1)?this.medicineService.allocatedRackList.splice(index,1):null;
      this.medicineService.getRackList();
      debugger;
    }
  }

}
