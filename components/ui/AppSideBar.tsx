"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiSettings, FiFeather } from "react-icons/fi";
import { MdOutlineAutoStories, MdOutlineDashboard } from "react-icons/md";
import { TbLayoutSidebarRightExpandFilled } from "react-icons/tb";

const navItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    Icon: MdOutlineDashboard,
    tooltip: "Dashboard",
  },
  {
    href: "/stories",
    label: "My Stories",
    Icon: MdOutlineAutoStories,
    tooltip: "My Stories",
  },
  {
    href: "/settings",
    label: "Settings",
    Icon: FiSettings,
    tooltip: "Settings",
  },
];
type AppSideBarProps = {
  children: React.ReactNode;
};

function AppSideBar({ children }: AppSideBarProps) {
  const pathname = usePathname();

  return (
    <div className="drawer lg:drawer-open ">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <nav className="navbar w-full bg-yellow-500 flex items-center justify-between px-2 py-6">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost hover:bg-amber-600"
          >
            <TbLayoutSidebarRightExpandFilled className="my-1.5 inline-block size-6 text-white " />
          </label>

          <div className=" text-white">Dashboard</div>
          <div className="mr-2 bg-white rounded-full flex place-content-center size-10">
            <UserButton />
          </div>
        </nav>

        {/* Placeholder for the main page content */}
        <div>{children}</div>
      </div>
      {/* sidebar */}
      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          <div className="p-4 text-xl font-bold text-primary w-full is-drawer-close:hidden">
            <Image
              src="/images/stories.ico"
              width={100}
              height={100}
              alt="logo"
              className="block mx-auto"
            />
          </div>

          <div className="p-4 w-full">
            <Link
              href="/create-story"
              className="btn btn-warning w-full is-drawer-close:btn-square is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Generate Story"
            >
              <FiFeather className="size-5" />
              <span className="is-drawer-close:hidden">Generate Story</span>
            </Link>
          </div>

          <ul className="menu w-full grow">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link href={item.href} key={item.href}>
                  <li>
                    <button
                      className={`is-drawer-close:tooltip is-drawer-close:tooltip-right ${
                        isActive ? "font-bold underline text-indigo-950" : ""
                      }`}
                      data-tip={item.tooltip}
                    >
                      <item.Icon className="my-1.5 inline-block size-4" />
                      <span className="is-drawer-close:hidden">
                        {item.label}
                      </span>
                    </button>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AppSideBar;
