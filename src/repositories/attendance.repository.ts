import {
    doc,
    getDoc,
    getDocs,
    collection,
    query,
    where,
    writeBatch,
  } from "firebase/firestore";
  
  import { db } from "../firebase/firestore";
  
  import type {
    AttendanceRecord,
    AttendanceStatus,
  } from "../features/attendance/types/attendance.types";
  
  const attendanceCollection = collection(db, "attendance");
  
  export async function getAttendance(
    date: string,
    batchName?: string,
  ): Promise<AttendanceRecord[]> {
    const constraints = [where("date", "==", date)];
  
    if (batchName) {
      constraints.push(where("batch", "==", batchName));
    }
  
    const attendanceQuery = query(
      attendanceCollection,
      ...constraints,
    );
  
    const snapshot = await getDocs(attendanceQuery);
  
    return snapshot.docs.map((attendanceDoc) => ({
      id: attendanceDoc.id,
      ...attendanceDoc.data(),
    })) as AttendanceRecord[];
  }
  
  export async function getAttendanceStatus(
    studentId: string,
    date: string,
  ): Promise<AttendanceStatus | undefined> {
    const attendanceId = `${studentId}_${date}`;
    const attendanceRef = doc(
      db,
      "attendance",
      attendanceId,
    );
  
    const snapshot = await getDoc(attendanceRef);
  
    if (!snapshot.exists()) {
      return undefined;
    }
  
    return (snapshot.data() as AttendanceRecord).status;
  }
  
  export async function saveAttendance(
    records: AttendanceRecord[],
  ): Promise<void> {
    const batch = writeBatch(db);
  
    records.forEach((record) => {
      const attendanceId = `${record.studentId}_${record.date}`;
  
      const attendanceRef = doc(
        db,
        "attendance",
        attendanceId,
      );
  
      batch.set(attendanceRef, {
        studentId: record.studentId,
        studentName: record.studentName,
        batch: record.batch,
        date: record.date,
        status: record.status,
      });
    });
  
    await batch.commit();
  }