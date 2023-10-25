import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <div>Player Name Pro - Minimalistic Player Name Generator</div>
      <Button className="rounded-2xl bg-violet-500 hover:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300 active:bg-violet-700">
        <SignInButton />
      </Button>
      <Button>
        <SignUpButton />
      </Button>
    </div>
  );
}
