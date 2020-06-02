import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { List } from 'src/app/models/list.model';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists: List[];
  tasks: Task[];

  selectedListId: string;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      console.log(params);
      this.selectedListId = params.listId;
      this.taskService.getTasks(params.listId).subscribe((tasks: Task[]) => {
        console.log(tasks);
        this.tasks = tasks;
      })
    })

    this.taskService.getLists().subscribe((lists: List[]) => {
      this.lists = lists;
    })
  }

  onTaskClick(task: Task) {
    this.taskService.complete(task).subscribe(() => {
      console.log("Completed");
      task.completed = !task.completed;
    })
  }

  onDeleteListClick() {
    this.taskService.deleteList(this.selectedListId).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/lists'])
    });
  }

  onDeleteTaskClick(id: string) {
    this.taskService.deleteTask(this.selectedListId, id).subscribe((res) => {
      console.log(res);
      this.tasks = this.tasks.filter(val => val._id !== id);
    });
  }

  toEditTask(task: Task) {
    window.localStorage.setItem('taskTitle', task.title);
    this.router.navigate(['/lists', this.selectedListId, 'edit-task', task._id])
  }

  toEditList(list: List) {
    this.router.navigate(['/edit-list', this.selectedListId])
  }
  
}
