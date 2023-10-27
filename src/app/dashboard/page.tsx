"use client";

import React from "react";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useLogger } from "next-axiom";
import { useCompletion } from "ai/react";

const Dashboard = () => {
  const logger = useLogger();

  const [generatedName, setGeneratedName] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const { complete, completion } = useCompletion({
    api: "/api/completion",
  });

  const handleClick = async () => {
    setIsLoading(true);
    logger.info("Generating new name...");
    try {
      await generateUniqueName();
      logger.info("Name generated successfully.");
    } catch (error) {
      logger.error("Error generating name:", { error: error });
    }
    setIsLoading(false);
  };

  const generateUniqueName = async () => {
    const startTime = Date.now();
    const maxDuration = 5000; // 5 seconds in milliseconds
    const previousName = sessionStorage.getItem("generatedName");

    let isUnique = false;
    let newName = "";

    while (Date.now() - startTime < maxDuration && !isUnique) {
      await complete(
        "Generate a distinctive, memorable two-word player name that hasn't been commonly used. Ensure both words have strong, positive connotations and blend well when concatenated together.",
      );

      if (completion !== previousName) {
        newName = completion;
        isUnique = true;
      }
    }

    if (isUnique) {
      setGeneratedName(newName);
      sessionStorage.setItem("generatedName", newName);
    } else {
      logger.warn("Failed to generate a unique name within the time limit.");
    }
  };

  React.useEffect(() => {
    if (completion) {
      setGeneratedName(completion);
    }
  }, [completion]);

  return (
    <div className="flex h-screen flex-col">
      <div className="flex justify-around p-6">
        <h1 className="text-4xl">Dashboard</h1>
        <UserButton afterSignOutUrl="/" />
      </div>

      <div className="flex flex-grow flex-col items-center justify-center space-y-40">
        {isLoading ? (
          <div className="text-4xl">🔄 Loading...</div>
        ) : (
          generatedName && <div className="text-4xl">{generatedName}</div>
        )}
      </div>

      <div className="mb-36 flex justify-center">
        <Button
          className={`rounded-2xl p-2 px-4 text-white hover:bg-orange-900 ${
            isLoading ? "cursor-not-allowed bg-orange-500" : "bg-orange-700"
          }`}
          onClick={handleClick}
          disabled={isLoading}
        >
          {isLoading
            ? "Generating Cool User Name..."
            : "Generate Unique Player Name"}
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
