import { Injectable } from '@angular/core';
declare let swal: any;

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  toast: any;
  constructor() {
    this.initSwal();
  }

  initSwal() {
    this.toast = swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });
  }

  showToast(opts: { title: string, message?: string, type?: string }) {
    this.toast.fire({
      type: opts.type || 'success',
      title: opts.title
    });
  }
}
