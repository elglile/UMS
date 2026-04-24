"use client"

import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { cn } from "../../../lib/utils";
import Image from "next/image";
import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,

}
    from "@radix-ui/react-navigation-menu";
import { Bell, Book, Moon, Sun, User } from "lucide-react";
import { navigationMenuTriggerStyle } from "../ui/navigation-menu";
import { Button } from "../ui/button";
// import { NavigationMenuContent } from "../ui/navigation-menu";
// from "../ui/navigation-menu";

const components: { title: string; href: string; description: string }[] = [
    {
        title: "لوحة تحكم المدير ", // لوحة تحكم المدير  dashboard Admin
        href: "/dashboard/Admin",
        description: "ادارة المستخدمين و المواد و الاحصئيات العامة " // ادارة المستخدمين و المواد و الاحصئيات العامة  User Management, Materials, and General Statistics
    },
    {
        title: "لوحة تحكم الدكتور ", // لوحة تحكم الدكتور  Professor dashboard
        href: "/dashboard/Professor",
        description: "ادارة المواد و الدرجات و الطلاب المسجلين " // ادارة المواد و الدرجات و الطلاب المسجلين  Course, Grade, and Enrolled Student Management
    },
    {
        title: "لوحة تحكم الطالب ", // لوحة تحكم الطالب  Student dashboard
        href: "/dashboard/Student",
        description: "عرض الجدول و الدرجات و المواد المسجلة " // عرض الجدول و الدرجات و المواد المسجلة  View the schedule, grades, and enrolled courses
    }
]


const arabicPaths: Record<string, string> = {
    dashboard: "لوحة التحكم",
    admin: "المدير",
    Professor: "الدكتور",
    Student: "الطالب",
    login: "تسجيل الدخول",
    singin: "أنشاء حساب",
    courses: "المواد",
    settings: "الأعدادات",
    profile: "البيانات الشخصية",
    Notifications: "الأشعارات",
}

interface UserSession {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'professor' | 'student';

}
export function Header() {
    const { setTheme, theme } = useTheme();
    const pathname = usePathname();
    const router = useRouter();
    const [scrolled, setScrolled] = useState(false);
    const [user, setUser] = useState<UserSession | null>(null);
    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await fetch("/api/auth/me")
                const data = await res.json()
                if (data.success) {
                    setUser(data.user)
                }
            } catch {

            }
        }
        fetchUser()
    }, [pathname])

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" })
        setUser(null)
        router.push("/login")
    }

    const paths = pathname.split("/").filter(Boolean)
    return (
        <header className={cn(
            "sticky top-0 z-50 w-full transition-all duration-300",
            scrolled ? "glass shadow-sm py-2" : "bg-transparent py-4"
        )}>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-14">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 ml-8">
                        <Image src="/logo.png" alt="Company Logo" width={120} height={40} priority />
                    </Link>
                    {/* Desktop navigation */}
                    <div className="hidden md:flex flex-1 justify-center">
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger>
                                        {/* The Academy */}
                                        الأكادمية
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid gap-3 p-6 md:w-100 lg:w-125 lg:grid-cols-[1fr_.75fr]">
                                            <li className="row-span-3">
                                                <NavigationMenu>
                                                    <Link className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-indigo-500 to-purple-600 p-6 no-underline outline-none focus:shadow-md" href="/">
                                                    <Book className="h-6 w-6 text-white"/>
                                                        <div className="mb-2 mt-4 text-lg font-medium text-white">
                                                            {/* Academic Excellence */}
                                                            التميز الاكاديمي
                                                        </div>
                                                        <p className="text-sm leading-tight text-white/90">
                                                        {/*  Discover our global programmes */}
                                                            اكتشف برامجنا العالمية
                                                        </p>
                                                    </Link>
                                                </NavigationMenu>
                                            </li>
                                            <ListItem href="/courses" title="البكالوريوس">
                                            شهادات العلوم , الهندسة و الأدب
                                            </ListItem>
                                            <ListItem href="/Graduate" title="الدراسات العليا">
                                            برنامج المتجيستير و الدكتورة
                                            </ListItem>
                                            <ListItem href="/Online" title="التعلم عن بعد">
                                            خيارات مرنة للمهنيين
                                            </ListItem>
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger>
                                        لوحات التحكم
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-100 gap-3 p-4 md:w-125 md:grid-cols-2 lg:w-150">
                                            {components.filter((component)=>{
                                                if(!user) return false;
                                                if(user.role === "admin") return true;
                                                if(user.role === "professor") 
                                                    return component.href === "/dashboard/Professor";
                                                if(user.role === "student") 
                                                    return component.href === "/dashboard/student";
                                                return false;
                                            })
                                            .map((component)=>(
                                                <ListItem key={component.title} title={component.title} href={component.href}>
                                                    {component.description}
                                            </ListItem>
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuLink href="/campus" className={navigationMenuTriggerStyle()}>
                                            الحياة الجامعية
                                    </NavigationMenuLink>
                                </NavigationMenuItem>

                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                    {/* Right section: yheme and profil */}
                    <div className="hidden md:flex items-center gap-4">
                        <Button variant='ghost' size="icon" className="rounded-full" onClick={()=>setTheme(theme === "dark" ? "Light" : "dark")}>
                            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0  dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">
                                تغيير الوضع
                            </span>
                        </Button>
                        {user ?(
                            <>
                                <Link href="/notifications">
                                        <Button variant="ghost" size="icon" className="rounded-full relative">
                                            <Bell className="h-5 w-5"/>
                                            <span className="absolute top-1 left-1 h-2 w-2 bg-red-500 rounded-full"></span>
                                        </Button>
                                </Link>
                                <Link href="/profile" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                                    <div className="bg-primary/10 p-2 rounded-full">
                                        <User className="text-primary w-4 h-4"/>
                                        <span className="font-medium">
                                            {user.name}
                                        </span>
                                    </div>
                                </Link>
                                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-destructive hover:">
                                    {/* min 43:00 */}
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({className, title, children, ...props}, ref)=>{
    return(
        <li>
            <NavigationMenuLink asChild>
                <a ref={ref} className={cn(
                    "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                    className
                )}
                {...props}>
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
