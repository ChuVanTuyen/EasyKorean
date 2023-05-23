import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  makeid(length: number): string {// tạo chuỗi id ngẫu nhiên
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

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
}
