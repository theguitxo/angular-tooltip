import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  position: 'top' | 'bottom' | 'left' | 'right' = 'top';
  alignment: 'start' | 'center' | 'end' = 'center';
  class!: '';
  message = '<div>uno<br>dos</div>';

  messageGroup!: FormGroup;

  ngOnInit(): void {
    this.messageGroup = new FormGroup({
      message: new FormControl('')
    });

    this.messageGroup.controls['message'].setValue(this.message);

    this.messageGroup.controls['message'].valueChanges.subscribe((value) => {
      this.message = value;
    });
  }

  positionChange(event: any): void {
    this.position = event.target.value;
  }

  alignmentChange(event: any): void {
    this.alignment = event.target.value;
  }

  classChange(event: any): void {
    this.class = event.target.value;
  }
}
