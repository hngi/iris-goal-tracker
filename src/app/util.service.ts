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

  showAlert(opts: SwalOptions) {
    return swal.fire({
      title: opts.title,
      text: opts.message,
      confirmButtonColor: 'var(--primary)'
    });
  }

  showToast(opts: SwalOptions) {
    return this.toast.fire({
      type: opts.type || 'success',
      title: opts.title
    });
  }
}

interface SwalOptions { title: string; message?: string; type?: string; }
