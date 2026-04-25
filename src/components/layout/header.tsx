"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { usePathname, useRouter } from "next/navigation"
import {
  Bell,
  Book,
  GraduationCap,
  LogOut,
  Menu,
  Moon,
  Settings,
  Sun,
  User,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
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
                        <Image src="/logo.png" alt="Company Logo" width={120} height={40} priority className="h-20 w-auto"/>
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
                        <Button variant='ghost' size="icon" className="rounded-full" onClick={()=>setTheme(theme === "dark" ? "light" : "dark")}>
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
                                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-destructive hover:text-destructive/80">
                                    <LogOut className="h-4 w-4 ml-2"/>
                                    {/* min 43:00 */}
                                        تسجيل الخروج
                                </Button>

                            </>
                        ):(
                            <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
                                <Button variant="secondary" size="sm" className="rounded-full px-6">
                                    تسجيل الدخول
                                </Button>
                            </Link>
                        )}
                    </div>
                    {/* mobile taggele */}
                    <div className="md:hidden flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={()=>setTheme(theme === "dark" ? "light" : "dark")
                        }>
                            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="h-5 w-5 absolute rotate-90 scale-0  dark:rotate-0 dark:scale-100" /> 
                        </Button>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-6 w-6 "/>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-75 sm:w-100">
                                <SheetHeader>
                                    <SheetTitle className="text-right flex items-center gap-2">
                                        <GraduationCap className="h-6 w-6 text-primary">
                                            قائمة ums
                                        </GraduationCap>
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="grid -gap-6 py-8">
                                    {user &&(
                                        <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                                            <div className="bg-primary/10 p-2 rounded-full">
                                                <User className="text-primary w-5 h-5"/>
                                            </div>
                                            <div className="font-medium">
                                                <p>{user.name}</p>
                                                <p className="text-xs text-muted-foreground">{user.email}</p>
                                            </div>
                                        </div>
                                    )}
                                    <div className="grid gap-2 ">
                                        <h3>لوحة التحكم</h3>
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
                                    </div>
                                    <div className="grid gap-2 ">
                                        <h3 >الحساب</h3>
                                        {user ?(
                            <>
                                <Link href="/settings" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                                            <Settings className=" w-4 h-4"/>
                                            الأعدادات
                                        </Link>
                                        {/*  */}
                                <Button variant="ghost" size="sm" onClick={handleLogout} className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                                    <LogOut className=" w-4 h-4"/>
                                    {/* min 43:00 */}
                                        تسجيل الخروج
                                </Button>

                            </>
                        ):(
                            <Link href="/login" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                                <User className=" w-4 h-4"/>
                                    تسجيل الدخول
                                
                            </Link>
                        )}
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
                    {
                        paths.map((path, index)=>{
                            const href = "/" + paths.slice(0, index + 1).join("/");
                            const isLast = index === paths.length - 1;
                            const title = arabicPaths[path] || 
                            path.charAt(0).toUpperCase() + path.slice(1);

                            return(<>
                            <React.Fragment key={href}>
                                <BreadcrumbSeparator className="mx-2 text-muted-foreground"/>
                                <BreadcrumbItem>
                                    {isLast ? (
                                        <BreadcrumbPage>
                                            {title}
                                        </BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink href={href} >
                                            {title}
                                        </BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                            </React.Fragment>
                            </>)
                            
                        }
                    )}
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
