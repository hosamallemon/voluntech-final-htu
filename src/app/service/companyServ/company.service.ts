import { Injectable } from '@angular/core';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/service/authServ/auth.service';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private volunteercollection:AngularFirestoreCollection<Company>;
  userState$? : Observable<Company | null | undefined>;
  isLoggedInCompany$ = this.authService.userState$.pipe(
    switchMap((userCredentials)=> {
      if(userCredentials){
        // might be regular user or company
          return this.volunteercollection.doc(userCredentials.uid)
          .get()
          .pipe(switchMap((profile)=> {
            if(profile.exists) return of(true);
            else return of(false);
          }));
      }
      else {
        return of(false);
      }
    })
  )

  constructor(private firestore:AngularFirestore,private authService:AuthService) {
    this.volunteercollection = this.firestore.collection('companies');
    this.userState$ = this.authService.userState$
    .pipe(
      switchMap((data)=> {
          if(data){
            return this.get(data?.uid).pipe(
              map(userObj =>  userObj.data())
            );
          }
          else {
            return of(null);
          }

      })
    )
  }
get(id:string){
  // const docRef = doc(this.firestore,'volunteers/'+id);
  // return docData(docRef , {idField:'id'}) ;
  return from(this.volunteercollection.doc<Company>(id).get());
}
create(volunteerProfile: Company){
  //  return addDoc(this.profilesCollection,profile);
 return from(this.volunteercollection.doc(volunteerProfile.uid).set(volunteerProfile));
}
update(volunteerProfile:Company){
  // const docRef = doc(this.firestore,'volunteers/'+volunteer.id);
  // return updateDoc(docRef,{...volunteer});
  return from(this.volunteercollection.doc(volunteerProfile.uid).update({...volunteerProfile}));
}
}
export interface Company{
  uid?:string,
  companyName?:string,
  companyType?:string,
  logo?:string,
  phone?:string,
  url?:string,
  email:string,
  type?:string
}
