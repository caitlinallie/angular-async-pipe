import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, delay, Observable, switchMap, tap } from "rxjs";
import { User, UserService } from './services/user.service';

/**
 * Main component for the application
 */
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

    users$?: Observable<User[]>;
    usersWithUpdates$?: Observable<User[]>;
    refreshUsers$ = new BehaviorSubject<User | null>(null);
    userToAdd: User = { name: { first: '', last: '' } };

    constructor(private userService: UserService) {
    }

    ngOnInit(): void {
        this.users$ = this.fetchUserData();

        // Whenever refreshUsers$ changes, the new call to fetchUserData() will be made
        this.usersWithUpdates$ = this.refreshUsers$.pipe(
            switchMap(() => this.fetchUserData())
        );
    }

    /**
     * Retrieve data as an Observable
     */
    fetchUserData(): Observable<User[]> {
        return this.userService.getUsers().pipe(
            delay(1000), // simulate waiting for data response
            tap(console.log),
        );
    }

    /**
     * Add new user and emit event to refresh users
     */
    addUser() {
        this.userService.addUser(this.userToAdd);
        this.userToAdd = { name: { first: '', last: '' } };
        this.refreshUsers$.next(this.userToAdd);
    }
}
