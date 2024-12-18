import Link from "next/link";
import { XCircle } from "lucide-react";

export default function FailurePage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md p-6 bg-white shadow-md rounded-md text-center">
                <XCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
                <h1 className="text-2xl font-bold text-gray-800">¡Algo salió mal!</h1>
                <p className="text-gray-600 mt-2">
                    Tu pago no pudo ser procesado.
                </p>
                <p className="text-gray-600 mt-2">
                    Por favor, intenta nuevamente.
                </p>
                <p className="text-gray-600 mt-2">
                    Si tienes alguna duda, no dudes en contactarnos.
                </p>
                <Link href="/pricing" className="mt-6 inline-block px-6 py-2 text-white bg-primary rounded-md hover:bg-primary-dark">
                    Volver al inicio
                </Link>
            </div>
        </div>
    );
}