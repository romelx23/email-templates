"use client"
import apiClient from "@/api/apiClient";
import AutomationView from "@/components/dashboard/automatization-view";
import { IAutomation, IAutomationUpdate } from "@/components/dashboard/list-automation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// export default async function AutomationPage({ params }: { params: { id: string } }) {
export default function AutomationPage() {

    const params = useParams()// Obtén el id del email de la URL
    const [automationData, setAutomationData] = useState<IAutomationUpdate | null>(null);

    const id = params?.id as string;

    console.log({ params });

    useEffect(() => {
        if (id) {
            // Llama al endpoint para obtener los datos del email
            apiClient.get<IAutomationUpdate>(`/automation/${ id }`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${ localStorage.getItem("x-token") }`,
                },
            })
                .then((res) => res.data)
                .then((data) => setAutomationData(data))
                .catch((error) => console.error("Error fetching email:", error));
        }
    }, [id]);

    return (
        <div className="w-full mx-auto py-6">
            <div className="flex justify-between items-center mb-4">

                <h1 className="text-3xl font-bold mb-6">Editar Automation</h1>
                <Link
                    href="/dashboard/automatization"
                    className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Volver
                </Link>
            </div>
            <AutomationView automationData={automationData} />
        </div>
    )
}

