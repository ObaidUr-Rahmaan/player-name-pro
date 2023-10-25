import React from "react";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <div>
      <div className="flex justify-around p-6">
        <h1 className="text-4xl">Dashboard</h1>
        <UserButton afterSignOutUrl="/" />
      </div>

      {/* Show Names generated and a Click me button*/}
      <div className="flex flex-col items-center space-y-40">
        <div className="mt-32">Generated Names</div>
        <Button className="rounded-2xl bg-orange-700 text-white hover:bg-orange-900">
          Generate Unique Player Name
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
