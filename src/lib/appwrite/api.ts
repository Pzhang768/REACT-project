import { ID, Query } from 'appwrite'

import { INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases } from './config';

export async function createUserAccount(user: INewUser){
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        )
        if(!newAccount) throw Error; 

        const avatarUrl = avatars.getInitials(user.name);
        const actualURL = new URL(avatarUrl);

        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            email: newAccount.email,
            name: newAccount.name,
            username: user.username,
            imageUrl: actualURL,
        })

        return newUser;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function saveUserToDB(user : {
    accountId: string;
    email: string;
    name: string;
    imageUrl: URL;
    username?: string;
}) {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user
        )
        return newUser
    } catch (error){
        console.log(error);
    }
}

export async function signInAccount(user: { email: string; password: string }) {
    try {
      const activeSession = await checkActiveSession();
      if (activeSession) {
        // Delete the active sessions if one exists
        await deleteSessions();
      }
      const session = await account.createEmailPasswordSession(user.email, user.password);
      return session;
    } catch (error) {
      console.log(error);
    }
}
export const checkActiveSession = async (): Promise<boolean> => {
    try {
        const session = await account.getSession('current'); // Get the current session
        return session !== null; // Return true if there is an active session
    } catch (error: any) {
        // If there's an error (e.g., no active session), handle it appropriately
        if (error.code === 401) {
            return false; // No active session
        }
        throw error; // Re-throw other unexpected errors
    }
};

export const deleteSessions = async (): Promise<void> => {
    try {
      // Get the list of all sessions
      const sessions = await account.listSessions();
  
      // Delete each session
      await Promise.all(
        sessions.sessions.map(async (session) => {
          await account.deleteSession(session.$id);
        })
      );
  
      console.log('All sessions deleted successfully');
    } catch (error: any) {
      console.error('Error deleting sessions:', error.message);
      throw error; // Re-throw the error for further handling
    }
};
export async function getCurrentUser() {
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;
        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )
        
        if (!currentUser) throw Error;

        return currentUser.documents[0]
    } catch (error){
        console.log(error);
    }
}