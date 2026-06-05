import { FileText, Github, Twitter, Linkedin } from "lucide-react"

const footerLinks = {
  Product: [
    { name: "PDF Tools", href: "#tools" },
    { name: "Pricing", href: "#pricing" },
    { name: "API", href: "#" },
    { name: "Desktop App", href: "#" },
  ],
  Company: [
    { name: "About Us", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Press Kit", href: "#" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" },
    { name: "GDPR", href: "#" },
  ],
  Contact: [
    { name: "support@welovepdf.com", href: "mailto:support@welovepdf.com" },
    { name: "Help Center", href: "#" },
    { name: "Status", href: "#" },
  ],
}

const socialLinks = [
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "GitHub", icon: Github, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
]

export function Footer() {
  return (
    <footer id="footer" className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <a href="#" className="flex items-center gap-2 font-bold text-xl">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                <FileText className="h-5 w-5" />
              </div>
              <span>We Love PDF</span>
            </a>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              All-in-one PDF tools for everyone. Convert, edit, and manage your PDFs with ease.
            </p>
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-foreground">{category}</h3>
              <ul className="mt-4 space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 We Love PDF. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Made with love for PDF enthusiasts worldwide.
          </p>
        </div>
      </div>
    </footer>
  )
}