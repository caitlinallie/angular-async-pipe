import { Injectable } from '@angular/core';
import { of } from 'rxjs';

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

    getUsers() {
        return of(this.users);
    }

    addUser(user: User) {
        this.users = [...this.users, user];
    }

}
