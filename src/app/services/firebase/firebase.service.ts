import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Elderly } from 'src/app/controller/interfaces/elderly.interface';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  httpOptions = {
    headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set(
        'Authorization',
        'key=AAAA9cCMxsg:APA91bEEMeXFsc9C9N9lLoVvr_qW4mA5aL26RKUAoYyXIGO7SNADWzqxYVEToACFuFSzAdj6l_tlsjHuu09kmABRAiPHJ2AgxadsqQVjLhIr6fv8GhojmkxtSHdiocLTpYi-AGRel1bk'
      )
      .set('skip', 'true'),
  };

  constructor(private firestore: AngularFirestore, private http: HttpClient) {}

  makePostRequest(
    URL: string,
    data: any,
    headers = this.httpOptions
  ): Observable<any> {
    return this.http.post(URL, data, headers);
  }

  async sendMessage(
    carerUid: string,
    elderlyUsername: string,
    message: any,
    elderly: Elderly
  ) {
    try {
      const currentDate =
        firebase.default.firestore.FieldValue.serverTimestamp();
      const doc = await this.firestore
        .collection('chatrooms')
        .doc(`${carerUid}_${elderlyUsername}`)
        .get()
        .toPromise();
      if (!doc.exists) {
        await this.firestore
          .collection('chatrooms')
          .doc(`${carerUid}_${elderlyUsername}`)
          .set({
            docId: carerUid + '_' + elderlyUsername,
            carerUid,
            elderlyUsername,
          });
      }
      await this.firestore
        .collection(`chatrooms/${carerUid}_${elderlyUsername}/messages`)
        .add({ message: message, timestamp: currentDate });

      // const preview = await this.firestore
      //   .collection(`messages/${carerUid}/chatrooms`)
      //   .doc(`${carerUid}_${elderlyUsername}`)
      //   .get()
      //   .toPromise();

      await this.firestore
        .collection(`messages/${carerUid}/chatrooms`)
        .doc(`${carerUid}_${elderlyUsername}`)
        .set({
          docId: carerUid + '_' + elderlyUsername,
          carerUid,
          elderlyUsername,
          timestamp: currentDate,
          read: false,
          chatName: `${elderly.name} ${elderly.surname}`,
        });
    } catch (error) {
      console.log(error);
    }
  }

  async sendNotification(uid: string, elderly: Elderly) {
    try {
      const data = await this.firestore
        .collection(`tokens/${uid}/tokenItems`)
        .ref.get();
      data.forEach(async (doc) => {
        const dataDoc: any = doc.data();
        debugger;
        const token = await this.firestore
          .collection(`tokenItems`)
          .doc(dataDoc.token)
          .ref.get();
        debugger;
        if (token.exists) {
          await this.createNotification(dataDoc.token, elderly).toPromise();
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  createNotification(token: string, elderly: Elderly): Observable<any> {
    const URL = 'https://fcm.googleapis.com/fcm/send';
    console.log(token);

    const data = {
      notification: {
        title: `Nuevo mensaje`,
        body: `${elderly.name} ${elderly.surname} te envio un mensaje`,
      },
      data: {
        link: 'https://vitaapp-ucuenca-carer.web.app/adulto-mayor',
      },
      to: token,
    };
    return this.makePostRequest(URL, data);
  }
}
