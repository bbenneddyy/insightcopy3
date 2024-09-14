import AdminNavbar from '@/components/Navbar/AdminNavbar'

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <AdminNavbar />
            <main>{children}</main>
        </>
    )
}
