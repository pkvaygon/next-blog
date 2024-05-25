"use client";

import React from "react";

import { ThemeSwitcher } from "./ThemeSwitcher";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import Link from "next/link";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { navLinks } from "@/static";
import { LogoIcon } from "@/icons";
import { SearchInput } from "./ui/SearchInput";
import { usePathname } from "next/navigation";
export default function Header() {
  const user = false;
  const pathname = usePathname();
  return (
    <Navbar
      classNames={{
        // base: "lg:bg-transparent lg:backdrop-filter-none",
        item: "data-[active=true]:text-primary",
        wrapper: "px-4 sm:px-6",
      }}
      height="60px">
      <NavbarBrand className="flex gap-2">
        <NavbarMenuToggle className="mr-2 h-6 sm:hidden" />
        <LogoIcon size={24} width={24} height={24} />
        <p className="font-bold text-inherit">KyrgyzRepublic</p>
      </NavbarBrand>
      <NavbarContent
        className="ml-4 hidden h-12 w-full max-w-fit gap-4 rounded-full bg-content2 px-4 dark:bg-content1 sm:flex"
        justify="center">
        {navLinks.map((el) => (
          <NavbarItem key={el.id}>
            <Link
              className={`${
                pathname === el.href ? "text-green-500" : ""
              } 'font-bold flex gap-2 text-inherit`}
              href={el.href}>
              {el.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent
        className="ml-auto flex h-12 max-w-max items-center gap-2 rounded-full p-0 lg:bg-content2 lg:p-1 lg:dark:bg-content1"
        >
        <NavbarItem className="w-[400px] max-md:hidden">
          <SearchInput />
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem className="px-2">
          {user ? <Avatar size="sm" /> : <Button>Sign In</Button>}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {navLinks.map((el) => (
          <NavbarMenuItem key={el.id}>
            <Link className="flex gap-2 text-inherit" href={el.href}>
              {el.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
