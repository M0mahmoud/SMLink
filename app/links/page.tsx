import { getLinksAction } from "@/action/link";
import { DataTable } from "@/components/links/DataTable";

const page = async () => {
  const links = await getLinksAction();

  return (
    <main className="flex min-h-screen flex-col items-center justify-start w-full mt-20">
      <div className="text-center my-6 w-full">
        <h1 className="hsp text-2xl leading-snug font-extrabold text-balance">
          Your Links
        </h1>
      </div>
      {links.length === 0 ? (
        <h1 className="text-2xl leading-snug font-extrabold text-balance">
          No Links
        </h1>
      ) : (
        <DataTable data={links} />
      )}
    </main>
  );
};

export default page;
