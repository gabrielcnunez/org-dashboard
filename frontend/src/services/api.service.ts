import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import Project from '../app/models/project';
import Team from 'src/app/models/team';

const usersUrl = 'http://localhost:8080/users'
const teamUrl = 'http://localhost:8080/team'
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

export interface CreateTeam {
  credentials: Credentials,
  name: string,
  description: string,
  teammateIds: number[],
  companyId: number
}

export interface Announcement {
  title: string;
  message: string;
  author: BasicUser;
}

export interface Company {
  id: number;
  name: string;
  description: string;
}

export interface ProjectRequest {
    name: string,
    description: string,
    active: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private userData: BasicUser | undefined;
  private teamData: Team | undefined;
  private projectData: Project | undefined;

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

  async addNewTeam(newTeam: CreateTeam) {

    const body = JSON.stringify(newTeam);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json' // Set the proper header
  });

    let response = await this.http.post<Team>(teamUrl + `/create`, body, { headers: headers }).toPromise();
    this.teamData = response;
    return response
  }

  async getUsers(credentials: Credentials): Promise<BasicUser[]> {
    const authCredentials = btoa(`${credentials.username}:${credentials.password}`);

    const headers = new HttpHeaders({
        'Authorization': `Basic ${authCredentials}`
    });

    let response = await this.http.get<BasicUser[]>(usersUrl, { headers: headers }).toPromise();

    return response ?? [];
  }

  async getAllCompanies(): Promise<Company[]> {

    let response = await this.http.get<Company[]>(companyUrl + `/all`).toPromise();

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

  async createProject(newProject: ProjectRequest, companyId: number, teamId: number) {

    const body = JSON.stringify(newProject);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json' // Set the proper header
  });

    let response = await this.http.post<Project>(companyUrl + `/${companyId}/teams/${teamId}/projects`, body, { headers: headers }).toPromise();
    this.projectData = response;
    return response
  }

  async createAnnouncement(newAnnouncement: Announcement, companyId: number) {

    const body = JSON.stringify(newAnnouncement);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
  });

    let response = await this.http.post<Announcement>(announcementsUrl + `/company/${companyId}`, body, { headers: headers }).toPromise();
    return response
  }


  getUserData() {
    return this.userData;
  }

}
