import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import SigninButton from "./signin-button";
import { getUser } from "@/lib/provider";
import { redirect } from "next/navigation";
import Image from "next/image";
import SignoutButton from "./signout-button";
const UserDisplayPicture = ({
  src,
  name,
}: {
  src?: string | null;
  name: string;
}) => {
  if (src)
    return (
      <div className="w-10 rounded-full">
        <Image src={src} width={100} height={100} alt="Display Picture" />
      </div>
    );
  else
    return (
      <div className="w-10 rounded-full">
        <div className="avatar placeholder">
          <div className="bg-neutral-focus w-10 rounded-full text-neutral-content">
            <span className="text-l">{name[0]}</span>
          </div>
        </div>
      </div>
    );
};

export const Profile = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <SigninButton />;
  }

  let user = await getUser({ email: session.user?.email });
  let errorFetchingUser = false;
  if (user === null || user === undefined) {
    redirect("/api/auth/signin?callbackUrl=/");
  }

  let name = "";
  let src = "";
  if (session.user && session.user.name && session.user.image) {
    name = session.user.name;
    src = session.user.image;
  } else {
    name = (session as any).name;
    src = (session as any).image || (session as any).picture;
  }
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="avatar btn btn-circle btn-ghost">
        <UserDisplayPicture name={name} src={src} />
      </label>
      <ul
        tabIndex={0}
        className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
      >
        <li>
          <SignoutButton />
        </li>
      </ul>
    </div>
  );
};
