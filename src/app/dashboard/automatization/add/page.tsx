import AutomationView from "@/components/dashboard/automatization-view";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AutomationPage() {
    return (
        <div className="w-full mx-auto py-6">
            <div className="flex justify-between items-center mb-4">

                <h1 className="text-3xl font-bold mb-6">Create Automation</h1>
                <Link
                    href="/dashboard/automatization"
                    className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Volver
                </Link>
            </div>
            <AutomationView />
        </div>
    )
}

