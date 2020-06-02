import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})

export class EditTaskComponent implements OnInit {

  taskId: string;
  listId: string;
  currentTaskTitle: string = window.localStorage.getItem('taskTitle')

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      console.log(params);
      this.taskId = params.taskId;
      this.listId = params.listId;
    })
  }

  updateTask(title: string) {
    this.taskService.updateTask(this.listId, this.taskId, title).subscribe((res) => {
      console.log(res);
      this.location.back();
    })
  }

  cancel() {
    this.location.back();
  }
}
