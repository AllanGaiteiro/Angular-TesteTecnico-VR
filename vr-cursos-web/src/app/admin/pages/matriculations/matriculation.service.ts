import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateMatriculationDto } from 'src/app/core/models/matriculation/dto/create-matriculation.dto';
import { Matriculation } from 'src/app/core/models/matriculation/entities/matriculation.entity';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatriculationService {
  resource: string = 'matriculations';
  constructor(private http: HttpClient) { }

  // CRUD
  find(options?: { relations?: string[], where: any }): Promise<Matriculation[]> {
    return new Promise((resolve, rejects) => {
      const params = options ? new HttpParams().append('options', JSON.stringify(options)) : new HttpParams();
      return this.http.get<Matriculation[]>(`${environment.backEndUrl}/${this.resource}`, { params }).subscribe(res => {
        this.logSucces('Find');
        resolve(res)
      });
    })
  }

  findOne(id: number): Promise<Matriculation> {
    return new Promise((resolve, rejects) => {
      this.http.get<Matriculation>(`${environment.backEndUrl}/${this.resource}/${id}`).subscribe(res => {
        this.logSucces('Find-One');
        resolve(res)
      });
    })
  }

  async create(data: CreateMatriculationDto): Promise<Matriculation> {
    return new Promise((resolve, rejects) => {
      this.http.post<Matriculation>(`${environment.backEndUrl}/${this.resource}/`, data).subscribe(res => {
        this.logSucces('Create');
        resolve(res)
      })
    })
  }

  update(id: number, data: Partial<CreateMatriculationDto>): Promise<Matriculation> {
    return new Promise((resolve, rejects) => {
      this.http.patch<Matriculation>(`${environment.backEndUrl}/${this.resource}/${id}`, data).subscribe(res => {
        this.logSucces('Update');
        resolve(res)
      })
    })
  }

  delete(id: number): Promise<void> {
    return new Promise((resolve, rejects) => {
      this.http.delete<void>(`${environment.backEndUrl}/${this.resource}/${id}`).subscribe((res) => {
        this.logSucces('Delete');
        resolve()
      })
    })
  }

  // Logs
  logSucces(text: string) {
    console.log(`Matriculation Service - ${text} - Success`);
  }

  logError(text: string, error: any) {
    console.error(`Student Service - ${text} - Error Ocurred: `, error);
  }
}
