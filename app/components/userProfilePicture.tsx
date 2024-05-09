export function UserProfilePicture({
  user,
  size,
}: {
  user: any;
  size: String;
}) {
  return (
    <div
      className={
        "rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-lg select-none " +
        size
      }
    >
      {user.username.charAt(0)}
    </div>
  );
}
