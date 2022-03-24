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
    let i = 0
    while(this.set_data[i].id != id){
      i++
    }
    this.set_data.splice(i,1)
    localStorage.setItem('storedSets',JSON.stringify(this.set_data))
  }

  favouriteSet(i : number,event:Event){
    event.stopPropagation()
    if (this.set_data[i].favourite){
      this.set_data[i].favourite = false
      let deletedObject = this.set_data[i]
      this.set_data.splice(i,1)
      this.set_data.push(deletedObject)
    }
    else{
      this.set_data[i].favourite = true
      let deletedObject = this.set_data[i]
      this.set_data.splice(i,1)
      this.set_data.unshift(deletedObject)
    }
    localStorage.setItem('storedSets',JSON.stringify(this.set_data))
  }
}
