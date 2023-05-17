import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }
  check = {
    typeSearch: true,//search từ vựng hay ngữ pháp
    submitted: false, // đã ấn submit hay chưa
  }
  search = '';// nội dung tra cứu
  ngOnInit(): void {
    let search = this.router.url.split('/')[4];
    if (search) {
      this.search = search;
      this.check.submitted = true;
    }
  }
  handleTypeSearch(type: boolean) {
    this.check.typeSearch = type;
    if (this.search) {
      this.check.submitted = true;
      this.router.navigate([this.check.typeSearch ? 'word' : 'example', this.search], { relativeTo: this.route });
    }
  }

  handleChangeSearch(event: Event): void {
    this.search = (event.target as HTMLInputElement).value.trim();// lấy giá trị người dung nhập vào ô tra cứu
    if (!this.search) {
      this.router.navigate(['./'], { relativeTo: this.route });
      this.check.submitted = false;
    }
  }

  onSubmit(): void {
    this.check.submitted = true;
    if (this.search) {
      this.router.navigate([this.check.typeSearch ? 'word' : 'example', this.search], { relativeTo: this.route });
    }
  }
}
