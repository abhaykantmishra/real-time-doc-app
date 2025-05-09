import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText, Plus, Folder, Users, ChevronRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col max-w-7xl mx-auto">
      <header className="border-b sticky top-0 bg-white z-10">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl">FunkyDocs</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-purple-600 transition-colors">
              Features
            </Link>
            <Link href="#templates" className="text-sm font-medium hover:text-purple-600 transition-colors">
              Templates
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-purple-600 transition-colors">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-sm">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition-opacity">
                Sign up free
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.1),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(236,72,153,0.08),transparent_40%)]"></div>
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Create, Edit, Collaborate with{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                      FunkyDocs
                    </span>
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    A fresh take on document editing with all the features you love, plus a funky twist.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup">
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition-opacity">
                      Get started
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button variant="outline" className="border-purple-200">
                      Learn more
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[500px] aspect-[4/3] rounded-xl overflow-hidden border shadow-lg transform rotate-1 hover:rotate-0 transition-transform duration-300">
                  <div className="absolute inset-0 bg-white p-4">
                    <div className="h-6 flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      <div className="h-6 w-[70%] bg-gray-100 rounded-md ml-auto"></div>
                    </div>
                    <div className="h-6 w-[40%] bg-purple-100 rounded-md mb-3"></div>
                    <div className="h-3 w-full bg-gray-100 rounded-md mb-2"></div>
                    <div className="h-3 w-full bg-gray-100 rounded-md mb-2"></div>
                    <div className="h-3 w-[80%] bg-gray-100 rounded-md mb-4"></div>
                    <div className="h-3 w-full bg-gray-100 rounded-md mb-2"></div>
                    <div className="h-3 w-full bg-gray-100 rounded-md mb-2"></div>
                    <div className="h-3 w-[60%] bg-gray-100 rounded-md mb-4"></div>
                    <div className="h-6 w-[50%] bg-pink-100 rounded-md mb-3"></div>
                    <div className="h-3 w-full bg-gray-100 rounded-md mb-2"></div>
                    <div className="h-3 w-full bg-gray-100 rounded-md mb-2"></div>
                    <div className="h-3 w-[70%] bg-gray-100 rounded-md"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-12 md:py-24 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Everything you need to create amazing documents
                </h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  FunkyDocs combines powerful features with a playful interface to make document creation fun again.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 rounded-lg border border-purple-100 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                <div className="rounded-full bg-purple-100 p-3">
                  <Plus className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold">Create Instantly</h3>
                <p className="text-center text-gray-500">
                  Start from scratch or use one of our funky templates to jumpstart your creativity.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border border-pink-100 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                <div className="rounded-full bg-pink-100 p-3">
                  <Users className="h-6 w-6 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold">Collaborate Easily</h3>
                <p className="text-center text-gray-500">
                  Work together in real-time with teammates, no matter where they are.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border border-purple-100 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                <div className="rounded-full bg-purple-100 p-3">
                  <Folder className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold">Organize Smartly</h3>
                <p className="text-center text-gray-500">
                  Keep all your documents in order with our intuitive folder system.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="templates" className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-pink-100 px-3 py-1 text-sm">Templates</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Start with a template</h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose from our collection of funky templates to get started quickly.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {[
                { title: "Business Proposal", color: "from-purple-500 to-pink-500" },
                { title: "Weekly Report", color: "from-blue-500 to-purple-500" },
                { title: "Project Plan", color: "from-pink-500 to-orange-500" },
                { title: "Meeting Notes", color: "from-green-500 to-teal-500" },
                { title: "Resume", color: "from-yellow-500 to-orange-500" },
                { title: "Creative Brief", color: "from-indigo-500 to-blue-500" },
              ].map((template, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-lg border shadow-sm hover:shadow-md transition-all"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-10 group-hover:opacity-20 transition-opacity`}
                  ></div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold">{template.title}</h3>
                    <div className="mt-4 space-y-2">
                      <div className="h-2 w-[80%] rounded-full bg-gray-200"></div>
                      <div className="h-2 w-full rounded-full bg-gray-200"></div>
                      <div className="h-2 w-[60%] rounded-full bg-gray-200"></div>
                    </div>
                    <Button variant="ghost" size="sm" className="mt-4">
                      Use template
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* <section id="pricing" className="py-12 md:py-24 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm">Pricing</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Simple, transparent pricing</h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the plan that works best for you and your team.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col rounded-lg border bg-white p-6 shadow-sm">
                <div className="mb-4">
                  <h3 className="text-lg font-bold">Free</h3>
                  <p className="text-sm text-gray-500">For personal use</p>
                </div>
                <div className="mb-4">
                  <span className="text-3xl font-bold">$0</span>
                  <span className="text-sm text-gray-500">/month</span>
                </div>
                <ul className="mb-6 space-y-2 text-sm">
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4 text-purple-500" />
                    <span>Up to 5 documents</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4 text-purple-500" />
                    <span>Basic templates</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4 text-purple-500" />
                    <span>1GB storage</span>
                  </li>
                </ul>
                <Link href="/signup" className="mt-auto">
                  <Button className="w-full">Get started</Button>
                </Link>
              </div>
              <div className="flex flex-col rounded-lg border-2 border-purple-500 bg-white p-6 shadow-md">
                <div className="mb-4">
                  <div className="inline-block rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800">
                    Popular
                  </div>
                  <h3 className="mt-2 text-lg font-bold">Pro</h3>
                  <p className="text-sm text-gray-500">For professionals</p>
                </div>
                <div className="mb-4">
                  <span className="text-3xl font-bold">$12</span>
                  <span className="text-sm text-gray-500">/month</span>
                </div>
                <ul className="mb-6 space-y-2 text-sm">
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4 text-purple-500" />
                    <span>Unlimited documents</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4 text-purple-500" />
                    <span>All templates</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4 text-purple-500" />
                    <span>10GB storage</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4 text-purple-500" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <Link href="/signup" className="mt-auto">
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition-opacity">
                    Get started
                  </Button>
                </Link>
              </div>
              <div className="flex flex-col rounded-lg border bg-white p-6 shadow-sm">
                <div className="mb-4">
                  <h3 className="text-lg font-bold">Team</h3>
                  <p className="text-sm text-gray-500">For teams of all sizes</p>
                </div>
                <div className="mb-4">
                  <span className="text-3xl font-bold">$49</span>
                  <span className="text-sm text-gray-500">/month</span>
                </div>
                <ul className="mb-6 space-y-2 text-sm">
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4 text-purple-500" />
                    <span>Everything in Pro</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4 text-purple-500" />
                    <span>Team collaboration</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4 text-purple-500" />
                    <span>100GB storage</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4 text-purple-500" />
                    <span>Admin controls</span>
                  </li>
                </ul>
                <Link href="/signup" className="mt-auto">
                  <Button className="w-full">Contact sales</Button>
                </Link>
              </div>
            </div>
          </div>
        </section> */}
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold">FunkyDocs</span>
          </div>
          <p className="text-center text-sm text-gray-500 md:text-left">© 2025 FunkyDocs. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-gray-500 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-gray-500 hover:underline">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-gray-500 hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
