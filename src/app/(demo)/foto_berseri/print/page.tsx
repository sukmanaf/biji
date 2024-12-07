import Link from "next/link";

import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

export default function CategoriesPage() {
  return (
    <ContentLayout title="Categories">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Categories</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="w-full">
      <CardHeader>
        <CardTitle>Cetak Karya </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
            <div className="w-9/12">
                <div className="flex flex-col items-end">
                <label className="text-lg font-serif">2023/2024</label>
                <label className="text-lg font-serif font-bold">DOKUMENTASI</label>
                <label className="text-lg font-serif font-bold">HASIL KARYA</label>
                </div>
                <div className="flex items-center mt-4">
                <div className="flex flex-col items-end mr-2">
                    <label className="text-sm font-serif">Kelompok</label>
                    <label className="text-sm font-serif">Semester</label>
                </div>
                <div className="flex flex-col items-start">
                    <label className="text-sm font-serif">: B</label>
                    <label className="text-sm font-serif">: 1 Gasal</label>
                </div>
                </div>
            </div>
            </div>

            
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
        
    </ContentLayout>
  );
}
