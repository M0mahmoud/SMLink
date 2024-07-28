import { getUser } from "@/action/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import avatar from "../../assests/avatar.svg";

const ProfilePage = async () => {
  const user = await getUser();

  return (
    <section className="flex min-h-screen flex-col items-center justify-center w-full mt-20">
      {user && user.message && (
        <p className="text-sm text-red-500">{user.message}</p>
      )}
      <Image
        src={avatar}
        width={120}
        height={120}
        loading="lazy"
        alt="User Image"
        priority={false}
      />
      <form className="w-full md:w-1/2">
        <div className="flex flex-col gap-2">
          <div className="mt-4">
            <Label htmlFor="password">Name</Label>
            <Input
              id="name"
              type="name"
              name="name"
              readOnly
              value={user?.name}
              className="p-2 text-main-1 focus-visible:ring-0 focus-visible:ring-offset-0  focus:border-main-3"
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              readOnly
              value={user?.email}
              type="email"
              className="p-2 text-main-1 focus-visible:ring-0 focus-visible:ring-offset-0  focus:border-main-3"
            />
          </div>
          <ProfileButton />
        </div>
      </form>
    </section>
  );
};

export function ProfileButton() {
  return (
    <Button
      aria-disabled={true}
      disabled={true}
      type="submit"
      className="mt-4 w-full text-white py-2 px-4"
    >
      Update Your Info
    </Button>
  );
}
export default ProfilePage;
