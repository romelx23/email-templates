import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { HomeLayout } from "@/components/home/home-layout";

export default function SuccessPage() {
    return (
        <HomeLayout>
            <div className="flex min-h-[80vh] items-center justify-center px-4">
                <div className="max-w-md p-6 bg-white shadow-md rounded-md text-center">
                    <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
                    <h1 className="text-2xl font-bold text-gray-800">¡Gracias por tu compra!</h1>
                    <p className="text-gray-600 mt-2">
                        Tu pago ha sido procesado con éxito.
                    </p>
                    <p className="text-gray-600 mt-2">
                        En breve recibirás un correo electrónico con los detalles de tu compra.
                    </p>
                    <p className="text-gray-600 mt-2">
                        Si tienes alguna duda, no dudes en contactarnos.
                    </p>
                    <Link href="/pricing" className="mt-6 inline-block px-6 py-2 text-white bg-primary rounded-md hover:bg-primary-dark">
                        Volver al inicio
                    </Link>
                </div>
            </div>
        </HomeLayout>
    );
}