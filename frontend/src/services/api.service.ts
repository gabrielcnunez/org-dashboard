import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const usersUrl = 'http://localhost:8080/users/'
const teamUrl = 'http://localhost:8080/announcements/'
const companyUrl = 'http://localhost:8080/company/'
const announcementsUrl = 'http://localhost:8080/announcements/'

export interface Credentials {
  username: string;
  password: string;
}

export interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export interface BasicUser {
  id: number;
  profile: Profile;
  active: boolean;
  admin: boolean;
  status: string;
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private userData: BasicUser | undefined;

  constructor(private http: HttpClient) { }

  async getAllAnnouncements() {
    return await this.http.get(announcementsUrl).toPromise();
  }

  async getCompanyAnnouncements(companyId: number) {
    return await this.http.get(announcementsUrl + `company/${companyId}`).toPromise();
  }

  async getCompanyTeams(companyId: number) {
    return await this.http.get(companyUrl + `${companyId}/teams`).toPromise();
  }

  async getCompanyUsers(companyId: number) {
    return await this.http.get(companyUrl + `${companyId}/users`).toPromise();
  }

  async getCompanyTeamProject(companyId: number, teamId: number) {
    return await this.http.get(companyUrl + `${companyId}/teams/${teamId}/projects`).toPromise();
  }

  async addNewTeam() {

  }

  async getUsers(credentials: Credentials): Promise<BasicUser[]> {
    const authCredentials = btoa(`${credentials.username}:${credentials.password}`);

    const headers = new HttpHeaders({
        'Authorization': `Basic ${authCredentials}`
    });

    let response = await this.http.get<BasicUser[]>(usersUrl, { headers: headers }).toPromise();

    return response ?? [];
  }

  async postUserLogin(credentials: Credentials) {

    const body = {
      username: credentials.username,
      password: credentials.password
    };

    let response = await this.http.post<BasicUser>(usersUrl + `login`, body).toPromise();
    this.userData = response;
    return response
  }

  getUserData() {
    return this.userData;
  }

}
