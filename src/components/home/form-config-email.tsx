"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy, Download, Loader2, Pause, Pencil, Play, Plus, Trash, Wand2 } from "lucide-react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { IEmail } from "./list-emails";
import useAuthStore from "@/features/home/store/auth";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import apiClient from "@/api/apiClient";

type FormData = {
    campaignName: string;
    subject: string;
    templateType: string;
    content: string;
    emailPrompt: string;
    imagePrompt: string;
};

type FormConfigEmailProps = {
    initialData?: IEmail;
};

export const FormConfigEmail = ({ initialData }: FormConfigEmailProps) => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { isSubmitting },
    } = useForm<FormData>({
        defaultValues: {
            campaignName: "",
            subject: "¡Bienvenido a nuestra newsletter!",
            // templateType: "",
            content: "",
            emailPrompt: "",
            imagePrompt: "",
        },
    });

    const queryClient = useQueryClient();
    const router = useRouter();
    const { user } = useAuthStore();

    const [content, setContent] = useState(""); // Local state for dynamic editing
    const [emailPreview, setEmailPreview] = useState("");
    const [imagePreview, setImagePreview] = useState(""); // Imagen generada
    const [isGeneratingImage, setIsGeneratingImage] = useState(false);
    const [isGeneratingContent, setIsGeneratingContent] = useState(false);
    const [idtemplate, setIdTemplate] = useState("");
    const [isReading, setIsReading] = useState(false);

    const { updateAmount } = useAuthStore();

    // Función para generar contenido (email)
    const handleGenerateContent = async () => {
        // const prompt = `Create an email with the subject "${ watch("subject") }" and focus on ${ watch("templateType") }`;

        setIsGeneratingContent(true);
        // setIsGeneratingImage(true);

        try {
            // Llamada a la API para generar el contenido
            const response = await apiClient.post("/email/generate-email",
                {
                    // templateType: watch("subject"),
                    // prompt: watch("content")
                    prompt: watch("emailPrompt")
                }
                ,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${ localStorage.getItem("x-token") }`
                    },
                });

            const data = await response.data;
            if (data.content) {
                setValue("content", data.content);
                setValue("subject", data.title)
                setEmailPreview(data.content);
                setContent(data.content);
                setIsGeneratingContent(false);

                updateAmount(data.credits);
                toast.success("Contenido generado exitosamente");
            }
            // if (data.imageUrl) {
            //     setImagePreview(data.imageUrl);
            //     // setIsGeneratingImage(false);
            // }
        } catch (error) {
            console.error("Error generating content or image:", error);
            setIsGeneratingContent(false);
            // setIsGeneratingImage(false);
        }
    };

    // Función para generar imagen
    const handleGenerateImage = async () => {
        setIsGeneratingImage(true);

        try {
            const response = await apiClient.post("/email/generate-image",
                {
                    // prompt: watch("subject")
                    prompt: watch("imagePrompt")
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${ localStorage.getItem("x-token") }`
                    }
                });

            const data = await response.data;
            if (data.imageUrl) {
                setImagePreview(data.imageUrl);
                updateAmount(data.credits);
                toast.success("Imagen generada exitosamente");
            }
            setIsGeneratingImage(false);
        } catch (error) {
            console.error("Error generating image:", error);
            setIsGeneratingImage(false);
        }
    };

    const handleCopy = () => {
        const template = `Asunto: ${ watch("subject") }\n\n${ emailPreview }`;
        navigator.clipboard.writeText(template);
        alert("Plantilla copiada al portapapeles");
    };

    const handleCopyTemplate = () => {
        const emailHTML = `
            <div>
                <h2>${ watch("subject") }</h2>
                <p>${ emailPreview }</p>
                <img src="${ imagePreview }" alt="Generated Image" />
            </div>
        `;

        const blob = new Blob([emailHTML], { type: "text/html" });
        const data = [new ClipboardItem({ "text/html": blob })];

        navigator.clipboard
            .write(data)
            .then(() => alert("Template copiado al portapapeles"))
            .catch((err) => console.error("Error copiando el template:", err));
    };

    const onSubmit = async (data: FormData) => {

        if ((user?.amount || 100) < 1) {
            toast.error("No tienes suficientes créditos para guardar la plantilla");
        }

        try {
            if (initialData) {
                await handleEditTemplate(data);
            } else {
                await handleSaveTemplate(data);
            }

        } catch (error) {
            console.error("Error saving template:", error);
        }
    };

    const handleSaveTemplate = async (data: FormData) => {
        console.log({ data });
        try {
            await apiClient.post("/email",
                {
                    title: data.subject.slice(0, 30),
                    subject: data.subject,
                    content: data.content,
                    url: imagePreview, // URL de la imagen generada
                    status: "pending",
                    emailPrompt: data.emailPrompt,
                    imagePrompt: data.imagePrompt,
                }
                , {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${ localStorage.getItem("x-token") }`
                    },
                });


            // Actualiza la lista de emails
            queryClient.invalidateQueries();
            router.push("/dashboard/campaign");

            // alert("Plantilla guardada exitosamente");
            toast.success("Plantilla guardada exitosamente");

        } catch (error) {
            console.error("Error saving template:", error);
            toast.error("Error guardando la plantilla");
        }
    }

    const handleEditTemplate = async (data: FormData) => {
        try {
            const response = await apiClient.patch(`/email/${ idtemplate }`, {
                title: data.campaignName,
                subject: data.subject,
                content: data.content,
                url: imagePreview, // URL de la imagen generada
                status: "pending",
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${ localStorage.getItem("x-token") }`
                },
            });

            if (response.data.ok) {
                // alert("Email actualizado exitosamente");
                toast.success("Email actualizado exitosamente");
            }


            // Actualiza la lista de emails
            queryClient.invalidateQueries();
            router.push("/dashboard/campaign");

            // alert("Plantilla guardada exitosamente");
            toast.success("Plantilla guardada exitosamente");

        } catch (error) {
            console.error("Error editing template:", error);
            toast.error("Error guardando la plantilla");
        }
    }

    const handleDeleteTemplate = async () => {
        try {
            const response = await apiClient.delete(`/email/${ idtemplate }`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${ localStorage.getItem("x-token") }`
                },
            });
        } catch (error) {
            console.error("Error deleting template:", error);
        }
    }

    // button reader
    const handleReadText = () => {
        if (!emailPreview) {
            alert("Por favor, introduce un texto para leer.");
            return;
        }

        // Detiene cualquier lectura en curso
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(emailPreview);
        utterance.lang = "es-ES"; // Configura el idioma (español)
        // voice
        const voices = window.speechSynthesis.getVoices();
        // console.log({ voices });
        utterance.voice = voices[246]; // Selecciona la primera voz
        utterance.rate = 1; // Velocidad de la lectura (1 es normal)
        utterance.pitch = 1; // Tonalidad de la voz (1 es normal)
        utterance.volume = 1; // Volumen (0 a 1)

        utterance.onstart = () => setIsReading(true);
        utterance.onend = () => setIsReading(false);
        utterance.onerror = (error) => {
            console.error("Error en la síntesis de voz:", error);
            setIsReading(false);
        };

        window.speechSynthesis.speak(utterance);
    };

    const handleStopReading = () => {
        window.speechSynthesis.cancel();
        setIsReading(false);
    };

    useEffect(() => {
        if (initialData) {
            // Establece los valores iniciales en el formulario
            setValue("campaignName", initialData.title);
            setValue("subject", initialData.subject);
            // setValue("templateType", initialData.templateType);
            setValue("content", initialData.content);
            setContent(initialData.content);
            setEmailPreview(initialData.content);
            setImagePreview(initialData.url);
            setIdTemplate(initialData.id.toString());
        }
    }, [initialData, setValue]);

    return (
        <div className="flex flex-col lg:flex-row gap-6 min-h-[80vh]">
            {/* Form Section */}
            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Configuración del Email</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* <div className="space-y-2">
                            <Label htmlFor="campaignName">Nombre de la Campaña</Label>
                            <Input
                                id="campaignName"
                                placeholder="Ej: Newsletter Semanal"
                                {...register("campaignName", { required: true })}
                            />
                        </div> */}
                        <div className="space-y-2">
                            <Label htmlFor="emailPrompt">Nombre de la Campaña</Label>
                            <Textarea
                                id="emailPrompt"
                                placeholder="Escribe el contenido de tu email aquí"
                                {...register("emailPrompt", { required: true })}
                                style={{ minHeight: '100px' }}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="imagePrompt">Nombre de la Campaña</Label>
                            <Textarea
                                id="imagePrompt"
                                placeholder="Imagina la imagen que necesitas"
                                {...register("imagePrompt", { required: true })}
                                style={{ minHeight: '100px' }}
                            />
                        </div>


                        <div className="flex justify-end md:flex-nowrap flex-wrap">

                            <Button
                                type="button"
                                variant="outline"
                                size="default"
                                onClick={handleGenerateContent}
                                disabled={isSubmitting || !watch("emailPrompt") || isGeneratingContent}
                                className="disabled:opacity-75 disabled:cursor-not-allowed"
                            >
                                {isSubmitting || isGeneratingContent ? (
                                    <Loader2 className=" animate-spin" />
                                ) : (
                                    <Wand2 className="" />
                                )}
                                <span
                                    className="ml-2"
                                >
                                    Generar contenido
                                </span>
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                size="default"
                                onClick={handleGenerateImage}
                                disabled={isSubmitting || !watch("imagePrompt") || isGeneratingImage}
                                className="disabled:opacity-75 disabled:cursor-not-allowed"
                            >
                                {isSubmitting || isGeneratingImage ? (
                                    <Loader2 className="animate-spin" />
                                ) : (
                                    <Download className="" />
                                )}
                                <span className="ml-2">
                                    Generar imagen
                                </span>
                            </Button>
                        </div>


                        <div className="space-y-2 h-1 rounded-full w-full bg-gray-500 bg-opacity-70"></div>
                        <div className="space-y-2">
                            <Label htmlFor="subject">Asunto del Email</Label>
                            <Input
                                id="subject"
                                placeholder="Ej: ¡Bienvenido a nuestra newsletter!"
                                {...register("subject", { required: true })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="content">Contenido del Email</Label>
                            <Textarea
                                id="content"
                                placeholder="Escribe el contenido de tu email aquí o genera con AI"
                                {...register("content", { required: true })}
                                value={content}
                                onChange={(e) => {
                                    setContent(e.target.value)
                                    setValue("content", e.target.value); // Update the form's internal value
                                }} // Allow manual editing
                                style={{ minHeight: '200px' }}
                            />

                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="subject">
                                URL de la imagen
                            </Label>
                            <Input
                                id="subject"
                                placeholder="Ej: https://example.com/image.png"
                                value={imagePreview}
                                onChange={(e) => setImagePreview(e.target.value)}
                            />
                        </div>

                        <div className="flex justify-end">
                            {
                                initialData ? (
                                    <div className="flex gap-4">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="bg-red-500 text-white"
                                            onClick={handleDeleteTemplate}>
                                            <Trash className="h-4 w-4 mr-2" />
                                            Eliminar Email
                                        </Button>
                                        <Button type="submit" variant="outline">
                                            <Pencil className="h-4 w-4 mr-2" />
                                            Actualizar Email
                                        </Button>
                                    </div>
                                )
                                    :
                                    <Button type="submit" disabled={isSubmitting}>
                                        Guardar Configuración
                                    </Button>
                            }
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Preview Section */}
            <Card className="w-full lg:max-w-2xl mx-auto bg-gray-100 shadow relative">
                <CardHeader>
                    <CardTitle>Vista Previa del Email</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold">{watch("subject")}</h2>
                        <div className="border-t pt-4">
                            <p className="text-gray-700 whitespace-pre-line">
                                {
                                    isGeneratingContent ? (
                                        "Generando contenido..."
                                    ) : (
                                        watch("content")
                                        || "Escribe contenido para previsualizar el email."
                                    )
                                }
                            </p>
                            {(imagePreview !== "") ? (
                                <img src={imagePreview} alt="Generated Preview" className="w-full mt-4" />
                            )
                                :
                                <>
                                    {
                                        isGeneratingImage ? (
                                            <div className="flex justify-center items-center h-48">
                                                <Loader2 className="h-8 w-8 animate-spin" />
                                            </div>
                                        ) : (
                                            <p className="text-gray-700 mt-4">Genera una vista previa para visualizar la imagen</p>
                                        )
                                    }
                                </>
                            }
                        </div>
                        {/* <a href={imagePreview} 
                            download="email-preview.png" 
                            className="flex items-center space-x-2"
                        >
                            <Button>
                                <Download className="h-4 w-4 mr-2" />
                                Descargar Imagen
                            </Button>
                        </a> */}
                        <Button
                            variant="outline"
                            className="w-full mt-2"
                            onClick={handleCopy}
                        >
                            <Copy className="h-4 w-4 mr-2" />
                            Copiar Plantilla
                        </Button>
                        <Button onClick={handleCopyTemplate}>
                            <Copy className="h-4 w-4 mr-2" />
                            Copiar Template como HTML
                        </Button>
                    </div>
                </CardContent>
                {
                    content && (
                        <div className="flex flex-col gap-4 absolute top-4 right-4">
                            <button
                                onClick={handleReadText}
                                disabled={isReading}
                                className="px-4 py-2 flex justify-center bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
                            >
                                {/* {isReading ? "Leyendo..." : "Leer Email"} */}
                                {isReading ?
                                    <Loader2 className="animate-spin" />
                                    :
                                    <Play
                                        className="h-4 w-4" />
                                }
                            </button>
                            <button
                                onClick={handleStopReading}
                                disabled={!isReading}
                                className="px-4 py-2 flex justify-center bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-gray-400"
                            >
                                {/* Detener Lectura */}
                                <Pause className="h-4 w-4" />
                            </button>
                        </div>
                    )
                }
            </Card>
        </div>
    );
};