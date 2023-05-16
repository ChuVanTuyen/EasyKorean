import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

// hiệu ứng load 

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements AfterViewInit {
  @Input() width: string | undefined;
  @Input() height: string | undefined;
  @Input() radius: string | undefined;
  @ViewChild('ngLoad') load!: ElementRef;

  ngAfterViewInit(): void {
    let a = this.load.nativeElement.style;
    a.width = this.width ? this.width : '100%';
    a.height = this.height ? this.height : '100%';
    a.radius = this.radius ? this.height : '0';
  }
}
