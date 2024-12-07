export interface User {
  id: number;
  fullName: string;
}

export interface Case {
  id: number;
  patientId: number;
  scribeId?: number | null;
  doctorId?: number | null;
  title: string;
  description?: string | null;
  symptoms?: string | null;
  history?: string | null;
  createdAt?: string | null;
  statusId?: number | null;
  patient?: User; // Add navigation properties
  doctor?: User;
}

export interface NewCasePayload {
  patientId: number;
  title: string;
  description?: string;
  symptoms?: string;
  history?: string;
  statusId?: number;
}

export interface CaseStatus {
  id: number;
  name: string;
}
