// tslint:disable: max-line-length
// tslint:disable: no-string-literal

import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { UserService } from '../user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilService } from '../util.service';

declare let swal: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  goals: any[] = [];
  createGoalForm: FormGroup;
  createTodoForm: FormGroup;

  thisUser: any;
  scheduleDate = new Date('yyyy/mm/dd').toISOString;
  goal: any;
  mobile: boolean;
  today = new Date().toJSON().split('T')[0];

  public goalScheduleText: { [key: string]: string } = {};

  @ViewChild('newGoalCard', { static: false }) goalCard: ElementRef;
  @ViewChild('singleGoalCard', { static: false }) singleGoalCard: ElementRef;

  constructor(private user: UserService, private utils: UtilService, private renderer: Renderer2) {
    this.createGoalForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      scheduleDate: new FormControl('')
    });

    this.createTodoForm = new FormGroup({
      title: new FormControl('')
    });
  }

  ngOnInit() {
    if (window.screen.width === 360) {
      this.mobile = true;
    }

    this.loadGoals();
    this.thisUser = this.user.getUserObj();
  }

  public toggleGoalCard(on = true) {
    this.renderer.setStyle(this.goalCard.nativeElement, 'display', on ? 'flex' : 'none');
  }

  public toggleSingleGoalCard(on = true) {
    this.renderer.setStyle(this.singleGoalCard.nativeElement, 'display', on ? 'flex' : 'none');
  }

  public createGoal(goalData: any) {
    this.user.createGoal(goalData).subscribe((res: any) => {
      this.goals.unshift(res.data);
      this.createGoalForm.reset();
      this.toggleGoalCard(false);
    }, err => {
      this.utils.showToast({ title: err, type: 'error' });
    });
  }

  public createTodo(todoData: any) {
    this.user.createTodo(this.goal._id, todoData).subscribe((res: any) => {
      this.goal.todos.unshift(res.data);
      this.createTodoForm.reset();
    }, err => {
      this.utils.showToast({ title: err, type: 'error' });
    });
  }

  public deleteTodo(todo: any) {
    this.user.removeTodo(todo._id).subscribe((res: any) => {
      const index = this.goal.todos.findIndex((todoObj: any) => todoObj._id === todo._id);
      this.goal.todos.splice(index, 1);
      this.utils.showToast({
        title: 'Deleted!',
        message: 'To-do item has been removed.',
        type: 'success'
      });
    }, err => {
      this.utils.showToast({ title: err, type: 'error' });
    });
  }

  public loadGoals() {
    this.user.getGoals()
      .subscribe((res: any) => {
        this.goals = res.data.map((goal: any) => this.formatGoal(goal)).sort(this.sortLatest);
      }, err => {
        this.utils.showToast({ title: err, type: 'error' });
      });
  }

  public loadSingleGoal(goal: any) {
    this.user.getSingleGoal(goal._id).subscribe((res: any) => {
      this.goal = this.formatGoal(res.data, false);
      this.goal.progress = goal.progress;
      this.toggleSingleGoalCard();
    }, err => {
      this.utils.showToast({ title: err, type: 'error' });
    });
  }

  public logout() {
    this.user.logout();
  }

  public getAvatar(text: string) {
    return this.user.getAvatarInitials(text);
  }

  public deleteGoal(goal: any) {
    swal.fire({
      title: `Delete ${goal.title}?`,
      text: 'You won\'t be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--danger)',
      cancelButtonColor: 'var(--dark)',
      confirmButtonText: 'Yes, delete it!'
    }).then((result: { value: any }) => {
      if (result.value) {
        this.user.removeGoal(goal._id).subscribe((res: any) => {
          const index = this.goals.findIndex(goalObj => goalObj._id === goal._id);
          this.goals.splice(index, 1);
          this.utils.showToast({
            title: 'Deleted!',
            message: 'The goal has been deleted.',
            type: 'success'
          });
        });
      }
    });
  }

  public async editGoal(goal: any) {
    const formattedScheduleDate = this.parseScheduleDate(goal.scheduleDate);
    const { value: formValues } = await swal.fire({
      title: 'Edit goal',
      html:
        `
        <div class="form-group">
          <label for="goal-title-input">Title</label>
          <input type="text" class="form-control" value="${goal.title}" id="goal-title-input" placeholder="An awesome title">
        </div>
        <div class="form-group">
          <label for="goal-description-input">Description</label>
          <input type="text" class="form-control" value="${goal.description || ''}"
          id="goal-description-input" placeholder="What is your goal about?" autocomplete='no'>
        </div>
        <div class="form-group">
          <label for="goal-scheduleDate-input">Schedule a Date</label>
          <input type="date" [min]="today" class="form-control" value="${formattedScheduleDate || '\'2019-01-01\''}" id="goal-scheduleDate-input">
        </div>
        `,
      focusConfirm: false,
      showLoaderOnConfirm: true,
      confirmButtonColor: 'var(--primary)',
      preConfirm: () => {
        return {
          title: document.getElementById('goal-title-input')['value'],
          description: document.getElementById('goal-description-input')['value'],
          scheduleDate: document.getElementById('goal-scheduleDate-input')['value']
        };
      }
    });

    if (formValues) {
      this.user.updateGoal(goal._id, formValues).subscribe((res: any) => {
        this.utils.showToast({ title: 'Successfully updated goal!', type: 'success' });
        res.data.progress = goal.progress;
        res.data.meta = goal.meta;
        this.goals = this.goals.map(goalObj => (goalObj._id === res.data._id) ? this.formatGoal(res.data) : goalObj)
          .sort(this.sortLatest);
      }, err => {
        this.utils.showToast({ title: err, type: 'error' });
      });
    }
  }

  public async editUser() {
    const user = this.thisUser;
    const { value: formValues } = await swal.fire({
      title: 'Edit Account',
      html:
        `
        <div class="form-group">
          <label for="user-name-input">Name</label>
          <input type="text" class="form-control" value="${user.name}" id="user-name-input" placeholder="John Doe">
        </div>
        <div class="form-group">
          <label for="user-email-input">Email</label>
          <input type="text" class="form-control" value="${user.email}"
          id="user-email-input" placeholder="someone@example.com" autocomplete="no">
        </div>`,
      focusConfirm: false,
      showLoaderOnConfirm: true,
      confirmButtonColor: 'var(--primary)',
      preConfirm: () => {
        return {
          // tslint:disable-next-line: no-string-literal
          name: document.getElementById('user-name-input')['value'],
          // tslint:disable-next-line: no-string-literal
          email: document.getElementById('user-email-input')['value']
        };
      }
    });

    if (formValues) {
      this.user.updateUser(user._id, formValues).subscribe((res: any) => {
        this.utils.showToast({ title: 'Successfuly updated your account details!', type: 'success' });
        this.thisUser = res.data;
        this.user.saveUser(this.thisUser);
      }, err => {
        this.utils.showToast({ title: err, type: 'error' });
      });
    }
  }

  public markTodo(todo: any) {
    this.user.markTodo(todo._id, !todo.isComplete).subscribe((res: any) => {
      this.utils.showToast({ title: `Marked to-do as ${todo.isComplete ? 'undone 😞' : 'done 😊'}`, type: 'success' });
      this.goal.todos = this.goal.todos.map((todoObj: any) => (todoObj._id === res.data._id) ? res.data : todoObj);
      const meta = {
        totalTodos: { value: this.goal.todos.length },
        completedTodos: { value: this.goal.todos.filter((todoObj: any) => todoObj.isComplete).length }
      };
      this.goal.meta = meta;
      this.goal = this.formatGoal(this.goal);
      this.goals = this.goals.map(goalObj => (goalObj._id === this.goal._id) ? this.goal : goalObj)
        .sort(this.sortLatest);
    }, err => {
      this.utils.showToast({ title: err, type: 'error' });
    });
  }

  public getGoalsMetric(completed = true) {
    return this.goals.filter(goal => goal.isComplete === completed).length;
  }

  public finishCount(goal: any) {
    this.goalScheduleText[goal._id] = 'In Progress';
  }

  private getGoalProgress(goal: any) {
    if (!goal.meta) { return 0; }
    const totalTodos = goal.meta.totalTodos ? goal.meta.totalTodos.value : 0;
    const completedTodos = goal.meta.completedTodos ? goal.meta.completedTodos.value : 0;
    return Math.floor((completedTodos / totalTodos) * 100);
  }

  private formatGoal(goal: any, onLoad = true) {
    goal.isComplete = this.goalIsComplete(goal);
    goal.progress = this.getGoalProgress(goal);
    return goal;
  }

  private goalIsComplete(goal: any): boolean {
    return goal.meta &&
      goal.meta.totalTodos &&
      goal.meta.completedTodos &&
      (goal.meta.totalTodos.value === goal.meta.completedTodos.value);
  }

  private sortLatest(a: any, b: any) {
    b = new Date(b.updatedAt);
    a = new Date(a.updatedAt);
    return b - a;
  }

  private parseScheduleDate(scheduleDate: string) {
    const d = new Date(scheduleDate);
    return `${d.getFullYear()}-${d.getMonth() < 10 ? '0' + d.getMonth() : d.getMonth()}-${d.getDate() < 10 ? '0' + d.getDate() : d.getDate()}`;
  }
}
