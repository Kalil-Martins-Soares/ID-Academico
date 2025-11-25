export enum StudentStatus {
  PENDING_DOCS = 'PENDING_DOCS',
  PENDING_PAYMENT = 'PENDING_PAYMENT',
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED'
}

export interface Student {
  uid: string;
  email: string;
  fullName: string;
  course: string;
  enrollmentId: string;
  photoUrl: string;
  validUntil: string; // ISO Date string
  status: StudentStatus;
  documentsUploaded: boolean;
}

export interface AuthState {
  user: Student | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
  updateStatus: (status: StudentStatus) => void;
  updateStudentData: (data: Partial<Student>) => void;
}

export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

// Mock Firestore Schema Definition for reference
export const FIRESTORE_SCHEMA_REFERENCE = {
  collection: "students",
  document: {
    uid: "string (unique)",
    personal_info: {
      full_name: "string",
      cpf: "string",
      birth_date: "timestamp"
    },
    academic_info: {
      course: "string",
      enrollment_id: "string",
      institution: "UFPI",
      level: "Undergraduate"
    },
    media: {
      photo_url: "string (firebase storage url)",
      document_front_url: "string",
      document_back_url: "string",
      proof_of_enrollment_url: "string"
    },
    subscription: {
      status: "active | pending | expired",
      valid_until: "timestamp",
      last_payment_date: "timestamp",
      payment_id: "string"
    },
    security: {
      qr_hash: "string (dynamic salt + id)"
    }
  }
};