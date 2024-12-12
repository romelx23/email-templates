import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Star, Users, ArrowRight, Home, FileText, Settings, BarChart, ArrowLeft, Zap, Target, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Metadata } from "next"
import { Navbar } from "@/components/home/navbar"
import { FooterComponent } from "@/components/home/footer"
import { HomeLayout } from "@/components/home/home-layout"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EmailThemes',
  description: 'Transform your email campaigns with our AI-powered themes. Boost engagement and conversion rates with beautiful, responsive designs.',
}


export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">

      <HomeLayout>

        <main className="flex-1 mx-auto">
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <Badge className="inline-flex rounded-lg px-3 py-1">
                      <Star className="mr-2 h-4 w-4" />
                      4.9/5 from over 1000 reviews
                    </Badge>
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                      Advanced Email Marketing Themes
                    </h1>
                    <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                      Transform your email campaigns with our AI-powered themes. Boost engagement and conversion rates with
                      beautiful, responsive designs.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Link href="/auth/register"
                      // {/* size="lg" */}
                      className="flex items-center justify-center bg-primary text-primary-foreground rounded-lg px-6 py-3"
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                    <Button size="lg" variant="outline" className=" bg-inherit">
                      View Demos
                    </Button>
                  </div>
                </div>
                <div className="mx-auto flex w-full max-w-[400px] items-center justify-center lg:max-w-none">
                  <Card className="w-full">
                    <CardContent className="p-6">
                      <div className="grid gap-4">
                        <div className="grid gap-1">
                          <h3 className="text-xl font-bold">Monthly Statistics</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Your email campaign performance</p>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                          <Card>
                            <CardContent className="p-4">
                              <div className="grid gap-1">
                                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Open Rate</h4>
                                <div className="text-2xl font-bold">45.8%</div>
                              </div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="p-4">
                              <div className="grid gap-1">
                                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Click Rate</h4>
                                <div className="text-2xl font-bold">12.3%</div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full py-12 md:py-24 lg:py-32 ">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <FileText className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold">110+ Templates</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Choose from our extensive library of professionally designed email templates.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <Settings className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold">Easy Customization</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Modify templates with our intuitive drag-and-drop editor.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <BarChart className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold">Analytics</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Track performance with detailed analytics and insights.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full py-12 md:py-24 lg:py-32 ">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ayudamos a tu negocio</h2>
                  <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Potenciamos tu estrategia de email marketing para impulsar el crecimiento de tu empresa
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
                <Card>
                  <CardContent className="flex flex-col items-center space-y-4 text-center p-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <TrendingUp className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Aumenta tus ventas</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Nuestras plantillas están diseñadas para maximizar las conversiones y aumentar tus ingresos.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex flex-col items-center space-y-4 text-center p-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <Target className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Mejora el engagement</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Crea campañas que resuenen con tu audiencia y generen más interacciones.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex flex-col items-center space-y-4 text-center p-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <Zap className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Optimiza tu tiempo</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Ahorra tiempo con nuestras herramientas fáciles de usar y automatiza tus campañas.
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="flex justify-center">
                <Button size="lg">
                  Empieza ahora
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </section>

          <section className="w-full py-12 md:py-24 lg:py-32 ">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Our Clients Acknowledge The Value We Deliver
                  </h2>
                  <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Acknowledged by Our Clients: The Superior Value and Expertise We Offer in Every Engagement
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12">
                <div className="flex flex-col gap-4 rounded-lg bg-white p-6 dark:bg-gray-900">
                  <div className="flex items-center gap-4">
                    <Image
                      alt="Avatar"
                      className="rounded-full"
                      height="40"
                      src="/placeholder.svg?height=40&width=40"
                      style={{
                        aspectRatio: "40/40",
                        objectFit: "cover",
                      }}
                      width="40"
                    />
                    <div className="grid gap-1">
                      <h3 className="font-semibold">Savannah Nguyen</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">CEO Sans Brothers</p>
                    </div>
                  </div>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">
                    It was a pleasure working with the team. They understood the brief correctly and delivered great designs exceeding the expectations.
                  </p>
                </div>
                <div className="flex flex-col gap-4 rounded-lg bg-white p-6 dark:bg-gray-900">
                  <div className="flex items-center gap-4">
                    <Image
                      alt="Avatar"
                      className="rounded-full"
                      height="40"
                      src="/placeholder.svg?height=40&width=40"
                      style={{
                        aspectRatio: "40/40",
                        objectFit: "cover",
                      }}
                      width="40"
                    />
                    <div className="grid gap-1">
                      <h3 className="font-semibold">Eleanor Pena</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">CEO Sans Brothers</p>
                    </div>
                  </div>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">
                    It was a pleasure working with the team. They understood the brief correctly and delivered great designs exceeding the expectations.
                  </p>
                </div>
                <div className="flex flex-col gap-4 rounded-lg bg-white p-6 dark:bg-gray-900">
                  <div className="flex items-center gap-4">
                    <Image
                      alt="Avatar"
                      className="rounded-full"
                      height="40"
                      src="/placeholder.svg?height=40&width=40"
                      style={{
                        aspectRatio: "40/40",
                        objectFit: "cover",
                      }}
                      width="40"
                    />
                    <div className="grid gap-1">
                      <h3 className="font-semibold">Jerome Bell</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">CEO Sans Brothers</p>
                    </div>
                  </div>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">
                    It was a pleasure working with the team. They understood the brief correctly and delivered great designs exceeding the expectations.
                  </p>
                </div>
              </div>
              <div className="flex justify-center gap-4 mt-8">
                <Button variant="outline" size="icon" className="rounded-full">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Previous testimonials</span>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <ArrowRight className="h-4 w-4" />
                  <span className="sr-only">Next testimonials</span>
                </Button>
              </div>
            </div>
          </section>

          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Subscribe to Our Newsletter</h2>
                  <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Get the latest updates on new templates and email marketing tips.
                  </p>
                </div>
                <div className="w-full max-w-sm space-y-2">
                  <form className="flex space-x-2">
                    <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
                    <Button type="submit">Subscribe</Button>
                  </form>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    By subscribing, you agree to our terms and privacy policy.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </HomeLayout>

    </div>
  )
}
