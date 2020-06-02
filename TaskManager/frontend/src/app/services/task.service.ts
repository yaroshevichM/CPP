import { Injectable } from '@angular/core';
import { WebRequestsService } from './web-requests.service';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webReqService: WebRequestsService) { }

  createList (title) {
    return this.webReqService.post('lists', {title});
  }

  getLists () {
    return this.webReqService.get('lists');
  }

  getList (listId: string) {
    return this.webReqService.get(`lists/${listId}`);
  }

  deleteList (id: string) {
    return this.webReqService.delete(`lists/${id}`)
  }

  updateList (id: string, title: string) {
    return this.webReqService.patch(`lists/${id}`, {title})
  }

  createTask (title, listId: string) {
    return this.webReqService.post(`lists/${listId}/tasks`, {title});
  }

  getTasks (listId: string) {
    return this.webReqService.get(`lists/${listId}/tasks`);
  }
  
  deleteTask (listId: string, taskId: string) {
    return this.webReqService.delete(`lists/${listId}/tasks/${taskId}`)
  }

  updateTask (listId: string,id: string, title: string) {
    return this.webReqService.patch(`lists/${listId}/tasks/${id}`, {title})
  }

  complete (task: Task) {
    return this.webReqService.patch(`lists/${task._listId}/tasks/${task._id}`, {
      completed: true
    })
  }

  
}
