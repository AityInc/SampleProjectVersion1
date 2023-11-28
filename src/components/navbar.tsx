import { Profile } from "./profile";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth-options";
import { getUser } from "@/lib/provider";
const title = process.env.APP_TITLE!;
const Logo = () => (
  <div>
    <a className="btn btn-ghost text-xl normal-case" href="/">
      {title}
    </a>
  </div>
);

export const Navbar = async () => {
  const session = await getServerSession(authOptions);
  let user = undefined;
  if (session !== null) {
    user = await getUser({ email: session.user?.email });
    if (!user || user === undefined || user === null)
      redirect("/api/auth/signin?callbackUrl=/");
  }
  return (
    <nav className="mx-auto bg-base-100 px-4 dark:bg-slate-800 dark:text-white md:px-8">
      <div className="flex items-center justify-between">
        <Logo />
        <div className="flex items-center">
          {user && user.admin ? (
            <a href={`/view-queries/${user?.id}`} className="btn btn-ghost">
              Respond to queries
            </a>
          ) : (
            <></>
          )}
          <a href={`/view-cases/${user?.id}`} className="btn btn-ghost">
            View Cases
          </a>
          <div className="flex items-center">
            <Profile />
          </div>
        </div>
      </div>
    </nav>
  );
};
