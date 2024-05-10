import { getUserInfo } from "./model/user";

export async function getUserSession(session: any) {
  // Get the user session
  const userId = session.get("userId");
  if (!userId || !+userId) {
    return { userId, userInfo: { username: null, name: null } };
  } else {
    // Get the user info
    const userQueryInfo = await getUserInfo(+userId);

    // Check if the user exist
    if (!userQueryInfo) {
      throw new Response("Error", { status: 500 });
    }
    return {
      userId,
      userInfo: {
        username: userQueryInfo.username,
        name: userQueryInfo.name + " " + userQueryInfo.lastname,
        profilePictureColor: userQueryInfo.profilePictureColor,
      },
    };
  }
}
