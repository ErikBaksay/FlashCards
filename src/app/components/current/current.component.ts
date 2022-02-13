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

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    let setID = parseInt(this.route.snapshot.paramMap.get("set")!)
    for(let i = 0; i < set_data.length; i++){
      if (set_data[i].id == setID){
        this.current_set = set_data[i]
        return
      }
    }
  }

}
