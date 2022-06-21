import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface User {
    name: {
        first: string;
        last: string;
    }
}

@Injectable({
    providedIn: 'root'
})
export class UserService {

    users: User[] = [{
        name: {
            first: 'Albus',
            last: 'Dumbledore'
        }
    }, {
        name: {
            first: 'Severus',
            last: 'Snape'
        }
    }];

    getUsers(): Observable<User[]> {
        return of(this.users);
    }

    addUser(user: User): void {
        this.users = [...this.users, user];
    }

}
