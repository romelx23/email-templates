// "use client";

// import { useForm } from "react-hook-form";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select";
// import { Switch } from "@/components/ui/switch";
// import { Copy, Loader2, Wand2 } from "lucide-react";
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// type FormData = {
//     campaignName: string;
//     subject: string;
//     templateType: string;
//     content: string;
//     personalization: boolean;
// };

// export const FormConfigEmail = () => {
//     const {
//         register,
//         handleSubmit,
//         watch,
//         setValue,
//         formState: { isSubmitting },
//     } = useForm<FormData>({
//         defaultValues: {
//             campaignName: "",
//             subject: "¡Bienvenido a nuestra newsletter!",
//             templateType: "",
//             content: "",
//             personalization: false,
//         },
//     });

//     const [emailPreview, setEmailPreview] = useState("");
//     const [imagePreview, setImagePreview] = useState(""); // Estado para manejar la imagen generada
//     const [isGeneratingImage, setIsGeneratingImage] = useState(false); // Estado del loader para imágenes

//     const handleGenerateContent = async () => {
//         const prompt = `Create an email with the subject "${ watch("subject") }" and focus on ${ watch(
//             "templateType"
//         ) }`;
//         try {
//             const response = await fetch("/api/generate-email", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ prompt }),
//             });
//             const data = await response.json();
//             if (data.content) {
//                 setValue("content", data.content);
//                 setEmailPreview(data.content);
//             }
//             if (data.imageUrl) {
//                 setImagePreview(data.imageUrl);
//             }
//         } catch (error) {
//             console.error("Error generating content or image:", error);
//         }
//     };

//     const handleGenerateImage = async () => {
//         setIsGeneratingImage(true);
//         const prompt = `Generate an image related to the subject "${ watch("subject") }" and theme ${ watch(
//             "templateType"
//         ) }`;
//         try {
//             const imageUrl = `https://image.pollinations.ai/prompt/${ encodeURIComponent(prompt) }`;
//             setImagePreview(imageUrl); // Actualizar la URL de la imagen generada
//         } catch (error) {
//             console.error("Error generating image:", error);
//         } finally {
//             setIsGeneratingImage(false);
//         }
//     };

//     const onSubmit = (data: FormData) => {
//         console.log("Form submitted:", data);
//     };

//     const handleCopy = () => {
//         const template = `Asunto: ${ watch("subject") }\n\n${ emailPreview }`;
//         navigator.clipboard.writeText(template);
//         alert("Plantilla copiada al portapapeles");
//     };

//     return (
//         <div className="flex flex-col lg:flex-row gap-6">
//             {/* Form Section */}
//             <Card className="w-full max-w-2xl mx-auto">
//                 <CardHeader>
//                     <CardTitle>Configurar Email de Suscripción</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                         <div className="space-y-2">
//                             <Label htmlFor="campaignName">Nombre de la Campaña</Label>
//                             <Input
//                                 id="campaignName"
//                                 placeholder="Ej: Newsletter Semanal"
//                                 {...register("campaignName", { required: true })}
//                             />
//                         </div>
//                         <div className="space-y-2">
//                             <Label htmlFor="subject">Asunto del Email</Label>
//                             <Input
//                                 id="subject"
//                                 placeholder="Ej: ¡Bienvenido a nuestra newsletter!"
//                                 {...register("subject", { required: true })}
//                             />
//                         </div>
//                         <div className="space-y-2">
//                             <Label htmlFor="templateType">Plantilla de Email</Label>
//                             <Select
//                                 onValueChange={(value) => setValue("templateType", value)}
//                                 {...register("templateType", { required: true })}
//                             >
//                                 <SelectTrigger id="templateType">
//                                     <SelectValue placeholder="Selecciona una plantilla" />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     <SelectItem value="welcome">Bienvenida</SelectItem>
//                                     <SelectItem value="promo">Promoción</SelectItem>
//                                     <SelectItem value="newsletter">Newsletter</SelectItem>
//                                 </SelectContent>
//                             </Select>
//                         </div>
//                         <div className="space-y-2">
//                             <Label htmlFor="content">Contenido del Email</Label>
//                             <div className="flex space-x-2">
//                                 <Textarea
//                                     id="content"
//                                     placeholder="Escribe el contenido de tu email aquí o genera con AI"
//                                     {...register("content", { required: true })}
//                                 />
//                                 <Button
//                                     type="button"
//                                     variant="outline"
//                                     size="icon"
//                                     onClick={handleGenerateContent}
//                                     disabled={isSubmitting}
//                                 >
//                                     {isSubmitting ? (
//                                         <Loader2 className="h-4 w-4 animate-spin" />
//                                     ) : (
//                                         <Wand2 className="h-4 w-4" />
//                                     )}
//                                 </Button>
//                             </div>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                             <Switch
//                                 {...register("personalization")}
//                                 onCheckedChange={(checked) => setValue("personalization", checked)}
//                             />
//                             <Label>Habilitar personalización</Label>
//                         </div>
//                         <div className="flex justify-end">
//                             <Button type="submit" disabled={isSubmitting}>
//                                 Guardar Configuración
//                             </Button>
//                         </div>
//                     </form>
//                 </CardContent>
//             </Card>

//             {/* Preview Section */}
//             <Card className="w-full lg:max-w-md mx-auto bg-gray-100 shadow">
//                 <CardHeader>
//                     <CardTitle>Vista Previa del Email</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     <div className="space-y-4">
//                         <h2 className="text-lg font-semibold">{watch("subject")}</h2>
//                         <div className="border-t pt-4">
//                             <p className="text-gray-700 whitespace-pre-line">
//                                 {emailPreview || "Escribe contenido para previsualizar el email."}
//                             </p>
//                         </div>
//                         {isGeneratingImage ? (
//                             <div className="flex justify-center items-center h-48">
//                                 <Loader2 className="h-8 w-8 animate-spin" />
//                             </div>
//                         ) : (
//                             imagePreview && <img src={imagePreview} alt="Generated Email" className="w-full" />
//                         )}
//                     </div>
//                 </CardContent>
//                 <Button
//                     variant="outline"
//                     className="w-full mt-2"
//                     onClick={handleCopy}
//                 >
//                     <Copy className="h-4 w-4 mr-2" />
//                     Copiar Plantilla
//                 </Button>
//             </Card>
//         </div>
//     );
// };

"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy, Loader2, Wand2 } from "lucide-react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

type FormData = {
    campaignName: string;
    subject: string;
    templateType: string;
    content: string;
};

export const FormConfigEmail = () => {
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
            templateType: "",
            content: "",
        },
    });

    const [emailPreview, setEmailPreview] = useState("");
    const [imagePreview, setImagePreview] = useState(""); // Imagen generada
    const [isGeneratingImage, setIsGeneratingImage] = useState(false);

    const handleGenerateContent = async () => {
        const prompt = `Create an email with the subject "${ watch("subject") }" and focus on ${ watch(
            "templateType"
        ) }`;
        try {
            const response = await fetch("/api/generate-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt }),
            });
            const data = await response.json();
            if (data.content) {
                setValue("content", data.content);
                setEmailPreview(data.content);
            }
            if (data.imageUrl) {
                setImagePreview(data.imageUrl);
            }
        } catch (error) {
            console.error("Error generating content or image:", error);
        }
    };

    const handleCopy = () => {
        const template = `Asunto: ${ watch("subject") }\n\n${ emailPreview }`;
        navigator.clipboard.writeText(template);
        alert("Plantilla copiada al portapapeles");
    };

    const onSubmit = async (data: FormData) => {
        try {
            await fetch("/api/email-templates", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: data.campaignName,
                    subject: data.subject,
                    body: data.content,
                    imageUrl: imagePreview, // URL de la imagen generada
                }),
            });
            alert("Plantilla guardada exitosamente");
        } catch (error) {
            console.error("Error saving template:", error);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6">
            {/* Form Section */}
            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Configurar Email de Suscripción</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="campaignName">Nombre de la Campaña</Label>
                            <Input
                                id="campaignName"
                                placeholder="Ej: Newsletter Semanal"
                                {...register("campaignName", { required: true })}
                            />
                        </div>
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
                            />
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={handleGenerateContent}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Wand2 className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit" disabled={isSubmitting}>
                                Guardar Configuración
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Preview Section */}
            <Card className="w-full lg:max-w-md mx-auto bg-gray-100 shadow">
                <CardHeader>
                    <CardTitle>Vista Previa del Email</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold">{watch("subject")}</h2>
                        <div className="border-t pt-4">
                            <p className="text-gray-700 whitespace-pre-line">
                                {emailPreview || "Escribe contenido para previsualizar el email."}
                            </p>
                            {imagePreview && (
                                <img src={imagePreview} alt="Generated Preview" className="w-full mt-4" />
                            )}
                        </div>
                        <Button
                            variant="outline"
                            className="w-full mt-2"
                            onClick={handleCopy}
                        >
                            <Copy className="h-4 w-4 mr-2" />
                            Copiar Plantilla
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};