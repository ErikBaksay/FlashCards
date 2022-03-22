import { set_data } from './../../sets-data';
import { Component, OnInit } from '@angular/core';

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

  constructor() { }

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

    for (let i = 1; i < this.set_data.length; i++){
      this.usedIDs.push(this.set_data[i].id) 
    }
    let setID = 0
    while (this.usedIDs.includes(setID)){
      setID++
    }

    this.set_data.push({
      id : setID,
      name : this.setNameValue,
      questions : this.questions
    })
    
    localStorage.setItem('storedSets',JSON.stringify(this.set_data))
    this.set_data = set_data

  }

}
