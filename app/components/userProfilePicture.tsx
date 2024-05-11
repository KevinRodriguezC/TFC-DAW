import { colorStringArray } from "../profilePictureColors";

export function UserProfilePicture({
  user,
  size,
}: {
  user: any;
  size: String;
}) {
  return user && user.username ? (
    <div
      className={
        "rounded-full flex items-center justify-center text-white font-bold select-none " +
        size +
        " " +
        colorStringArray[user.profilePictureColor - 1]
      }
    >
      {user.username.charAt(0)}
    </div>
  ) : (
    ""
  );
}
