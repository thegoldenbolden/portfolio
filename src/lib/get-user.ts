import { authOptions } from "@auth";
import { getServerSession } from "next-auth";
import { cache } from "react";

export default cache(async function getUser() {
 return await getServerSession(authOptions);
});
