import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userState = new BehaviorSubject<any>({
    isLoggedIn: false,
    isAdmin: true
  })

  errorState = new BehaviorSubject<any>({
    isError: false,
    message: '',
  });

  constructor() {
    // Load persisted state from local storage, if applicable
    const persistedUserState = localStorage.getItem('userState')
    if (persistedUserState) {
      this.userState.next(JSON.parse(persistedUserState))
    }
  }
}
