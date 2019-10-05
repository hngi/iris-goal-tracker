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

  toBase64 = (file: any) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  })
}

interface SwalOptions { title: string; message?: string; type?: string; }
