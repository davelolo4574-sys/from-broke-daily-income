import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  Timestamp,
  getDocFromServer
} from 'firebase/firestore';
import { db, auth } from '../firebase';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string;
    email?: string | null;
    emailVerified?: boolean;
    isAnonymous?: boolean;
    tenantId?: string | null;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Generic CRUD helpers
export const getCollection = async <T>(path: string, constraints: any[] = []) => {
  try {
    const q = query(collection(db, path), ...constraints);
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
};

export const getDocument = async <T>(path: string, id: string) => {
  try {
    const docRef = doc(db, path, id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() } as T;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `${path}/${id}`);
    return null;
  }
};

export const createDocument = async <T extends object>(path: string, data: T) => {
  try {
    const docRef = await addDoc(collection(db, path), {
      ...data,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
    return null;
  }
};

export const updateDocument = async <T extends object>(path: string, id: string, data: Partial<T>) => {
  try {
    const docRef = doc(db, path, id) as any;
    await updateDoc(docRef, data as any);
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${path}/${id}`);
    return false;
  }
};

export const deleteDocument = async (path: string, id: string) => {
  try {
    const docRef = doc(db, path, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${path}/${id}`);
    return false;
  }
};

// Test connection helper
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection') as any);
  } catch (error) {
    if(error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
  }
}
