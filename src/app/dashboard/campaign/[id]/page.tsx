"use client"
import apiClient from "@/api/apiClient";
import { Credits } from "@/components/home/credits";
import { FormConfigEmail } from "@/components/home/form-config-email";
import { IEmail } from "@/components/home/list-emails";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardEmailEditForm() {

    const params = useParams()// Obtén el id del email de la URL
    const [emailData, setEmailData] = useState<IEmail | null>(null);

    const id = params?.id as string;

    useEffect(() => {
        if (id) {
            // Llama al endpoint para obtener los datos del email
            apiClient.get(`/email/${ id }`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${ localStorage.getItem("x-token") }`,
                },
            })
                .then((res) => res.data)
                .then((data) => setEmailData(data))
                .catch((error) => console.error("Error fetching email:", error));
        }
    }, [id]);

    return (
        <div className="flex flex-col pt-5 pb-10 w-full">
            <div className="w-full flex items-center justify-between">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold">Editar Email</h1>
                    <p className="text-sm text-muted-foreground">
                        Aquí puedes editar un email a tu campaña.
                    </p>
                </div>
                <div className="flex gap-2 items-center">
                    <Credits />

                    <Link
                        href="/dashboard/campaign"
                        className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Volver
                    </Link>
                </div>
            </div>
            {emailData ? (
                <FormConfigEmail initialData={emailData} />
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    )
}