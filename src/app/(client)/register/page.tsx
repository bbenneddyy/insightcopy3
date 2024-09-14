import RegistrationForm from "@/components/Forms/RegistrationForm";
import { webStatus } from "@/utils/config";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

export default function Register() {
  noStore();
  if (webStatus === "open") {
    return ( <RegistrationForm /> );
  } else {
    redirect('/');
  }
}
