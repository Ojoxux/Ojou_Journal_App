import { db } from '../../firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

interface Journal {
  id: string;
  title: string;
  content: string;
  date: string;
  feedback?: string;
}

export const fetchJournals = async (): Promise<Journal[]> => {
  const journalCollection = collection(db, 'journals');
  const journalSnapshot = await getDocs(journalCollection);
  return journalSnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Journal
  );
};

export const saveJournal = async (title: string, content: string): Promise<Journal> => {
  const newJournal = {
    title,
    content,
    date: new Date().toISOString(),
  };
  const docRef = await addDoc(collection(db, 'journals'), newJournal);
  return { ...newJournal, id: docRef.id };
};

export const editJournal = async (id: string, title: string, content: string): Promise<void> => {
  const journalDoc = doc(db, 'journals', id);
  await updateDoc(journalDoc, { title, content });
};

export const deleteJournal = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, 'journals', id));
};
