import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Group } from '../models/group';
import { GroupRequest } from '../models/groupRequest';
import { GroupUser } from '../models/groupUser';

const httpOptions={
  headers: new HttpHeaders({
    'content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  getGroup(id: number): Observable<Group>{
    return this.http.get<Group>(this.baseApiUrl + 'Group/' + id, httpOptions);
  }

  getGroupUsers(id: number): Observable<Group[]>{
    return this.http.get<Group[]>(this.baseApiUrl + 'Group/groupusers/' + id);
  }

  getUserGroups(id: number): Observable<Group[]>{
    return this.http.get<Group[]>(this.baseApiUrl + 'Group/usersgroups/' + id);
  }

  addGroup(userId: number, group: Group): Observable<Group>{
    return this.http.post<Group>(this.baseApiUrl + 'Group/' + userId, group, httpOptions);
  }

  updateGroup(group: Group): Observable<Group>{
    return this.http.put<Group>(this.baseApiUrl + 'Group', group, httpOptions);
  }

  deleteGroup(id: number): Observable<Group>{
    return this.http.delete<Group>(this.baseApiUrl + 'Group/' + id, httpOptions);
  }

  getGroupRequest(userId: number, groupId: number): Observable<GroupRequest>{
    return this.http.get<GroupRequest>(this.baseApiUrl + 'GroupRequest/' + userId + '/' + groupId);
  }

  getGroupsJoinRequests(groupId: number, type: number): Observable<GroupRequest[]>{
    return this.http.get<GroupRequest[]>(this.baseApiUrl + 'GroupRequest/' + groupId + '/' + type);
  }

  getUsersJoinRequests(userId: number, type: number): Observable<GroupRequest[]>{
    return this.http.get<GroupRequest[]>(this.baseApiUrl + 'GroupRequest/' + userId + '/' + type);
  }

  addGroupRequest(groupRequest: GroupRequest): Observable<GroupRequest>{
    return this.http.post<GroupRequest>(this.baseApiUrl + 'GroupRequest', groupRequest, httpOptions);
  }

  acceptGroupRequest(groupRequest: GroupRequest): Observable<GroupRequest>{
    return this.http.post<GroupRequest>(this.baseApiUrl + 'GroupRequest', groupRequest, httpOptions);
  }

  deleteGroupRequest(userId: number, groupId: number): Observable<GroupRequest>{
    return this.http.delete<GroupRequest>(this.baseApiUrl + 'GroupRequest/' + userId + '/' + groupId);
  }

  leaveGroup(userId: number, groupId: number): Observable<GroupUser>{
    return this.http.delete<GroupUser>(this.baseApiUrl + 'GroupUser/' + userId + '/' + groupId);
  }
}
