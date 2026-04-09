import NavLink from "./NavLink";

export function Navbar() {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Focus", href: "/focus" },
    { name: "Settings", href: "/settings" },
  ];

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[min(92vw,480px)] rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.4)]">
      <div className="flex items-center justify-between gap-2 md:gap-4">
        {navItems.map((item) => (
          <NavLink key={item.href} href={item.href}>
            {item.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
