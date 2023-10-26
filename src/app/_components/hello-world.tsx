import { api } from "~/trpc/react";

export function HelloWorld() {
  const helloWorld = api.hello.hello.useQuery({
    text: "world",
  });

  return <div>{helloWorld.data?.greeting}</div>;
}
