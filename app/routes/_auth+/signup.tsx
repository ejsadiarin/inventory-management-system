import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";

export async function loader({ request }: LoaderFunctionArgs) {}

export async function action({ request }: ActionFunctionArgs) {
  // do logic for generating user
  // do logic for generating item (if have auth setup: ...do based on user id)
}

export default function SignUpPage() {
  return (
    <div>
      <h1> Sign Up Page </h1>
      <Form method="post">
        <button type="submit" value="Submit" className="bg-blue-700 text-black">
          Sign Up
        </button>
      </Form>
    </div>
  );
}
