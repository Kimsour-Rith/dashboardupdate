
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { LaundryService } from '../services/laundry.service';
import { Laundry } from '../models/laundry';

const KEY_1 = 'big_washer_1';
const KEY_2 = 'big_washer_2';
const KEY_3 = 'washer_1';
const KEY_4 = 'washer_2';
const KEY_5 = 'dryer_1';
const KEY_6 = 'dryer_2';
const BIG_WASHER_1 = 10800;
const BIG_WASHER_2 = 10800;
const WASHER_1 = 3600;
const WASHER_2 = 3600;
const DRYER_1 = 3600;
const DRYER_2 = 3600;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  top_row: Laundry[] = [];
  bot_row: Laundry[] = [];
  big_washer_1: any;

  config1: CountdownConfig = { leftTime: BIG_WASHER_1, notify: 0 };
  config2: CountdownConfig = { leftTime: BIG_WASHER_2, notify: 0 };


  constructor(private service: LaundryService) {

  }

  ngOnInit() {
    this.getDataFromAPI();

    for (var machine of this.top_row) {
      if (machine.isOn) {
        console.log(machine)
        let big_washer_value_1 = +localStorage.getItem(KEY_1)!! ?? BIG_WASHER_1;
        if (big_washer_value_1 <= 0) big_washer_value_1 = BIG_WASHER_1;
        this.config1 = { ...this.config1, leftTime: big_washer_value_1 };
      } else {
        localStorage.removeItem('big_washer_1')
      }
    }
    // Big Washer 1
    // Big Washer 2
    let big_washer_value_2 = +localStorage.getItem(KEY_2)!! ?? BIG_WASHER_2;
    if (big_washer_value_2 <= 0) big_washer_value_2 = BIG_WASHER_2;
    this.config2 = { ...this.config2, leftTime: big_washer_value_2 };
  }

  getDataFromAPI() {
    this.service.getLaundryData().subscribe(res => {
      for (var machine of res) {
        if (machine.mid <= 3) {
          this.top_row.push(machine)
        } else {
          this.bot_row.push(machine)
        }
      }


    })
  }

  handleEventBigWasher1(ev: CountdownEvent) {
    if (ev.action === 'notify') {
      // Save current value
      localStorage.setItem(KEY_1, `${ev.left / 1000}`);
    }
  }
  handleEventBigWasher2(ev: CountdownEvent) {
    if (ev.action === 'notify') {
      // Save current value
      localStorage.setItem(KEY_2, `${ev.left / 1000}`);
    }
  }

  removeLocalStorage(name: string) {
    localStorage.removeItem(name);
  }

}