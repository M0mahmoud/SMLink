"use client";
import { shortLinkFormAction } from "@/action/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormState, useFormStatus } from "react-dom";

const ShortLinkForm = () => {
  const [state, action] = useFormState(shortLinkFormAction, undefined);

  return (
    <div className="relative w-full md:min-w-[500px]">
      <form className="w-full space-y-4 text-center" action={action}>
        <Input
          name="original"
          placeholder="Enter the link here"
          className="py-5 px-3 border font-light w-full"
        />
        {state?.errors?.url && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}
        {state?.message && (
          <p className="text-sm text-green-500">{state.message}</p>
        )}

        <FormButton />
      </form>
    </div>
  );
};
export function FormButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      aria-disabled={pending}
      type="submit"
      className="text-white text-lg font-light"
    >
      {pending ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Processing...
        </>
      ) : (
        "Shorten URL"
      )}
    </Button>
  );
}
export default ShortLinkForm;
