import {
  json,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  type MetaFunction,
  redirect,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { dbHttp } from "../db.server";
import { items } from "../../drizzle/schema";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  redirect("/signup");
}

export async function loader({ request }: LoaderFunctionArgs) {
  const response = await dbHttp.select().from(items);
  return json({ items: response });
}

export default function Index() {
  const { items } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1> Items </h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>

      <Form method="post">
        <button type="submit" value="Submit">
          Generate User
        </button>
      </Form>

      <Form method="post">
        <button type="submit" value="Submit">
          Generate Item
        </button>
      </Form>
    </div>
  );
}
