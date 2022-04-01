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
  set_data_test = []

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
  download(){
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + 
      encodeURIComponent(JSON.stringify(this.set_data)));
    element.setAttribute('download', 'flashcards.txt');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }
  fileImported(event:any){
    var file : File = event.target.files[0]
    let test1 : any = []
    file.text().then((response) => {test1 = response}).then(() => {this.saveImport(test1)})
  }
  saveImport(importData : any){
    importData = JSON.parse(importData)
    let usedIDs : number[] = []
    this.set_data.forEach(element => {usedIDs.push(element.id)})
    for (let i = 0; i < importData.length; i++){
      let isSameName = false
      for (let j = 0; j < this.set_data.length; j++){
        if (importData[i].name == set_data[j].name){
          isSameName = true
          console.log('A set with this name already exists:', importData[i].name)
        }
      }
      if ( (isSameName == false) && (usedIDs.includes(importData[i].id)) ){
        let newID = 0
        while (usedIDs.includes(newID)){
          newID =+ 1
        }
        importData[i].id = newID
      }
      if (isSameName == false){
        this.set_data.push(importData[i])
      }
    }
    localStorage.setItem('storedSets',JSON.stringify(this.set_data))
  }
}
