import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import ProductForm from "../components/ProductForm";

export default async function products() {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  return (
    <div>
      <ProductForm />
    </div>
  );
}
