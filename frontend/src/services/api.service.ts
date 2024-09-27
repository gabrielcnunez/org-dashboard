import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import Project from '../app/models/project';

const usersUrl = 'http://localhost:8080/users'
const teamUrl = 'http://localhost:8080/announcements'
const companyUrl = 'http://localhost:8080/company'
const announcementsUrl = 'http://localhost:8080/announcements'

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

export interface UserRequest {
  credentials: Credentials;
  profile: Profile;
  admin: boolean;
}

export interface CreateUser {
  credentials: Credentials;
  user: UserRequest;
  companyId: number;
}

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
    return await this.http.get(announcementsUrl + `/company/${companyId}`).toPromise();
  }

  async getCompanyTeams(companyId: number) {
    return await this.http.get(companyUrl + `/${companyId}/teams`).toPromise();
  }

  async getCompanyUsers(companyId: number) {
    return await this.http.get(companyUrl + `/${companyId}/users`).toPromise();
  }

  async getCompanyTeamProject(companyId: number, teamId: number) {
    return await this.http.get(companyUrl + `/${companyId}/teams/${teamId}/projects`).toPromise();
  }

  async updateProject(companyId: number, teamId: number, projectId: number, updatedProject: Project): Promise<any> {
    const body = JSON.stringify(updatedProject)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'});
    
    const url = companyUrl + `${companyId}/teams/${teamId}/projects/${projectId}/edit`;
    return await this.http.patch(url, body, { headers } ).toPromise();
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

  async postUserLogin(credentials: Credentials): Promise<BasicUser | undefined> {
    const body = {
      username: credentials.username,
      password: credentials.password,
    };
  
    try {
      let response = await this.http.post<BasicUser>(usersUrl + `/login`, body).toPromise();
      this.userData = response;
      return response;
    } catch (error) {
      console.error("Error during login request:", error);
      return undefined;
    }
  }


  async createUser(newUser: CreateUser) {

    const body = JSON.stringify(newUser);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json' // Set the proper header
  });

    let response = await this.http.post<BasicUser>(usersUrl + `/create`, body, { headers: headers }).toPromise();
    this.userData = response;
    return response
  }

  getUserData() {
    return this.userData;
  }

}
