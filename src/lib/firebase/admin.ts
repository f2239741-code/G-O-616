/**
 * Firebase Admin helper interface
 * Designed for server-side verification and cloud security contexts.
 */

export interface FirebaseAdminContext {
  projectId: string;
  isInitialized: boolean;
}

export function getFirebaseAdminContext(): FirebaseAdminContext {
  return {
    projectId: process.env?.FIREBASE_PROJECT_ID || 'guardian-oracle-prod',
    isInitialized: true
  };
}
