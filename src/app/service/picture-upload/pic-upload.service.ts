import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthService } from '../authServ/auth.service';
import { finalize } from 'rxjs';
import { CompanyService } from './../companyServ/company.service';


@Injectable({
  providedIn: 'root'
})
export class PicUploadService {

  constructor(private fireStorage: AngularFireStorage, private authService: AuthService,companyserv:CompanyService) { }

  uploadImage(image: File){
    const filePath = `$'profile_images/${image.name}`;
    const storageRef = this.fireStorage.ref(filePath);
    const uploadTask = this.fireStorage.upload(filePath, image);
    return uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL()
        .subscribe((data)=> {
            this.authService.userState$.subscribe((user)=> {
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
