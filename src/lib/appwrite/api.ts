import { ID, ImageGravity, Permission, Query, Role } from 'appwrite'

import { INewPost, INewUser, IUpdatePost } from "@/types";
import { account, appwriteConfig, avatars, databases, storage } from './config';

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
      if (activeSession) { // Delete the active sessions if one exists
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

export async function signOutAccount(){
	try {
		const session = await account.deleteSession("current")
		return session;
	} catch (error) {
		console.log(error);
	}
}
export async function createPost(post: INewPost) {
    try {
      const uploadedFile = await uploadFile(post.file[0]);
      if(!uploadedFile) throw Error;
      const fileUrl = getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }
      const tags = post.tags?.replace(/ /g, "").split(",") || [];

      const newPost = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        ID.unique(),
        {
          creator: post.userId,
          caption: post.caption,
          imageUrl: fileUrl,
          imageId: uploadedFile.$id,
          location: post.location,
          tags: tags
        }
      )
      if (!newPost) {
        await deleteFile(uploadedFile.$id)
        throw Error;
      }
      return newPost;
    } catch (error) {
      console.log(error)
    }
}

export async function uploadFile(file: File) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file,
      [
        Permission.update(Role.any()),            
    ]
    );
    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
}

export function getFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000, // width 
      2000, // height
      ImageGravity.Top,
      100 // quality
    );
    if (!fileUrl) throw Error;
    return fileUrl;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteFile(fileId: string){
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId)
    return {status: 'ok'}
  } catch (error) {
    console.log(error)
  }
}

export async function getRecentPosts(){
  const posts = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.postCollectionId,
    [Query.orderDesc('$createdAt'), Query.limit(20)]
  )
  if (!posts) throw Error;
  return posts;
}

export async function likePost(postId: string, likesArray: string[]){
  try {
    const updatedPost= await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId,
      {
        likes: likesArray
      }
    )
    if(!updatedPost) throw Error;

    return updatedPost;
  } catch (error) {
    console.log(error)
  }
}

export async function savePost(userId: string, postId: string) {
  try {
    const updatedPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      ID.unique(),
      {
        user: userId,
        post: postId,
      }
    );
    if (!updatedPost) throw Error;
    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteSavedPost(savedRecordId: string) {
  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      savedRecordId
    );
    if (!statusCode) throw Error;
    return { status: "Ok" };
  } catch (error) {
    console.log(error);
  }
}
export async function getPostById(postId?: string) {
  if (!postId) throw Error;

  try {
    const post = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId
    );

    if (!post) throw Error;

    return post;
  } catch (error) {
    console.log(error);
  }
}

export async function updatePost(post: IUpdatePost) {
  const hasFileToUpdate = post.file.length > 0;
  try {
    let image = {
      imageUrl: post.imageUrl,
      imageId: post.imageId,
    }
    if(hasFileToUpdate){
      const uploadedFile = await uploadFile(post.file[0]);
      if(!uploadedFile) throw Error;

      const fileUrl = getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }
      const actualUrl = new URL(fileUrl);
      image = { ...image, imageUrl: actualUrl, imageId: uploadedFile.$id}
    }

    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      post.postId,
      {
        caption: post.caption,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
        location: post.location,
        tags: tags
      }
    )
    if (!updatedPost) {
      await deleteFile(post.imageId)
      throw Error;
    }
    return updatedPost;
  } catch (error) {
    console.log(error)
  }
}

export async function deletePost(postId: string, imageId: string){
  if(!postId || !imageId) throw Error;

  try {
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId
    )
    return { status: 'ok' }
  } catch (error) {
    console.log(error)
  }
}

export async function getInfinitePosts({ pageParam}: { pageParam:number}){
  const queries: any[] = [Query.orderDesc('$updatedAt'), Query.limit(20)]

  if(pageParam){
    queries.push(Query.cursorAfter(pageParam.toString()))
  }

  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      queries
    )
    if(!posts) throw Error;
    return posts;
  } catch (error) {
    console.log(error)
  }
}

export async function searchPosts(searchTerm: string){
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.search('caption', searchTerm)]
    )
    if(!posts) throw Error;
    return posts;
  } catch (error) {
    console.log(error)
  }
}

