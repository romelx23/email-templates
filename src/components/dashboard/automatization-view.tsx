"use client"
import { ChevronRight, FileSpreadsheet, FileText, Send, Users } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "../ui/calendar"
import { format } from "date-fns"
import { useState } from 'react'
import { IEmail } from '../home/list-emails'
import { useQuery } from '@tanstack/react-query'
import { getEmails } from '@/features/home/helpers/email'

// const templates = [
//     { id: "welcome", name: "Welcome Message" },
//     { id: "newsletter", name: "Monthly Newsletter" },
//     { id: "promotion", name: "Promotional Offer" },
// ]

const fileTypes = [
    { id: "csv", name: "CSV", icon: FileText },
    { id: "excel", name: "Excel", icon: FileSpreadsheet },
]

export default function AutomationView() {
    const [step, setStep] = useState(1)
    const [selectedTemplate, setSelectedTemplate] = useState("")
    const [fileType, setFileType] = useState("")
    const [file, setFile] = useState<File | null>(null)
    const [userList, setUserList] = useState("")
    const [schedule, setSchedule] = useState<Date | undefined>(new Date())

    const [templates, setTemplates] = useState<IEmail[]>([])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0])
        }
    }

    const handleNext = () => {
        setStep(step + 1)
    }

    const handleBack = () => {
        setStep(step - 1)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Submitting automation:", { selectedTemplate, fileType, file, userList })
        const formData = new FormData();
        formData.append("template", selectedTemplate);
        formData.append("contactsFile", userList);
        formData.append("schedule", format((schedule || new Date()), "yyyy-MM-dd HH:mm"));

        // Mock API Call
        alert("Emails en cola para enviarse con estos datos.");
    }

    const { data: emails, isLoading } = useQuery<IEmail[]>({
        queryKey: ["emails"],
        queryFn: getEmails,
        staleTime: 1000 * 60 * 5, // Cache por 5 minutos
    });

    return (
        <Card className="w-full max-w-4xl mx-auto">
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
                                <Input id="file-upload" type="file" onChange={handleFileChange} />
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold mb-4">Paso 3: Definir Hora y Fecha</h2>
                            <Label htmlFor="schedule">Fecha y Hora</Label>
                            <Calendar
                                selected={schedule}
                                onSelect={setSchedule}
                                className="mb-4"
                            />
                            {schedule &&
                                <p>Programado para: {
                                    format(schedule, "dd/MM/yyyy HH:mm")
                                }</p>
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

