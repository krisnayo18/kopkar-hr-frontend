'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { MENU_SIDEBAR } from '@/config/menu.config';
import { MenuConfig } from '@/config/types';
import { cn } from '@/lib/utils';
import { useMenu } from '@/hooks/use-menu';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/components/ui/menubar';

export function NavbarMenu() {
  const pathname = usePathname();
  let navbarMenu;

  // console.error('pathname', pathname);
  // console.error('MENU_SIDEBAR', MENU_SIDEBAR);
  // console.error('MENU_SIDEBAR_CUSTOM', MENU_SIDEBAR_CUSTOM);

  // MENU_SIDEBAR.forEach((item, index) => {
  //   console.log(`MENU_SIDEBAR[${index}]`, item);
  //   if ('children' in item && item.children) {
  //     item.children.forEach((child, childIndex) => {
  //       console.log(`MENU_SIDEBAR[${index}].children[${childIndex}]`, child);
  //     });
  //   }
  // });

  const employeePaths = [
    '/employees',
    '/contracts',
    '/departments',
    '/positions',
    '/job-grades',
    '/insurances',
    '/assurances',
  ];

  if (employeePaths.some((p) => pathname.startsWith(p))) {
    navbarMenu = MENU_SIDEBAR?.[1];
  } else if (pathname.startsWith('/recruitments')) {
    navbarMenu = MENU_SIDEBAR?.[2];
  } else if (
    pathname.startsWith('/incidents') ||
    pathname.startsWith('/disciplinaries')
  ) {
    navbarMenu = MENU_SIDEBAR?.[3];
  } else {
    navbarMenu = MENU_SIDEBAR?.[0];
  }
  // else if (pathname.includes('/public-profile/')) {
  //   navbarMenu = MENU_SIDEBAR?.[2];
  // } else if (pathname.includes('/network/')) {
  //   navbarMenu = MENU_SIDEBAR?.[4];
  // } else if (pathname.includes('/store-client/')) {
  //   navbarMenu = MENU_SIDEBAR_CUSTOM?.[0];
  // } else if (pathname.includes('/authentication/')) {
  //   navbarMenu = MENU_SIDEBAR?.[5];
  // } else if (pathname.includes('/user-management/')) {
  //   navbarMenu = MENU_SIDEBAR?.[7];
  // } else {
  //   navbarMenu = MENU_SIDEBAR?.[2];
  // }

  const { isActive, hasActiveChild } = useMenu(pathname);

  /**
   * Checks whether an item is a "category group" — a labelled wrapper whose
   * children are the real leaf/sub-group items (i.e. at least one child has
   * its own children). This shape appears in the Employee section where each
   * group (Contracts, Departments …) has a single leaf child.
   */
  const isCategoryGroup = (item: MenuConfig[number]): boolean => {
    return !!(
      item.children &&
      item.children.some((child) => child.children && child.children.length > 0)
    );
  };

  const buildMenu = (items: MenuConfig) => {
    return items.map((item, index) => {
      if (item.children) {
        // Flatten category-group wrappers: render each group as its own
        // top-level MenubarMenu whose dropdown shows the group's children.
        if (isCategoryGroup(item)) {
          return item.children.map((group, groupIndex) => {
            if (!group.children || group.children.length === 0) return null;

            // Single leaf → render as a plain link (no dropdown needed)
            if (group.children.length === 1 && !group.children[0].children) {
              const leaf = group.children[0];
              return (
                <MenubarMenu key={`${index}-${groupIndex}`}>
                  <MenubarTrigger
                    asChild
                    className={cn(
                      'flex items-center px-0 py-3.5 text-sm text-secondary-foreground text-nowrap',
                      'rounded-none border-b-2 border-transparent bg-transparent!',
                      'hover:text-mono hover:bg-transparent',
                      'focus:text-mono focus:bg-transparent',
                      'data-[active=true]:text-mono data-[active=true]:border-mono',
                    )}
                  >
                    <Link
                      href={leaf.path || ''}
                      data-active={isActive(leaf.path) || undefined}
                    >
                      {group.title}
                    </Link>
                  </MenubarTrigger>
                </MenubarMenu>
              );
            }

            // Multiple leaves → render as a dropdown
            return (
              <MenubarMenu key={`${index}-${groupIndex}`}>
                <MenubarTrigger
                  className={cn(
                    'flex items-center gap-1 px-0 py-3.5 text-sm text-secondary-foreground text-nowrap',
                    'rounded-none border-b-2 border-transparent bg-transparent!',
                    'hover:text-mono hover:bg-transparent',
                    'focus:text-mono focus:bg-transparent',
                    'data-[state=open]:bg-transparent data-[state=open]:text-mono',
                    'data-[here=true]:text-mono data-[here=true]:border-mono',
                  )}
                  data-here={hasActiveChild(group.children) || undefined}
                >
                  {group.title}
                  <ChevronDown className="ms-auto size-3.5!" />
                </MenubarTrigger>
                <MenubarContent className="min-w-[175px]" sideOffset={0}>
                  {buildSubMenu(group.children)}
                </MenubarContent>
              </MenubarMenu>
            );
          });
        }

        // Normal nested item → standard dropdown
        return (
          <MenubarMenu key={index}>
            <MenubarTrigger
              className={cn(
                'flex items-center gap-1 px-0 py-3.5 text-sm text-secondary-foreground text-nowrap',
                'rounded-none border-b-2 border-transparent bg-transparent!',
                'hover:text-mono hover:bg-transparent',
                'focus:text-mono focus:bg-transparent',
                'data-[state=open]:bg-transparent data-[state=open]:text-mono',
                'data-[here=true]:text-mono data-[here=true]:border-mono',
              )}
              data-active={isActive(item.path) || undefined}
              data-here={hasActiveChild(item.children) || undefined}
            >
              {item.title}
              <ChevronDown className="ms-auto size-3.5!" />
            </MenubarTrigger>
            <MenubarContent className="min-w-[175px]" sideOffset={0}>
              {buildSubMenu(item.children)}
            </MenubarContent>
          </MenubarMenu>
        );
      } else {
        return (
          <MenubarMenu key={index}>
            <MenubarTrigger
              asChild
              className={cn(
                'flex items-center px-2 py-3.5 text-sm text-secondary-foreground px-3 text-nowrap',
                'rounded-none border-b-2 border-transparent bg-transparent!',
                'hover:text-mono hover:bg-transparent',
                'focus:text-mono focus:bg-transparent',
                'data-[active=true]:text-mono data-[active=true]:border-mono',
              )}
            >
              <Link
                href={item.path || ''}
                data-active={isActive(item.path) || undefined}
                data-here={hasActiveChild(item.children) || undefined}
              >
                {item.title}
              </Link>
            </MenubarTrigger>
          </MenubarMenu>
        );
      }
    });
  };

  const buildSubMenu = (items: MenuConfig) => {
    return items.map((item, index) => {
      if (item.children) {
        return (
          <MenubarSub key={index}>
            <MenubarSubTrigger
              data-active={isActive(item.path) || undefined}
              data-here={hasActiveChild(item.children) || undefined}
            >
              <span>{item.title}</span>
            </MenubarSubTrigger>
            <MenubarSubContent className="min-w-[175px]">
              {buildSubMenu(item.children)}
            </MenubarSubContent>
          </MenubarSub>
        );
      } else {
        return (
          <MenubarItem
            key={index}
            asChild
            data-active={isActive(item.path) || undefined}
            data-here={hasActiveChild(item.children) || undefined}
          >
            <Link href={item.path || ''}>{item.title}</Link>
          </MenubarItem>
        );
      }
    });
  };

  return (
    <div className="grid">
      <div className="kt-scrollable-x-auto flex items-stretch">
        <Menubar className="space-x-0 flex items-stretch border-none bg-transparent gap-5 p-0 h-auto">
          {buildMenu(navbarMenu.children as MenuConfig)}
        </Menubar>
      </div>
    </div>
  );
}
