import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { firebaseCollectionName } from "./constants";

export const getFirestoreDocRef = (
  docId: string,
  collectionName: string = firebaseCollectionName
) => {
  return doc(db, collectionName, docId);
};

export const getFirestoreData = async <T>(
  docId: string,
  collectionName: string = firebaseCollectionName
): Promise<T | null> => {
  const docRef = getFirestoreDocRef(docId, collectionName);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as T;
  }

  console.log("No such document!");
  return null;
};

export const updateFirestoreData = async <T>(
  docId: string,
  data: Partial<T>,
  collectionName: string = firebaseCollectionName
) => {
  const docRef = getFirestoreDocRef(docId, collectionName);
  await updateDoc(docRef, data);
};
