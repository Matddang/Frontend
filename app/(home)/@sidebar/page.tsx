import LoggedInView from "./_components/LoggedInView";
import LoggedOutView from "./_components/LoggedOutView";

export default function page() {
  return (
    <>
      <LoggedOutView />
      {/* <LoggedInView /> */}
    </>
  );
}
