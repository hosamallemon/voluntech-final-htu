import { Injectable } from '@angular/core';
import { collectionData, CollectionReference, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class VolunteerService {

  private volunteercollection:AngularFirestoreCollection<Volunteer>;
  userState$? : Observable<Volunteer | null | undefined>;
  isLoggedInUserRegularProfile$ = this.authService.userState$.pipe(
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
    this.volunteercollection = this.firestore.collection('volunteers');
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
  return from(this.volunteercollection.doc<Volunteer>(id).get());
}
create(volunteerProfile: Volunteer){
  //  return addDoc(this.profilesCollection,profile);
 return from(this.volunteercollection.doc(volunteerProfile.uid).set(volunteerProfile));
}
update(volunteerProfile:Volunteer){
  // const docRef = doc(this.firestore,'volunteers/'+volunteer.id);
  // return updateDoc(docRef,{...volunteer});
  return from(this.volunteercollection.doc(volunteerProfile.uid).update({...volunteerProfile}));
}}
export interface Volunteer{
  uid?:string,
  firstName?:string | null,
  lastName?:string,
  skills?:string| undefined | null,
  experiences?:any,
  courses?:any,
  phone?:string,
  availableTime?:string,
  city?:string,
  email:string,
}
