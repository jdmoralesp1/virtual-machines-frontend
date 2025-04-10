import { TokenResponse } from './../interfaces/token';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../interfaces/login';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { TokenDecode } from '../interfaces/token-decode';
import { CreateVM } from '../interfaces/create';
import { GenericResponse } from '../interfaces/generic-response';
import { CreateResponse } from '../interfaces/create-reponse';
import { ResponseErrorValidation } from '../interfaces/response-error-validation';
import { GetByIdResponse } from '../interfaces/get-by-id-response';
import { UpdateVM } from '../interfaces/update';
import { GetAllResponse } from '../interfaces/get-all-response';

@Injectable({
  providedIn: 'root'
})
export class VmsService {

  constructor(private http: HttpClient) { }
  urlBaseApi: string = `${environment.apiUrl}${environment.apiAuthSection}`;
  urlBaseVirtualMachine: string = `${environment.apiUrl}${environment.apiVmSection}`;

  login(login: Login): Observable<TokenResponse> {

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(login);

    return this.http.post<TokenResponse>(`${this.urlBaseApi}/login`, body, {headers});
  }

  create(request: CreateVM): Observable<GenericResponse<CreateResponse> | ResponseErrorValidation> {
    const headers = new HttpHeaders()
                            .set('Content-Type', 'application/json')
                            .set('Authorization', `Bearer ${sessionStorage.getItem('authToken')}`);
    const body = JSON.stringify(request);
    console.log(body);
    return this.http.post<GenericResponse<CreateResponse> | ResponseErrorValidation>(`${this.urlBaseVirtualMachine}/Create`, body, {headers},);
  }

  getById(id: number): Observable<GenericResponse<GetByIdResponse> | ResponseErrorValidation> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('authToken')}`);
    return this.http.get<GenericResponse<GetByIdResponse>>(`${this.urlBaseVirtualMachine}/GetById/${id}`, { headers });
  }

  getAll(): Observable<GenericResponse<GetAllResponse[]> | ResponseErrorValidation> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('authToken')}`);
    return this.http.get<GenericResponse<GetAllResponse[]>>(`${this.urlBaseVirtualMachine}/GetAll`, { headers });
  }

  deleteById(id: number): Observable<GenericResponse<string> | ResponseErrorValidation> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('authToken')}`);
    return this.http.delete<GenericResponse<string>>(`${this.urlBaseVirtualMachine}/DeleteById/${id}`, { headers });
  }

  update(request: UpdateVM, id: number): Observable<GenericResponse<string> | ResponseErrorValidation>{
    const headers = new HttpHeaders()
                            .set('Content-Type', 'application/json')
                            .set('Authorization', `Bearer ${sessionStorage.getItem('authToken')}`);
    const body = JSON.stringify(request);
    return this.http.put<GenericResponse<string> | ResponseErrorValidation>(`${this.urlBaseVirtualMachine}/Update/${id}`, body, {headers},);
  }

  setVariables(token: string): void {
    const decoded: TokenDecode = jwtDecode(token);
    sessionStorage.setItem('authToken', token);
    sessionStorage.setItem('role', decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
  }
}
