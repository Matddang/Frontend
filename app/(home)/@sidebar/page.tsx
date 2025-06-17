import LoggedInView from "./_components/LoggedInView";
import LoggedOutView from "./_components/LoggedOutView";

export default function page() {
  const isLoggedIn = true;
  return isLoggedIn ? <LoggedInView /> : <LoggedOutView />;
}
