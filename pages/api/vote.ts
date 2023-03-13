// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import { db } from '../../firebase';
import cities from '../../lib/cities';
import { VoteOption } from '../../types';
function getKeyByValue(object: any, value: any) {
  for (const key in object) {
    if (object[key] === value) {
      return key;
    }
  }
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'POST') {
    const vote = req.body;
    try {
      let cityVotes = doc(
        db,
        `${getKeyByValue(cities, vote.city)}`,
        `${getKeyByValue(cities, vote.city)}`
      );
      await getDoc(cityVotes).then(async (docSnap) => {
        if (!docSnap.exists()) {
          await setDoc(
            doc(
              db,
              `${getKeyByValue(cities, vote.city)}`,
              `${getKeyByValue(cities, vote.city)}`
            ),
            {
              [VoteOption.Option1]: vote?.option === VoteOption.Option1 ? 1 : 0,
              [VoteOption.Option2]: vote?.option === VoteOption.Option2 ? 1 : 0,
              [VoteOption.Option3]: vote?.option === VoteOption.Option3 ? 1 : 0,
              [VoteOption.Option4]: vote?.option === VoteOption.Option4 ? 1 : 0,
            }
          );
          await updateDoc(cityVotes, {
            [vote?.option]: docSnap?.data()![vote?.option] + 1,
          }).then(() => res.send(`Document updated`));
        } else {
          await updateDoc(cityVotes, {
            [vote?.option]: docSnap.data()[vote?.option] + 1,
          }).then(() => res.send(`Document updated`));
        }
      });
      //   const docRef = await addDoc(
      //     collection(db, `${getKeyByValue(cities, vote.city)}`),
      //     {
      //       ...vote,
      //     }
      //   );
    } catch (e) {
      res.send(`Error adding document: ${e}`);
    }
  } else if (req.method === 'GET') {
    // db.collection("cart-items").onSnapshot((snapshot) => {
    //     let totalCount = 0;
    //     snapshot.docs.forEach((doc)=>{
    //         totalCount += doc.data().quantity;
    //     })
    //     setCartCounter(totalCount);
    // })
    // function addToCart(item) {
    //     let cartItem = db.collection('cart-items').doc(item.id);
    //     cartItem.get().then(function (doc) {
    //       if (doc.exists) {
    //         cartItem.update({
    //           quantity: doc.data().quantity + 1,
    //         });
    //       } else {
    //         cartItem.set({
    //           image: item.image,
    //           make: item.make,
    //           name: item.name,
    //           price: item.price,
    //           rating: item.rating,
    //           quantity: 1,
    //         });
    //       }
    //     });
    //   }
    const votes: any[] = [];
    for (const city of Object.keys(cities)) {
      const querySnapshot = await getDocs(collection(db, city));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        votes.push({
          id: doc.id,
          ...doc.data(),
        });
      });
    }
    res.send(votes);
  } else {
    res.status(200).json({ name: 'John Doe' });
  }
}
