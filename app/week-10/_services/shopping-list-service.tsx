import { db } from "../_utils/firebase";

import { collection, getDocs, addDoc, query } from 'firebase/firestore';
// get Item
interface itemProps {

  name: string,
  quantity: number,
  category: string,
}

export async function getItems(userId: string) {
  try {
    const itemsRef = collection(db, "users", userId, "items");
    const snapshot = await getDocs(itemsRef);
    const items = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return items;
  }
  catch (error) {
    console.error("Error fetching user items: ", error);
    throw error;
  }
}
// add Item 
export async function addItem(userId: string, item: itemProps): Promise<string> {
  try {
    const itemRef = collection(db, "users", userId, "items");
    const docRef = await addDoc(itemRef, item);
    return docRef.id;
  }
  catch (error) {
    console.error("Error to create Item: ", error);
    throw error;
  }
}