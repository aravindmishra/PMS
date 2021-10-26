import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AppConfig {

    public config: any = {};
    private env:    any = {};

    constructor(private http: HttpClient) { }

    public load()
    {
        return new Promise((resolve, reject)=> {
            setTimeout(()=> {
                this.http.get('../assets/config/config.json').subscribe((response:any)=>{
                    //console.log(response);
                    this.config = response;
                    resolve(true)
                })
            }, 0);
        });
    }
}