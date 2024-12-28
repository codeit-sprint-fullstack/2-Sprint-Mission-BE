export default function filterSensitiveUserData(user) {
  const { password, ...filteredUser } = user;
  return filteredUser;
}