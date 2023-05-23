import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';
import { LanguageService } from 'src/app/services/language.service';
import { CommonService } from 'src/app/services/common.service';

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
    private searchService: SearchService,
    private lang: LanguageService,
    private common: CommonService
  ) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.total = undefined;
      this.search = params.get('query');
      this.getDataSearch();
    });
  }

  getDataSearch(): void { // lấy dữ liệu từ server
    if (this.common.checkKoreanString(this.search)) {
      this.dict = `ko${this.lang.lang}`;
    } else {
      this.dict = `${this.lang.lang}ko`;
    }
    this.searchService.getSearch({
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
      }
    );
  }

  onShowMore() {// hàm hiển thị thêm kết quả
    this.page++;
    this.searchService.getSearch({
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
