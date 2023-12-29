import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { dbHttp } from "app/db.server";

export async function loader({ request }: LoaderFunctionArgs) {
  // if (request.body) redirect("/");
}

export default function LoginPage() {
  return (
    <div>
      <h1> Login Page </h1>
      <Form method="post">
        <button type="submit" value="Submit" className="bg-">
          Login
        </button>
      </Form>
    </div>
  );
}
