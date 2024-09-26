import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

const usersUrl = 'http://localhost:8080/users/'
const teamUrl = 'http://localhost:8080/announcements/'
const companyUrl = 'http://localhost:8080/company/'
const announcementsUrl = 'http://localhost:8080/announcements/'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  async getAllAnnouncements() {
    return await this.http.get(announcementsUrl).toPromise();
  }

  async getCompanyAnnouncements(companyId: number) {
    return await this.http.get(announcementsUrl + `company/${companyId}`).toPromise();
  }

}
