import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { UpdateService } from '../services/update.service';

@Component({
  selector: 'app-update-create',
  templateUrl: './update-create.component.html',
  styleUrls: ['./update-create.component.css']
})
export class UpdateCreateComponent implements OnInit {
  @Output() public posted: EventEmitter<any> = new EventEmitter();

  @ViewChild('textarea') input;

  constructor(private updateService: UpdateService) { }

  ngOnInit() {
  }

  public postUpdate(event, value) {
    event.preventDefault();
    event.stopPropagation();
    if ('' === value.trim()) {
      return;
    }

    this.updateService.createUpdate({ content: value })
      .subscribe(resp => {
        const jsonResp = resp.json();
        this.input.nativeElement.value = '';

        this.posted.emit(jsonResp);
      });
  }

}
