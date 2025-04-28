import React from "react"

const Footer = () => {
  return (
    <footer className="w-full border-t bg-background py-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-start justify-between px-4 mb-10">
        {/* Brand / Logo Section */}
        <div className="mb-6 w-full sm:w-auto">
          <h2 className="text-xl font-bold">MyApp</h2>
          <p className="text-sm text-muted-foreground">© 2023 MyApp, Inc.</p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap gap-8">
          <div>
            <h3 className="mb-2 font-semibold">Product</h3>
            <ul className="space-y-1 text-sm">
              <li><a href="#" className="hover:underline">Features</a></li>
              <li><a href="#" className="hover:underline">Pricing</a></li>
              <li><a href="#" className="hover:underline">Updates</a></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">Company</h3>
            <ul className="space-y-1 text-sm">
              <li><a href="#" className="hover:underline">About</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">Resources</h3>
            <ul className="space-y-1 text-sm">
              <li><a href="#" className="hover:underline">Blog</a></li>
              <li><a href="#" className="hover:underline">Docs</a></li>
              <li><a href="#" className="hover:underline">Help Center</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer