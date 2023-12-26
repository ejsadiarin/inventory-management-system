import {
  json,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { db } from "../drizzle/config.server";
import { items } from "../drizzle/schema.server";
import { Form, useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  db.insert(items).values({ title: "Item title" }).run();

  return {
    success: true,
  };
}

export async function loader({ request }: LoaderFunctionArgs) {
  // use drizzle to get the data
  const data = db.select().from(items).all();

  return json({ items: data });
}

export default function Index() {
  const { items } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1> Items </h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>

      <Form method="post">
        <button type="submit" value="Submit">
          Generate
        </button>
      </Form>
    </div>
  );
}
