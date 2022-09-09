import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthService } from '../authServ/auth.service';
import { finalize } from 'rxjs';
import { CompanyService } from './../companyServ/company.service';
import { Observable, map, take, from, filter } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class PicUploadService {
  filePath?:string;
  constructor(private fireStorage: AngularFireStorage, private authService: AuthService,companyserv:CompanyService) { }

  uploadImage(image: File, type:string){
    if(type == 'volunteerPic'){
      this.filePath = `$'volunteer_images/${image.name}`;
    }else{
      this.filePath = `$'profile_images/${image.name}`;
    }
    const storageRef = this.fireStorage.ref(this.filePath);
    const uploadTask = this.fireStorage.upload(this.filePath, image);
    return uploadTask
    .snapshotChanges()
    .pipe(
      // take(1),
      finalize(() => {
        storageRef.getDownloadURL()
        .subscribe((data)=> {
            this.authService.userState$
            .pipe(take(1))
            .subscribe((user)=> {
              if(user){
                user?.updateProfile( {
                  photoURL: data

                })
              }

            });
        });
      }));
  }
}
