import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { CreateAccount } from "@/components/create-account"

export default function IndexPage() {
  return (
    <section className="container flex justify-between gap-6 pb-8 px-12 pt-6 md:py-12">

      {/* <Alert className="max-w-lg" variant="destructive">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          Prepping for hackton!
        </AlertDescription>
      </Alert> */}
      
      <div className="mt-20 flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
        All-in-one place   <br className="hidden sm:inline" />
        to convert, store and<br className="hidden sm:inline" />
        access your documents. 
        </h1>

        <Separator />

        <p className="text-muted-foreground max-w-[700px] text-lg sm:text-xl">
           Secure, fast, free (for now) <br className="hidden sm:inline" />
           Helping traditional businesses go digital, one step at a time.
        </p>
      </div>
      <div className="mt-2 flex gap-4">
        {/* <Link
          href={siteConfig.links.docs}
          target="_blank"
          rel="noreferrer"
          className={buttonVariants({ size: "lg" })}
        >
          Documentation
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href={siteConfig.links.github}
          className={buttonVariants({ variant: "outline", size: "lg" })}
        >
          GitHub
        </Link> */}

        {/* <Link
          href={"/signup"}
          // target="_blank"
          rel="noreferrer"
          className={buttonVariants({ size: "lg" })}
        >
          Sign Up
        </Link>
        <Link
          href={"/login"}
          // target="_blank"
          rel="noreferrer"
          className={buttonVariants({ variant: "outline", size: "lg" })}
        >
          Login
        </Link> */}
      </div>
      <div className="flex mr-8">
      <CreateAccount/>
      </div>
      
    </section>
  )
}
