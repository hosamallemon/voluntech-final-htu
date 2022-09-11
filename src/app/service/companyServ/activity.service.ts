import { Injectable } from '@angular/core';
import { from, map, of, switchMap } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../authServ/auth.service';
import { collectionData } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private activitiesCollection: AngularFirestoreCollection<Activity>;
  currentUserActvities$? : Observable<Activity[] | null | undefined>;

  constructor(private firestore:AngularFirestore,
    private authService: AuthService)

  {
    this.activitiesCollection = this.firestore.collection('activities');
    this.currentUserActvities$ = this.authService.userState$
    .pipe(
      switchMap((data)=> {

          if(data){
            console.log('getting activities for company', data.uid);
            return this.getCompanyActivites(data?.uid);
          }
          else {
            return of(null);
          }
      }),
      // map((data)=> {
      //     data?.forEach(obj => {

      //     });
      // })
    )
   }

  getAll() : Observable<Activity[]> {
      return this.activitiesCollection.valueChanges({'idField':'id'}) as Observable<Activity[]>
      // collectionData(this.profilesCollection, {idField:'id'}) as Observable<ProfileData[]>;
  }
  // currentUser$?: Observable<ProfileData | null | undefined>  ;
  get(id: string){
      // return from(this.profilesCollection.ref.doc('/'+id).get());
    return from(this.activitiesCollection.doc<Activity>(id).get()).pipe(map(activity=>activity.data()));
  }

  getCompanyActivites(companyId: string){
    return this.firestore.collection<Activity>('activities', ref=> ref.where("companyId", '==', companyId)).valueChanges({'idField':'id'});
  }

  addApplicant(applicant : ActivityApplicant){
    // item = collectionData(collection())

    this.activitiesCollection.doc(applicant.activityId).collection('applicants').add(
      {
      applicantId: applicant.applicantUserId,
      applicantFirstName: applicant.applicantFirstName,
      applicantLastName: applicant.applicantLastName,
      applicantCity: applicant.applicantCity,
      applicantSkills: applicant.applicantSkills,
      approved: false,
      photoUrl:applicant.photoUrl,
      // idField: collection('applicants').id

    });
  }

  getApplicant(activityId: string){
    return this.firestore.collection<Activity>('activities').doc(activityId).collection<ActivityApplicant>('applicants').valueChanges({'idField':'id'});
  }
  approveApplicant(activityApplicant: ActivityApplicant){
    return from(this.activitiesCollection.doc(activityApplicant.activityId).collection('applicants').doc(activityApplicant.id).update(activityApplicant));
  }

  create(activity: Activity){
    //  return addDoc(this.profilesCollection,profile);
  return from(this.activitiesCollection.add(activity));
  }

  update(activity: Activity){
    // const docReference = doc(this.firestore, 'profiles/'+profile.id);
    // return updateDoc(docReference, {...profile});
    return from(this.activitiesCollection.doc().update({...activity}));
  }

  delete(id: string){
    // const docReference = doc(this.firestore, 'profiles/'+id);
    // return deleteDoc(docReference);
    return from(this.activitiesCollection.doc(id).delete());

  }
}
export interface Activity {
  id?: string,
  name?: string,
  description?: string,
  companyName?:string,
  companyType?:string,
  skillsRequired?:string[]|null|undefined,
  range?: {
    start?: any | null | undefined,
    end?: any | null | undefined
  },
  companyId?: string
}
export interface ActivityApplicant {
  id?: string,
  applicantUserId?: string,
  activityId: string,
  applicantFirstName?: string,
  applicantLastName?: string,
  applicantCity?: string,
  applicantSkills?: string[]|null|undefined,
  applicantImageUrl?: string,
  approved?: boolean,
  photoUrl?:string
};
