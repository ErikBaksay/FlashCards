import { Router } from '@angular/router';
import { set_data } from './../../sets-data';
import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs';

@Component({
  selector: 'app-set-creator',
  templateUrl: './set-creator.component.html',
  styleUrls: ['./set-creator.component.sass']
})
export class SetCreatorComponent implements OnInit {

  questions : string[][] = []
  setNameValue : string = ''
  usedIDs : number[] = []
  set_data = set_data

  constructor(private router : Router) { }

  ngOnInit(): void {

    if (localStorage.getItem('storedSets') === null){
      this.set_data = set_data
    }
    else{
      this.set_data = JSON.parse(localStorage.getItem('storedSets')!)
    }
    
  }

  removeQuestion(question:any){
    this.questions.splice(this.questions.indexOf(question),1)  
  }

  addQuestion(){
    this.questions.push(['',''])
  }

  saveSet(){
    this.setNameValue = (<HTMLInputElement>document.getElementById('setName')).value
    for (let i = 0; i < this.questions.length; i++){
      this.questions[i] = [
          (<HTMLInputElement>document.getElementById('question'+i+'')).value,
          (<HTMLInputElement>document.getElementById('answer'+i+'')).value
        ]
    }

    for (let i = 0; i < this.set_data.length; i++){
      if (!(this.usedIDs).includes(this.set_data[i].id)){
        this.usedIDs.push(this.set_data[i].id) 
      }
    }
    let setID = 0
    console.log(this.usedIDs);
    
    while (this.usedIDs.includes(setID)){
      setID++
    }
    this.usedIDs.push(setID)
    this.set_data.push({
      id : setID,
      name : this.setNameValue,
      favourite: false,
      questions : this.questions
    })
    
    localStorage.setItem('storedSets',JSON.stringify(this.set_data))
    this.set_data = set_data
    this.toggleSetCreatedPopUp()
  }

  collapsibleClicked(i:number){
    let collapsible = document.getElementById('q'+i+'Collapsible')!
    let dropDownIcon = document.getElementById('q'+i+'DropDownIcon')!
    if (collapsible.classList.contains('active')){
      collapsible.classList.remove('appear')
      dropDownIcon.innerHTML = 'arrow_drop_down'
      collapsible.classList.add('disappear')
      setTimeout(() => {collapsible.classList.remove('active')},200)
    }
    else{
      collapsible.classList.remove('disappear')
      collapsible.classList.add('active')
      dropDownIcon.innerHTML = 'arrow_drop_up'
      collapsible.classList.add('appear')
    }
  }

  toggleSetCreatedPopUp(){
    let popUp = document.getElementById('setCreatedPopUp')
    if(popUp!.classList.contains('hidden')){
      popUp!.classList.remove('hidden')
    }
    else{
      popUp!.classList.add('hidden')
      this.router.navigate(['library'])
    }
  }

}
