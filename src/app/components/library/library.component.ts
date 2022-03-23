import { set_data } from './../../sets-data';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.sass']
})
export class LibraryComponent implements OnInit {

  set_data = set_data
  removeActive = false

  constructor(private router: Router) { }

  ngOnInit(): void {

    if (localStorage.getItem('storedSets') === null){
      this.set_data = set_data
    }
    else{
      this.set_data = JSON.parse(localStorage.getItem('storedSets')!)
    }
    

  }

  selectSet(set:any){
    this.router.navigate(["library",set.id])
  }

  removeToggle(){
    if (this.removeActive === false){
      this.removeActive = true
    }
    else{
      this.removeActive = false
    }
  }
  removeSet(id:number){
    console.log(id)
    let i = 0
    while(this.set_data[i].id != id){
      i++
    }
    console.log(this.set_data[i]);
    this.set_data.splice(i,1)
    console.log(this.set_data);
    localStorage.setItem('storedSets',JSON.stringify(this.set_data))
  }
}
