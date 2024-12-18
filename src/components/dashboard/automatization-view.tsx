"use client"
import { ChevronRight, ClockIcon, FileSpreadsheet, FileText, Send, Users } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "../ui/calendar"
import { format } from "date-fns"
import { useEffect, useState } from 'react'
import { IEmail } from '../home/list-emails'
import { useQuery } from '@tanstack/react-query'
import { getEmails } from '@/features/home/helpers/email'
import { toast } from 'sonner';
import Papa from "papaparse";
import * as XLSX from "xlsx";
import apiClient from '@/api/apiClient'
import { useRouter } from 'next/navigation'
import { IAutomation, IAutomationUpdate } from './list-automation'

const fileTypes = [
    { id: "csv", name: "CSV", icon: FileText },
    { id: "excel", name: "Excel", icon: FileSpreadsheet },
]

interface IAutomationViewProps {
    automationData?: IAutomationUpdate | null
}

export default function AutomationView({ automationData }: IAutomationViewProps) {
    const [step, setStep] = useState(1)
    const [selectedTemplate, setSelectedTemplate] = useState("")
    const [fileType, setFileType] = useState("")
    const [file, setFile] = useState<File | null>(null)
    const [time, setTime] = useState("")
    const [userList, setUserList] = useState("")
    const [schedule, setSchedule] = useState<Date | undefined>(new Date())
    const [recipients, setRecipients] = useState<{ name: string; email: string }[]>([]);

    const [templates, setTemplates] = useState<IEmail[]>([])

    const router = useRouter()

    // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files) {
    //         setFile(e.target.files[0])
    //     }
    // }

    const handleNext = () => {
        setStep(step + 1)
    }

    const handleBack = () => {
        setStep(step - 1)
    }


    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const fileType = file.name.split(".").pop()?.toLowerCase();

        if (fileType === "csv") {
            // Usar PapaParse para procesar CSV
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    const data = results.data as { name: string; email: string }[];
                    const filteredRecipients = data.filter((row) => row.name && row.email);
                    console.log("Destinatarios CSV:", filteredRecipients);
                    setRecipients(filteredRecipients);
                    toast.success(`${ filteredRecipients.length } destinatarios cargados.`);
                },
            });
        } else if (fileType === "xlsx") {
            // Usar SheetJS para procesar XLSX
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target?.result;
                if (!data) {
                    toast.error("Error al leer el archivo.");
                    return;
                }
                const workbook = XLSX.read(data, { type: "binary" });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json<{ name: string; email: string }>(sheet);
                const filteredRecipients = jsonData.filter((row) => row.name && row.email);
                console.log("Destinatarios XLSX:", filteredRecipients);
                setRecipients(filteredRecipients);
                toast.success(`${ filteredRecipients.length } destinatarios cargados.`);
            };
            reader.readAsBinaryString(file);
        } else {
            toast.error("Formato de archivo no soportado.");
        }
    };


    const handleSubmit = (e: React.FormEvent) => {
        try {
            e.preventDefault()
            console.log("Submitting automation:", { selectedTemplate, recipients, schedule, time })

            const formData = new FormData();
            formData.append("templateId", selectedTemplate);
            // formData.append("recipients", JSON.stringify(recipients));
            formData.append("recipients", JSON.stringify(recipients));
            formData.append("scheduleDate", format((`${ schedule }`), "yyyy-MM-dd"));
            formData.append("scheduleTime", time);

            apiClient.post("/automation", formData);

            // Mock API Call
            // alert("Emails en cola para enviarse con estos datos.");
            toast.success(`Emails en cola para enviarse con estos datos.
        Template: ${ selectedTemplate }
        Usuarios: ${ recipients.length }
        Schedule: ${ format((`${ schedule }`), "yyyy-MM-dd") }
        time: ${ time }
        `);

            router.push("/dashboard");
        } catch (error) {
            console.error("Error al enviar los datos", error);
            toast.error("Error al enviar los datos");
        }
    }

    const { data: emails, isLoading } = useQuery<IEmail[]>({
        queryKey: ["emails"],
        queryFn: getEmails,
        staleTime: 1000 * 60 * 5, // Cache por 5 minutos
    });

    useEffect(() => {
        if (automationData) {
            // Establece los valores iniciales en el formulario
            setSelectedTemplate(automationData.templateId.toString());
            setRecipients(automationData.recipients);
            setSchedule(new Date(automationData.scheduleDate));
            setTime(automationData.scheduleTime);
            setStep(3);
        }
    }, [automationData]);

    return (
        <Card className="w-full max-w-5xl mx-auto h-full">
            <CardHeader>
                <CardTitle>Create Automation</CardTitle>
                <CardDescription>Set up your automated message flow in three easy steps.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {step === 1 && (
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold">Step 1: Select Template</h2>
                            {
                                isLoading ? (
                                    <p>Loading...</p>
                                ) : (
                                    <div className="flex flex-col overflow-y-auto max-h-96">
                                        <RadioGroup value={selectedTemplate} onValueChange={setSelectedTemplate}>
                                            {emails?.map((template) => (
                                                <div key={template.id} className="flex items-center space-x-2">
                                                    <RadioGroupItem value={template.id.toString()}
                                                        id={template.id.toString()} />
                                                    <Label htmlFor={template.id.toString()}>
                                                        <img src={template.url} alt={template.title} className="h-8 w-8 " />
                                                        {template.title}
                                                    </Label>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    </div>
                                )
                            }

                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold">Step 2: Configure Data Source</h2>
                            <div className="space-y-2">
                                <Label htmlFor="file-type">Select File Type</Label>
                                <Select value={fileType} onValueChange={setFileType}>
                                    <SelectTrigger id="file-type">
                                        <SelectValue placeholder="Select file type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {fileTypes.map((type) => (
                                            <SelectItem key={type.id} value={type.id}>
                                                <div className="flex items-center">
                                                    <type.icon className="mr-2 h-4 w-4" />
                                                    {type.name}
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="file-upload">Upload File</Label>
                                <Input id="file-upload" type="file" onChange={handleFileUpload} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="user-list">Or paste a list of users</Label>
                                <Input id="user-list" type="text" value={userList} onChange={(e) => setUserList(e.target.value)} />
                            </div>
                            {recipients.length > 0 && (
                                <div className="space-y-2">
                                    <Label>Recipients</Label>
                                    <ul className="space-y-2">
                                        {recipients.map((recipient, i) => (
                                            <li key={i}>
                                                <span>{recipient.name}</span>
                                                <span>{recipient.email}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <span className="text-sm text-muted-foreground">hay{" "}
                                {recipients.length} destinatarios cargados.
                            </span>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-4 max-w-md">
                            <h2 className="text-xl font-bold mb-4">Paso 3: Definir Hora y Fecha</h2>
                            <Label htmlFor="schedule">Fecha y Hora</Label>
                            <Calendar
                                mode='single'
                                selected={schedule}
                                onSelect={setSchedule}
                                className="mb-4"

                            />
                            <div className="flex items-center space-x-2">
                                <ClockIcon className="w-5 h-5" />
                                <div className="grid w-full items-center gap-1.5">
                                    <Label htmlFor="time">Time</Label>
                                    <Input type="time" id="time" aria-label="Choose time" className="w-full"
                                        value={time} onChange={(e) => setTime(e.target.value)}
                                        placeholder='HH:MM AM/PM'
                                    />
                                </div>
                            </div>
                            {schedule && time &&
                                <p>Programado para: {
                                    format(schedule, "dd/MM/yyyy")
                                }
                                    {" "}a las {time}
                                </p>
                            }
                        </div>
                    )}
                </div>
            </CardContent>
            <Separator className="my-4" />
            <CardFooter className="flex justify-between">
                {step > 1 && (
                    <Button variant="outline" onClick={handleBack}>
                        Back
                    </Button>
                )}
                {step < 3 ? (
                    <Button onClick={handleNext} className="ml-auto">
                        Next <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                ) : (
                    <Button onClick={handleSubmit} className="ml-auto">
                        Create Automation <Send className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}

