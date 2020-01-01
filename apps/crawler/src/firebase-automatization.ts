// import { environment } from './environments/environment';
// import * as fetch from 'node-fetch';
// import * as admin from 'firebase-admin';

// admin.initializeApp({
//   credential: admin.credential.cert(environment.firebase_service_account)
// });

// const db = admin.firestore();

// function writeAnimeData(data) {
//   return db.collection('animes').add({
//     ...data
//   });
// }

// function writeLogErrorData(data) {
//   return db.collection('errors').add(data);
// }

// function removeCollection(path) {
//   // Get a new write
//   const batch = db.batch();

//   db.collection(path)
//     .listDocuments()
//     .then(val => {
//       val.map(val => {
//         batch.delete(val);
//       });

//       batch.commit();
//     });
// }

// function getAnimes() {
//   get('http://localhost:3000/anime')
//     .then(response => {
//       response.animes.forEach(async value => {
//         if (value.hash) {
//           value.cover = environment.base_path + value.cover;
//           const detail = await get(
//             `http://localhost:3000/anime/detail/${value.hash}`
//           );
//           writeAnimeData({
//             ...value,
//             ...detail
//           });
//         }
//       });
//     })
//     .catch(error => {
//       writeLogErrorData(
//         {
//           msg: 'temos um erro originado na função getAnimes()'
//         },
//         error
//       );
//     });
// }

// getAnimes();
// removeCollection('animes');
console.warn(
  'Função desativada por segurança, valide se o cloud firestore tem dados antes de executar'
);

// function get(url) {
//   return fetch(url)
//     .then(response => response.json())
//     .catch(error => {
//       writeLogErrorData(
//         {
//           msg: `temos um erro originado na função get(${url})`
//         },
//         error
//       );
//     });
// }
