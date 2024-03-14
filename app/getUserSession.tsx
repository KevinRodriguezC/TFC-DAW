import { getUserInfo } from "./model/user";

export async function getUserSession(session: any) {
  const userId = session.get("userId");
  if (!userId || !+userId) {
    return { userId, userInfo: { username: null, name: null } };
  } else {
    const userQueryInfo = await getUserInfo(+userId);
    if (!userQueryInfo) {
      throw new Response("Error", { status: 500 });
    }
    return {
      userId,
      userInfo: {
        username: userQueryInfo.username,
        name: userQueryInfo.name + " " + userQueryInfo.lastname,
      },
    };
  }
}
