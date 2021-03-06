import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, delay, map, Observable, tap } from 'rxjs';
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

        this.setUserWithUpdates();
    }

    setUserWithUpdates(): void {
        // Whenever refreshUsers$ changes, the new call to fetchUserData() will be made
        // this.usersWithUpdates$ = this.refreshUsers$.pipe(
        //     switchMap(() => this.fetchUserData())
        // );

        // Use this for example without BehaviorSubject
        this.usersWithUpdates$ = this.fetchUserData();
    }

    /**
     * Retrieve data as an Observable
     */
    fetchUserData(): Observable<User[]> {
        return this.userService.getUsers().pipe(
            delay(1000), // simulate waiting for data response
            tap(console.log)
        );
    }

    /**
     * Add new user and utilize BehaviorSubject to refresh users
     */
    addUserWithBehaviorSubject() {
        this.userService.addUser(this.userToAdd).pipe(
            map(() => {
                this.userToAdd = { name: { first: '', last: '' } };
                this.refreshUsers$.next(this.userToAdd);
            })
        ).subscribe();
    }

    /**
     * Add new user and reassign the observable to refresh users
     */
    addUserWithReassignment() {
        this.userService.addUser(this.userToAdd).pipe(
            map(() => {
                this.setUserWithUpdates();
            })
        ).subscribe();
    }
}
