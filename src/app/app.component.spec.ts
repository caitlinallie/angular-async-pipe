import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TimerPipe } from './pipes/timer.pipe';
import { FormsModule } from '@angular/forms';
import { PipeExampleComponent } from './components/pipe-example/pipe-example.component';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                FormsModule
            ],
            declarations: [
                AppComponent,
                TimerPipe,
                PipeExampleComponent
            ],
        })
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
    });

    it('should display users after async call completes', waitForAsync(() => {
        // 1st change detection triggers ngOnInit which retrieves users
        fixture.detectChanges();

        const userListElement = fixture.nativeElement.querySelector('.user-list');

        expect(userListElement.textContent)
            .withContext('should show placeholder')
            .toBe(' Loading... ');

        fixture.whenStable().then(() => {  // wait for async call
            // 2nd change detection displays the async-fetched user list
            fixture.detectChanges();
            expect(userListElement.textContent).toContain('Albus Dumbledore');
            expect(userListElement.textContent).toContain('Severus Snape');
        });
    }));

});
