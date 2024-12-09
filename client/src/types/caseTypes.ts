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
}

export interface NewCasePayload {
  patientId: number;
  scribeId?: number;
  doctorId?: number;
  title: string;
  description?: string;
  symptoms?: string;
  history?: string;
  statusId: number; // 1 by default
}

export interface CaseStatus {
  id: number;
  name: string;
}
