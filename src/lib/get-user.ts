import { authOptions } from "./auth-options";
import { getServerSession } from "next-auth";
import { cache } from "react";

export default cache(async function getUser() {
 return await getServerSession(authOptions);
});
