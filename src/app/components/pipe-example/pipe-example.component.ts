import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-pipe-example',
    templateUrl: './pipe-example.component.html',
    styleUrls: ['./pipe-example.component.less']
})
export class PipeExampleComponent implements OnInit {
    timestamp?: string;
    dollarAmount?: string;

    ngOnInit(): void {
        this.timestamp = '2022-06-22T09:00:00.000Z';
        this.dollarAmount = '12345';
    }
}
