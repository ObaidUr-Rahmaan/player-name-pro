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

  const { complete } = useCompletion({
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
      const result = await complete(
        "Provide a two-word player name that hasn't been commonly used. Both words should have strong, positive connotations and be capitalized.",
      );

      // Extract the name from the result
      const extractedName =
        typeof result === "string" ? extractName(result) : null;

      if (extractedName && extractedName !== previousName) {
        newName = extractedName;
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

  const extractName = (sentence: string): string | null => {
    const matches = sentence.match(/[A-Z][a-z]+[A-Z][a-z]+/);
    return matches ? matches[0] : null;
  };

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
