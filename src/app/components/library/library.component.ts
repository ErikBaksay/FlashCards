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

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  selectSet(set:any){
    this.router.navigate(["library",set.id])
  }

}
