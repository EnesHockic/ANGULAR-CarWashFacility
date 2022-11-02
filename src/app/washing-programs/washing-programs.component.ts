import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-washing-programs',
  templateUrl: './washing-programs.component.html',
  styleUrls: ['./washing-programs.component.css']
})
export class WashingProgramsComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }
  onNewProgram(){
    this.router.navigate(["new"],{relativeTo: this.route});
  }
}
