import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';
import { List } from 'src/app/models/list.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {

  listId: string;
  currentListTitle: string;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      console.log(params);
      this.listId = params.listId;
      this.getCurrentList();
    })
  }

  updateList(title: string) {
    this.taskService.updateList(this.listId, title).subscribe((res) => {
      this.router.navigate(['/lists', this.listId])
    })
  }

  getCurrentList() {
    this.taskService.getList(this.listId).subscribe((listData: List) => {
      console.log(listData);
      this.currentListTitle = listData[0].title;
      console.log(this.currentListTitle);
    })
  }

  cancel() {
    this.location.back();
  }
}
