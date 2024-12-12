import { Credits } from "@/components/home/credits";
import { ListEmails } from "@/components/home/list-emails";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function DashboardEmailConfigForm() {

    return (
        <div className="w-full flex flex-col pt-5 pb-10">
            <div className="flex flex-wrap items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Email</h1>
                    <p className="text-sm text-muted-foreground">
                        Gestión de emails
                    </p>
                </div>

                <div className="flex flex-col gap-2 items-end">
                    <Link
                        href="/dashboard/campaign/add"
                        className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Crear campaña
                    </Link>
                    <Credits />
                </div>
            </div>
            {/* <div className="flex flex-col gap-2"> */}
            <ListEmails />
            {/* </div> */}
        </div>
    )
}