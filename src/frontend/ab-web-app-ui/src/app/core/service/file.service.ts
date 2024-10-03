import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FileDto} from "../models/file";
const baseUrl = environment.APPOINTMENT_BOOKING_URL;

@Injectable({
  providedIn: 'root'
})
export class FileService {
  url = `${baseUrl}/file`;
  constructor(private http: HttpClient) {
  }
  uploadFile(id: number, file: File): Observable<FileDto> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post<FileDto>(`${this.url}/upload/${id}`, formData);
  }

  getFileMetadata(id: number): Observable<FileDto> {
    return this.http.get<FileDto>(`${this.url}/${id}`);
  }

  deleteFile(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  getDownloadLink(filePath: string): Observable<string> {
    return this.http.get(`${this.url}/doownloadlink/${filePath}`, { responseType: 'text' });
  }
  getUserFile(userId:number):Observable<string>{
    return this.http.get(`${this.url}/userFile/${userId}`,{responseType:'text'});
  }
}
