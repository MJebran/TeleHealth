export interface User {
  id: number;
  username: string;
  email: string;
  password?: string;
  fullName?: string;
  gender?: string;
  roleId?: number | null;
  isApproved?: boolean;
  verified?: boolean;
  hasAcceptedAgreement?: boolean;
  agreementId?: number | null;
  createdAt?: string | null;
  role?: {
    id: number;
    roleName: string;
  } | null; // Allow role to be null
}

export interface NewUserPayload {
  username: string;
  password: string;
  email: string;
  fullName?: string | null;
  gender?: string | null;
  roleId?: number | null;
  isApproved?: boolean;
  verified?: boolean;
  hasAcceptedAgreement: boolean; // Required for backend
  agreementId?: number | null;
}

