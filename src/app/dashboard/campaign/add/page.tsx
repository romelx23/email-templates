import { Credits } from "@/components/home/credits";
import { FormConfigEmail } from "@/components/home/form-config-email";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";

export default function DashboardEmailConfigForm() {
    return (
        <div className="flex flex-col gap-3 pt-5 pb-10 w-full">
            <div className="w-full flex flex-wrap items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Agregar Email</h1>
                    <p className="text-sm text-muted-foreground">
                        Aquí puedes agregar un email a tu campaña.
                    </p>
                </div>
                <div className="flex flex-col gap-2 items-end">
                    <Link
                        href="/dashboard/campaign"
                        className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Volver
                    </Link>
                    <Credits />
                </div>
            </div>
            <FormConfigEmail />
        </div>
    )
}