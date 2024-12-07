import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "",
          label: "Master Data",
          active: pathname.includes("/posts"),
          icon: SquarePen,
          submenus: [
            {
              href: "/m_siswa",
              label: "Siswa",
              active: pathname === "/m_siswa"
            },
            {
              href: "/tahun_ajaran",
              label: "Tahun Ajaran",
              active: pathname === "/tahun_ajaran"
            }
          ]
        },
        {
          href: "",
          label: "Nilai",
          active: pathname.includes("/"),
          icon: SquarePen,
          submenus: [
            {
              href: "/karya",
              label: "Karya Ilmiah",
              active: pathname === "/karya"
            },
            {
              href: "/anekdot",
              label: "Catatan Anekdot",
              active: pathname === "/anekdot"
            },
            {
              href: "/foto_berseri",
              label: "Foto Berseri",
              active: pathname === "/foto_berseri"
            },
            {
              href: "/pencapaian",
              label: "Ceklis Pencapaian",
              active: pathname === "/pencapaian"
            }
          ]
        },
      ]
    },
    // {
    //   groupLabel: "Contents",
    //   menus: [
    //     {
    //       href: "",
    //       label: "Posts",
    //       active: pathname.includes("/posts"),
    //       icon: SquarePen,
    //       submenus: [
    //         {
    //           href: "/posts",
    //           label: "All Posts",
    //           active: pathname === "/posts"
    //         },
    //         {
    //           href: "/posts/new",
    //           label: "New Post",
    //           active: pathname === "/posts/new"
    //         }
    //       ]
    //     },
    //     {
    //       href: "/categories",
    //       label: "Categories",
    //       active: pathname.includes("/categories"),
    //       icon: Bookmark,
    //       submenus: []
    //     },
    //     {
    //       href: "/tags",
    //       label: "Tags",
    //       active: pathname.includes("/tags"),
    //       icon: Tag,
    //       submenus: []
    //     }
    //   ]
    // },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/users",
          label: "Users",
          active: pathname.includes("/users"),
          icon: Users,
          submenus: []
        },
        {
          href: "/account",
          label: "Account",
          active: pathname.includes("/account"),
          icon: Settings,
          submenus: []
        }
      ]
    }
  ];
}
