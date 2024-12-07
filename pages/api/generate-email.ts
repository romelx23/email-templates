// import { NextApiRequest, NextApiResponse } from "next";
// import { CohereClient } from "cohere-ai";

// // Inicializar Cohere con tu API Key
// const cohere = new CohereClient({
//   token: process.env.COHERE_API_KEY,
// });

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "POST") {
//     const { prompt, templateType } = req.body; // Incluimos el templateType, que es el tipo de email que generará el AI

//     if (!prompt) {
//       return res.status(400).json({ error: "Prompt is required" });
//     }

//     try {
//       // Solicitar contenido a Cohere usando la API
//       const response = await cohere.generate({
//         model: "command-r-plus-08-2024", // Usar el modelo de Cohere para generación de texto
//         prompt: `Crea un email de tipo ${templateType} basado en la siguiente descripción: ${prompt}`,
//         maxTokens: 100, // Controla la longitud del texto generado
//         temperature: 0.7, // Controla la creatividad del modelo
//       });

//       if (response.generations.length === 0) {
//         throw new Error("Failed to generate content with Cohere");
//       }

//       // Retornar el contenido generado por Cohere
//       // const generatedText = response.body.generations[0].text.trim();
//       const generatedText = response.generations[0].text.trim();

//       res.status(200).json({
//         content: generatedText, // El contenido generado por la AI
//       });
//     } catch (error) {
//       console.error("Cohere API Error:", error);
//       res.status(500).json({ error: "Failed to generate content" });
//     }
//   } else {
//     res.setHeader("Allow", ["POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

import { NextApiRequest, NextApiResponse } from "next";
import { CohereClient } from "cohere-ai";

// Inicializar Cohere con tu API Key
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { prompt, templateType } = req.body; // Prompt para texto e imagen

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    try {
      // Generar texto con Cohere
      const response = await cohere.generate({
        model: "command-r-plus-08-2024", // Usar el modelo de Cohere para generación de texto
        prompt: `Crea un email de tipo ${templateType} basado en la siguiente descripción: ${prompt}`,
        maxTokens: 150, // Controla la longitud del texto generado
        temperature: 0.7, // Controla la creatividad del modelo
      });

      if (response.generations.length === 0) {
        throw new Error("Failed to generate content with Cohere");
      }

      // Obtener texto generado
      const generatedText = response.generations[0].text.trim();

      // Generar la URL de la imagen relacionada al contenido
      const sanitizedPrompt = encodeURIComponent(prompt); // Asegurarse de que el prompt sea seguro para URLs
      const imageUrl = `https://image.pollinations.ai/prompt/${sanitizedPrompt}`;

      // Respuesta con contenido generado y URL de la imagen
      res.status(200).json({
        content: generatedText,
        imageUrl,
      });
    } catch (error) {
      console.error("Error generating content or image:", error);
      res.status(500).json({ error: "Failed to generate content or image" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
