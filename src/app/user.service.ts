import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  loginUser(username: string, password: string) {
    return this.http.post<any[]>('./api/user/login', {'username': username, 'password': password});
  }
  registerUser(username: string, email: string, password: string) {
    return this.http.post<any[]>('./api/user/register', {
      'username': username, 'email': email, 'password': password
    });
  }
  logout() {
    localStorage.clear();
    sessionStorage.clear();
  }
  authUser() {
    return this.http.post<any[]>('./api/user/auth', {"_id": this.getToken()})
  }

  checkAdmin() {
    return this.http.post<any>(`./api/user/auth/admin`, {id: this.getToken()})
  }

  setToken(_id: string) {
    localStorage.setItem("token", _id)
  }
  getToken() {
    return localStorage.getItem("token")
  }
  setSession(username: string) {
    sessionStorage.setItem("session_user", username);
  }
  getSession() {
    return sessionStorage.getItem("session_user");
  }

  getCollections() {
    return this.http.get<any[]>(`./api/user/collection/${this.getToken()}`)
  }
  getSharedCollections() {
    return this.http.get<any[]>(`./api/user/collection/${this.getToken()}/shared`)
  }
  newCollection(name: string) {
    return this.http.post<any>('./api/user/collection/new', {"name": name, "owner": this.getSession(), "ownerId": this.getToken()});
  }
  checkUser(username: string) {
    return this.http.get<any>(`./api/user/check/${username}`)
  }
  getCollectionPermission(_id: string) {
    return this.http.get<any>(`./api/user/collection/${_id}/permission`)
  }
  saveCollectionPermission(_id: string, permissions: string[]) {
    return this.http.put<any>(`./api/user/collection/${_id}/permission`, {'permissions': permissions, 'userId': this.getToken()});
  }
  deleteCollection(_id: string) {
    return this.http.delete<any>(`./api/user/collection/delete`, {params: new HttpParams().set("userId", this.getToken()).set("_id", _id)})
  }
  editCollection(_id: string, name: string) {
    return this.http.put<any>(`./api/user/collection/edit`, {'_id': _id, 'userId': this.getToken(), 'name': name});
  }
  getCollection(_id: string) {
    return this.http.get<any>('./api/user/collection', {params: new HttpParams().set("userId", this.getToken()).set("_id", _id)})
  }

  addCollectionItem(type: string, itemId: string, poster: string, name: string, collectionId: string) {
    return this.http.post<any>(`./api/user/collection/add`, {
      '_id': collectionId,
      'userId': this.getToken(),
      'itemId': itemId,
      'name': name,
      'type': type,
      'poster': poster
    });
  }
  removeCollectionItem(_id: string, itemId: string, type: string) {
    return this.http.put<any>(`./api/user/collection/remove`, {'_id': _id, 'itemId': itemId, 'type': type, 'userId': this.getToken()});
  }
  getCollectionCount() {
    return this.http.get<any>(`./api/user/collection/count/${this.getToken()}`);
  }

  getWatched() {
    return this.http.get<any[]>(`./api/user/watched/${this.getToken()}`)
  }
  getFavourite() {
    return this.http.get<any[]>(`./api/user/favourite/${this.getToken()}`)
  }
  
  addWatchedItem(type: string, itemId: string, poster: string, name: string) {
    return this.http.post<any>(`./api/user/watched/${this.getToken()}/add`, {
      'type': type,
      'name': name,
      'poster': poster,
      'itemId': itemId
    })
  }
  addFavouriteItem(type: string, itemId: string, poster: string, name: string) {
    return this.http.post<any>(`./api/user/favourite/${this.getToken()}/add`, {
      'type': type,
      'name': name,
      'poster': poster,
      'itemId': itemId
    })
  }

  removeWatchedItem(type: string, itemId: string) {
    return this.http.put<any>(`./api/user/watched/${this.getToken()}/remove`, {
      'type': type,
      'itemId': itemId,
    })
  }
  removeFavouriteItem(type: string, itemId: string) {
    return this.http.put<any>(`./api/user/favourite/${this.getToken()}/remove`, {
      'type': type,
      'itemId': itemId,
    })
  }

  getUsers() {
    return this.http.get<any[]>(`./api/user/admin/get/${this.getToken()}`)
  }
  deleteUser(id: string) {
    return this.http.delete<any>(`./api/user/admin/delete/${id}`)
  }
  promoteUser(id: string) {
    return this.http.put<any>(`./api/user/admin/promote/${id}`, {})
  }
  demoteUser(id: string) {
    return this.http.put<any>(`./api/user/admin/demote/${id}`, {})
  }

  getNextUp() {
    return this.http.get<any[]>(`./api/user/dashboard/nextup/${this.getToken()}`)
  }
  getForYou() {
    return this.http.get<any[]>(`./api/user/dashboard/foryou/${this.getToken()}`)
  }

  sendVerificationEmail() {
    return this.http.get<any>(`./api/user/auth/${this.getToken()}/verify`)
  }
  sendResetEmail(email: string) {
    return this.http.get<any>(`./api/user/auth/${email}/reset`)
  }
  verifyPin(email: string, pin: number) {
    return this.http.get<any>(`./api/user/auth/${email}/pin/${pin}`)
  }
  verifyEmail(pin: number) {
    return this.http.get<any>(`./api/user/verify/${this.getToken()}/pin/${pin}`)
  }
  changePassword(email: string, pin: number, password: string) {
    return this.http.post<any>(`./api/user/auth/${email}/pin/${pin}`, {password: password})
  }
}
