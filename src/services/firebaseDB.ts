import { db } from "../config/firebase";
import {
	setDoc,
	addDoc,
	getDoc,
	getDocs,
	updateDoc,
	deleteDoc,
	doc,
	collection,
	query,
	where,
	limit,
	startAfter,
	orderBy
} from "firebase/firestore";
// type
import {
	Firestore,
	QuerySnapshot,
	DocumentSnapshot,
	QueryDocumentSnapshot,
	DocumentReference,
	Query,
	DocumentData,
	WhereFilterOp
} from "firebase/firestore";
type CollectionDB = "user" | "advertisement";

class FirebaseDB {
	db: Firestore;
	constructor(db: Firestore) {
		this.db = db;
	}
	// transform data
	transformDocs = (docsSnap: QuerySnapshot<DocumentData>) => {
		const items: { id: string }[] = [];
		for (let doc of docsSnap.docs) {
			items.push(this.transformDoc(doc));
		}
		return items;
	};
	transformDoc = (docSnap: DocumentSnapshot<DocumentData>) => {
		return {
			id: docSnap.id,
			...docSnap.data()
		};
	};
	// read ref
	getDocRef = (collectionID: CollectionDB, id?: string) => {
		if (id) {
			return doc(this.db, collectionID, id);
		} else {
			return doc(this.db, collectionID);
		}
	};
	getDocsRef = (collectionID: CollectionDB) => {
		return collection(this.db, collectionID);
	};
	// get doc
	getDocById = async (collectionID: CollectionDB, id: string) => {
		try {
			const docRef = this.getDocRef(collectionID, id);
			const docSnap = await getDoc(docRef);
			if (!docSnap.exists()) throw Error("No such document!");
			return this.transformDoc(docSnap);
		} catch (error) {
			throw error;
		}
	};
	getAllDocs = async (collectionID: CollectionDB) => {
		try {
			const docsRef = this.getDocsRef(collectionID);
			const docsSnap = await getDocs(docsRef);
			return this.transformDocs(docsSnap);
		} catch (error) {
			throw error;
		}
	};
	getSortedDosc = async <T, K extends keyof T>(
		collectionID: CollectionDB,
		sortedBy: K,
		quantity: number
	) => {
		try {
			const docsRef = this.getDocsRef(collectionID);
			let q = query(docsRef, orderBy(`${sortedBy}`), limit(quantity));
			const docsSnap = await getDocs(q);
			const lastDoc = docsSnap.docs[docsSnap.docs.length - 1];
			return {
				docs: this.transformDocs(docsSnap),
				lastDoc
			};
		} catch (error) {
			throw error;
		}
	};
	getNextSortedDosc = async <T, K extends keyof T>(
		collectionID: CollectionDB,
		sortedBy: K,
		quantity: number,
		prevDoc: QueryDocumentSnapshot<DocumentData>
	) => {
		try {
			const docsRef = this.getDocsRef(collectionID);
			let q = query(
				docsRef,
				orderBy(`${sortedBy}`),
				startAfter(prevDoc),
				limit(quantity)
			);
			const docsSnap = await getDocs(q);
			const lastDoc = docsSnap.docs[docsSnap.docs.length - 1];
			return {
				docs: this.transformDocs(docsSnap),
				lastDoc
			};
		} catch (error) {
			throw error;
		}
	};
	getFiltreDocs = async <T, K extends keyof T>(
		collectionID: CollectionDB,
		filter: {
			field: K;
			opStr: WhereFilterOp;
			value: T[K];
		},
		quantity: number
	) => {
		try {
			const { field, opStr, value } = filter;
			const docsRef = this.getDocsRef(collectionID);
			let q = query(
				docsRef,
				where(`${field}`, opStr, value),
				limit(quantity)
			);
			const docsSnap = await getDocs(q);
			const lastDoc = docsSnap[docsSnap.docs.length - 1];
			return {
				docs: this.transformDocs(docsSnap),
				lastDoc
			};
		} catch (error) {
			throw error;
		}
	};
	getNewFiltreDocs = async <T, K extends keyof T>(
		collectionID: CollectionDB,
		filter: {
			field: K;
			opStr: WhereFilterOp;
			value: T[K];
		},
		quantity: number,
		prevDoc: QueryDocumentSnapshot<DocumentData>
	) => {
		try {
			const { field, opStr, value } = filter;
			const docsRef = this.getDocsRef(collectionID);
			let q = query(
				docsRef,
				where(`${field}`, opStr, value),
				startAfter(prevDoc),
				limit(quantity)
			);
			const docsSnap = await getDocs(q);
			const lastDoc = docsSnap[docsSnap.docs.length - 1];
			return {
				docs: this.transformDocs(docsSnap),
				lastDoc
			};
		} catch (error) {
			throw error;
		}
	};
	getSortefAndFiltreDocs = async <T, K extends keyof T, U extends keyof T>(
		collectionID: CollectionDB,
		sortedBy: U,
		filter: {
			field: K;
			opStr: WhereFilterOp;
			value: T[K];
		},
		quantity: number
	) => {
		try {
			const { field, opStr, value } = filter;
			const docsRef = this.getDocsRef(collectionID);
			let q = query(
				docsRef,
				orderBy(`${sortedBy}`),
				where(`${field}`, opStr, value),
				limit(quantity)
			);
			const docsSnap = await getDocs(q);
			const lastDoc = docsSnap.docs[docsSnap.docs.length - 1];
			return {
				docs: this.transformDocs(docsSnap),
				lastDoc
			};
		} catch (error) {
			throw error;
		}
	};
	getNewSortefAndFiltreDocs = async <T, K extends keyof T, U extends keyof T>(
		collectionID: CollectionDB,
		sortedBy: U,
		filter: {
			field: K;
			opStr: WhereFilterOp;
			value: T[K];
		},
		quantity: number,
		prevDoc: QueryDocumentSnapshot<DocumentData>
	) => {
		try {
			const { field, opStr, value } = filter;
			const docsRef = this.getDocsRef(collectionID);
			let q = query(
				docsRef,
				orderBy(`${sortedBy}`),
				where(`${field}`, opStr, value),
				startAfter(prevDoc),
				limit(quantity)
			);
			const docsSnap = await getDocs(q);
			const lastDoc = docsSnap.docs[docsSnap.docs.length - 1];
			return {
				docs: this.transformDocs(docsSnap),
				lastDoc
			};
		} catch (error) {
			throw error;
		}
	};
	// writh doc
	createDocWithId = async <T>(
		collectionID: CollectionDB,
		id: string,
		data: T
	) => {
		try {
			const docRef = this.getDocRef(collectionID, id);
			await setDoc(docRef, data);
		} catch (error) {
			throw error;
		}
	};
	createDoc = async <T>(collectionID: CollectionDB, data: T) => {
		try {
			const docRef = this.getDocsRef(collectionID);
			return await addDoc(docRef, data);
		} catch (error) {
			throw error;
		}
	};
	// update doc
	updateDoc = async <T>(collectionID: CollectionDB, id: string, data: T) => {
		try {
			const docRef = this.getDocRef(collectionID, id);
			await updateDoc(docRef, data);
		} catch (error) {
			throw error;
		}
	};
	updateDocByRef = async <T>(
		ref: DocumentReference<DocumentData>,
		data: T
	) => {
		try {
			await updateDoc(ref, data);
		} catch (error) {
			throw error;
		}
	};
	// delete doc
	deleteDoc = async (collectionID: CollectionDB, id: string) => {
		try {
			const docRef = this.getDocRef(collectionID, id);
			await deleteDoc(docRef);
		} catch (error) {
			throw error;
		}
	};
}

const firebaseDB = new FirebaseDB(db);

export { firebaseDB };
