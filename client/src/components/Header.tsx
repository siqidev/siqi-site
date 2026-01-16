import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useLanguage, Language } from "@/contexts/LanguageContext";

interface NavItem {
    label: string;
    href?: string;
    scrollTo?: string;
    children?: { label: string; href: string }[];
}

interface HeaderProps {
    variant?: "home" | "page";
}

export function Header({ variant = "page" }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProjectsOpen, setIsProjectsOpen] = useState(false);
    const [location] = useLocation();
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { language, setLanguage, t } = useLanguage();

    const isHome = variant === "home" || location === "/";

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsProjectsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setIsMenuOpen(false);
        }
    };

    const homeNavItems: NavItem[] = [
        { label: "./HOME", scrollTo: "hero" },
        { label: "./PROFILE", scrollTo: "about" },
        {
            label: "./PROJECTS",
            children: [
                { label: "AVATAR UI", href: "/avatarui" },
                { label: "SPECTRA", href: "/spectra" },
            ],
        },
        { label: "./LOGS", scrollTo: "blog" },
        { label: "./CONTACT", scrollTo: "contact" },
    ];

    const pageNavItems: NavItem[] = [
        { label: "./HOME", href: "/" },
        { label: "./PROFILE", href: "/#about" },
        {
            label: "./PROJECTS",
            children: [
                { label: "AVATAR UI", href: "/avatarui" },
                { label: "SPECTRA", href: "/spectra" },
            ],
        },
        { label: "./LOGS", href: "/#blog" },
        { label: "./CONTACT", href: "/#contact" },
    ];

    const navItems = isHome ? homeNavItems : pageNavItems;

    const handleNavClick = (item: NavItem) => {
        if (item.scrollTo && isHome) {
            scrollToSection(item.scrollTo);
        }
        setIsMenuOpen(false);
    };

    const renderNavItem = (item: NavItem, isMobile = false) => {
        const baseClass = isMobile
            ? "text-xl font-display text-primary hover:text-neon-magenta tracking-widest"
            : "hover:text-neon-magenta transition-colors text-primary/80";

        if (item.children) {
            return (
                <div key={item.label} className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsProjectsOpen(!isProjectsOpen)}
                        className={`${baseClass} flex items-center gap-1`}
                    >
                        {item.label}
                        <ChevronDown
                            className={`w-3 h-3 transition-transform ${isProjectsOpen ? "rotate-180" : ""}`}
                        />
                    </button>
                    {isProjectsOpen && (
                        <div
                            className={`${isMobile
                                ? "flex flex-col items-center gap-4 mt-4"
                                : "absolute top-full left-0 mt-2 min-w-[160px] bg-black/95 border border-primary/30 backdrop-blur-md"
                                }`}
                        >
                            {item.children.map((child) => (
                                <Link
                                    key={child.href}
                                    href={child.href}
                                    onClick={() => {
                                        setIsProjectsOpen(false);
                                        setIsMenuOpen(false);
                                    }}
                                    className={
                                        isMobile
                                            ? "text-lg font-mono text-primary/80 hover:text-neon-magenta"
                                            : "block px-4 py-2 font-mono text-sm text-primary/80 hover:text-neon-magenta hover:bg-primary/10 transition-colors"
                                    }
                                >
                                    {child.label}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            );
        }

        if (item.href) {
            return (
                <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={baseClass}
                >
                    {item.label}
                </Link>
            );
        }

        return (
            <button key={item.label} onClick={() => handleNavClick(item)} className={baseClass}>
                {item.label}
            </button>
        );
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-primary/30 bg-black/80 backdrop-blur-md">
            <div className="container flex items-center justify-between h-16 px-4">
                <Link href="/" className="flex items-center gap-2">
                    <span className="font-display text-xl tracking-widest text-primary">&gt;_SIQI</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8 text-sm font-mono">
                    {navItems.map((item) => renderNavItem(item))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-primary hover:text-neon-magenta transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Desktop Right Section */}
                <div className="hidden md:flex items-center gap-2">
                    {/* Language Switch */}
                    <div className="flex border border-primary/50 font-mono text-xs">
                        <button
                            onClick={() => setLanguage("en")}
                            className={`px-3 py-1.5 transition-all duration-200 ${language === "en"
                                ? "bg-primary text-black"
                                : "text-primary/70 hover:text-primary hover:bg-primary/10"
                                }`}
                        >
                            EN
                        </button>
                        <button
                            onClick={() => setLanguage("ja")}
                            className={`px-3 py-1.5 transition-all duration-200 ${language === "ja"
                                ? "bg-primary text-black"
                                : "text-primary/70 hover:text-primary hover:bg-primary/10"
                                }`}
                        >
                            JA
                        </button>
                    </div>
                    {/* Status Button */}
                    <div className="border border-primary text-primary font-mono text-xs px-3 py-1.5 hover:bg-primary hover:text-black transition-all duration-200">
                        {t("nav.status")}
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 top-16 z-40 bg-black/95 backdrop-blur-xl border-t border-primary/20 md:hidden flex flex-col items-center justify-start pt-12 gap-8 animate-in slide-in-from-top-5 fade-in duration-200 h-[calc(100vh-4rem)] overflow-y-auto">
                    {navItems.map((item) => renderNavItem(item, true))}

                    {/* Mobile Language Switch */}
                    <div className="flex border border-primary/50 font-mono text-sm mt-4">
                        <button
                            onClick={() => setLanguage("en")}
                            className={`px-4 py-2 transition-all duration-200 ${language === "en"
                                ? "bg-primary text-black"
                                : "text-primary/70 hover:text-primary"
                                }`}
                        >
                            EN
                        </button>
                        <button
                            onClick={() => setLanguage("ja")}
                            className={`px-4 py-2 transition-all duration-200 ${language === "ja"
                                ? "bg-primary text-black"
                                : "text-primary/70 hover:text-primary"
                                }`}
                        >
                            JA
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
