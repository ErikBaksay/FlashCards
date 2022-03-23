import { set_data } from './../../sets-data';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.sass']
})
export class CurrentComponent implements OnInit {

  set_data = set_data
  current_set = set_data[0]
  current_question : number = 0
  completed : number[] = []
  isCompleted : boolean = false
  isRevealed : boolean = false

  constructor(private route: ActivatedRoute) { }

  generateQuestion(){
    this.isRevealed = false
    if (this.completed.length == this.current_set.questions.length){
      this.isCompleted = true
      return
    }
    else{
      this.isCompleted = false
      let questionID : number = Math.round(Math.random() * 
        (this.current_set.questions.length-1))
      while (this.completed.includes(questionID)){
        questionID = Math.round(Math.random() * 
          (this.current_set.questions.length-1))
      }
      this.current_question = questionID
    } 
  }
  questionPassed(){
    this.completed.push(this.current_question)
    this.generateQuestion()
  }
  questionFailed(){
    this.generateQuestion()
  }

  ngOnInit(): void {
    if (localStorage.getItem('storedSets') === null){
      this.set_data = set_data
    }
    else{
      this.set_data = JSON.parse(localStorage.getItem('storedSets')!)
    }
    
    let setID = parseInt(this.route.snapshot.paramMap.get("set")!)
    
    for(let i = 0; i < this.set_data.length; i++){
      if (this.set_data[i].id == setID){
        this.current_set = this.set_data[i]
      }  
    } 

    this.generateQuestion()
  }

  reveal(){
    if (!this.isRevealed){
      this.isRevealed = true
    }
  }
}
