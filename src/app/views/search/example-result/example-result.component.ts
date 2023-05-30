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
  result: any;// mảng data hiển thị
  res: any;// mảng data trả về
  total: number | undefined; // tổng số kết quả tìm được
  search: any;
  page = 1; // dùng để load thêm
  dict = '';// Việt Hàn, Hàn Việt, hoặc Anh Hàn, Hàn Anh, ...
  keepActive = 0;
  loopNum: number[];
  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
    private lang: LanguageService,
    private common: CommonService
  ) {
    this.loopNum = this.common.getRange(0, 5);
  }
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
      limit: 50,
      page: this.page,
      text: this.search,
      type: 'examples'
    }).subscribe(
      (res: any) => {
        this.total = res.data.total;
        if (res.status) {
          this.res = res.data.result;
          this.result = this.res.slice(0, 10);
        }
      }
    );
  }

  onShowMore() {// hàm hiển thị thêm kết quả
    this.page++;
    this.result = this.res.slice(0, this.page * 10);
  }
}
