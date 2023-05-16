import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiSearchService } from 'src/app/services/api-search/api-search.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-example-result',
  templateUrl: './example-result.component.html',
  styleUrls: ['./example-result.component.scss']
})
export class ExampleResultComponent {
  result: any;// mảng data trả về
  total: number | undefined; // tổng số kết quả tìm được
  search: any;
  page = 1; // dùng để load thêm
  pageTotal = 1; // số lần load tính cả lần load đầu tiên
  dict = '';// Việt Hàn, Hàn Việt, hoặc Anh Hàn, Hàn Anh, ...
  keepActive = 0;
  constructor(
    private route: ActivatedRoute,
    private apiSearch: ApiSearchService,
    private lang: LanguageService
  ) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.total = undefined;
      this.search = params.get('query');
      let langCheck = this.search.charCodeAt(0); // lấy mã unicode
      // kiểm tra xem có phải là tiếng Hàn hay không
      if (langCheck > 4352 && langCheck < 4607 || langCheck > 12592 && langCheck < 12687 || langCheck > 44032 && langCheck < 55203) {
        this.dict = `ko${this.lang.lang}`;
      } else {
        this.dict = `${this.lang.lang}ko`;
      }
      this.apiSearch.getSearch({
        dict: this.dict,
        limit: 20,
        page: this.page,
        text: this.search,
        type: 'examples'
      }).subscribe(
        (data: any) => {
          this.total = data.data.total;
          if (this.total !== undefined && this.total > 0) {
            this.result = data.data.result;
            this.pageTotal = Math.round(this.total / 20);
          }
          console.log(this.result);
        }
      );
    });
  }

  onShowMore() {
    this.page++;
    this.apiSearch.getSearch({
      dict: this.dict,
      limit: 20,
      page: this.page,
      text: this.search,
      type: 'examples'
    }).subscribe(
      (data: any) => {
        if (this.total !== undefined && this.total > (this.page - 1) * 20) {
          this.result = [... this.result, ...data.data.result];
        }
      }
    );
  }
}
