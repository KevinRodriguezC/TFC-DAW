export function UserProfilePicture({
  user,
  size,
}: {
  user: any;
  size: String;
}) {
  const colorStringArray = ["bg-blue-600", "bg-red-600", "bg-purple-600"];

  return user && user.name && user.username ? (
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
