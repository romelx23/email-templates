export const tiers = [
  {
    id: 1,
    name: "Básico",
    price: 9.99,
    description: "Perfecto para pequeños negocios y emprendedores",
    features: [
      "Hasta 1,000 suscriptores",
      "Plantillas de email básicas",
      "Análisis de campañas",
      "Soporte por email",
    ],
    tokens: 100,
    limitations: [
      "Sin acceso a herramientas de AI",
      "Sin integraciones avanzadas",
    ],
  },
  {
    id: 2,
    name: "Pro",
    price: 29.99,
    description: "Ideal para negocios en crecimiento",
    features: [
      "Hasta 10,000 suscriptores",
      "Plantillas de email personalizables",
      "Análisis avanzado de campañas",
      "Herramientas de AI para generación de contenido",
      "Integraciones con CRM populares",
      "Soporte prioritario",
    ],
    tokens: 500,
    limitations: ["Límite en pruebas A/B"],
  },
  {
    id: 3,
    name: "Empresarial",
    price: 99.99,
    description: "Solución a medida para grandes empresas",
    features: [
      "Suscriptores ilimitados",
      "Plantillas de email totalmente personalizables",
      "Análisis predictivo con AI",
      "Integraciones personalizadas",
      "Gestor de cuenta dedicado",
      "SLA garantizado",
    ],
    tokens: 2000,
    limitations: [],
  },
];
