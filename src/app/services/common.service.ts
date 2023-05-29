import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  validateEmail(str: string): boolean {// kiểm tra chuỗi có phải là email hay không
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (str.match(mailformat)) {
      return true;
    }
    else {
      return false;
    }
  }

  checkKoreanString(str: string): boolean { // kiểm tra xem có phải là tiếng Hàn hay không
    for (let e of str) {
      let check = e.charCodeAt(0);// lấy mã unicode
      if (check > 4352 && check < 4607 || check > 12592 && check < 12687 || check > 44032 && check < 55203) {
        return true;
      }
    }
    return false;
  }

  getRange(start: number, end: number): number[] {// tạo mảng number
    const range = [];
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  }
}
