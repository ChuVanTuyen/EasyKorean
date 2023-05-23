import { AfterViewInit, Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';

// hiệu ứng load 

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnChanges {
  @Input() style: string | undefined;

  ngOnChanges(): void {
    if (this.style) {
      this.style = 'load ' + this.style;
    }
  }
}
