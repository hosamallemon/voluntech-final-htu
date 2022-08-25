import { Injectable } from '@angular/core';
import { collectionData, CollectionReference, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  // company:Company[]=[
  //     {
  //       id:1,
  //       companyName:'abilitiez',
  //       companyType:'it',
  //       logo:'aaaaaaaaaa',
  //       phone:'0796983060',
  //       url:'aaaa.com'
  //     },
  //     {
  //       id:2,
  //       companyName:'atypon',
  //       companyType:'it service',
  //       logo:'bbbbbbbbb',
  //       phone:'07777777',
  //       url:'bbbbbb.com'
  //     }
  // ];
  private companycollection:CollectionReference
  constructor(private firestore:Firestore) {
    this.companycollection = collection(this.firestore,'companies');
  }

  getAll():Observable<Company[]>{
    return collectionData(this.companycollection,{idField:'id'} ) as Observable<Company[]>;
  }
  get(id:string){
    const docRef = doc(this.firestore,'companies/'+id);
    return docData(docRef , {idField:'id'}) ;
  }
  update(company:Company){
    const docRef = doc(this.firestore,'companies/'+company.id);
    return updateDoc(docRef,{...company});
  }

}
export interface Company{
  id:string,
  companyName:string,
  companyType:string,
  logo:string,
  phone:string,
  url:string
}
