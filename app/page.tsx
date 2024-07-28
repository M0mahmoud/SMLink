import ShortLinkForm from "@/components/ShortLinkForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center w-full mt-20">
      <div className="text-center my-6 w-full">
        <h1 className="hsp text-4xl leading-snug sm:text-5xl font-extrabold text-balance">
          Shorten Your Loooong Links
        </h1>
        <p className="text-alt-1 font-light text-gray-500">
          Linkly is an efficient and easy-to-use URL shortening service that
          streamlines your online experience.
        </p>
      </div>
      <ShortLinkForm />
    </main>
  );
}
