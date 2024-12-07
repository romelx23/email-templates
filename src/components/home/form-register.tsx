import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail } from 'lucide-react'
import { ButtonRegisterLogin } from "./button-login"

export const FormRegister = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <div className="flex items-center justify-center">
                        <Mail className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-center">Crear una cuenta</CardTitle>
                    <CardDescription className="text-center">
                        Regístrate para comenzar a usar EmailThemes
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <ButtonRegisterLogin />
                </CardContent>
                <CardFooter className="flex flex-col items-center">
                    <p className="mt-2 text-xs text-center text-gray-700">
                        Al registrarte, aceptas nuestros{" "}
                        <a href="#" className="underline hover:text-primary">
                            Términos de servicio
                        </a>{" "}
                        y{" "}
                        <a href="#" className="underline hover:text-primary">
                            Política de privacidad
                        </a>
                        .
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}

