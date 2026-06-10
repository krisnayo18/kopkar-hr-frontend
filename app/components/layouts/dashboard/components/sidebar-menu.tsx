'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  Bell,
  Briefcase,
  Building2,
  CheckSquare,
  ClipboardList,
  Code,
  HelpCircle,
  MessageSquare,
  Settings,
  Shield,
  TrendingUp,
  UserCircle,
  UserCog,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMenu } from '@/hooks/use-menu';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export interface Item {
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  title: string;
  newTab?: boolean;
  active?: boolean;
}

export function SidebarMenu() {
  const items: Item[] = [
    {
      icon: BarChart3,
      path: '/',
      title: 'Dashboard',
      active: true,
    },
    {
      icon: Building2,
      path: '/employees',
      title: 'Employee',
    },
    {
      icon: ClipboardList,
      path: '/hrms/employees',
      title: 'HRMS',
    },
    {
      icon: Briefcase,
      path: '/hcm/employees',
      title: 'HCM',
    },
    {
      icon: UserCircle,
      path: '/public-profile/profiles/default',
      title: 'Profile',
    },
    {
      icon: Settings,
      path: '/account/home/get-started',
      title: 'Account',
    },
    {
      icon: Users,
      path: '/network/get-started',
      title: 'Network',
    },
    {
      icon: Shield,
      path: '/account/billing/plans',
      title: 'Plans',
    },
    {
      icon: MessageSquare,
      path: '/account/security/security-log',
      title: 'Security Logs',
    },
    {
      icon: Bell,
      path: '/account/notifications',
      title: 'Notifications',
    },
    {
      icon: CheckSquare,
      path: '/account/members/roles',
      title: 'ACL',
    },
    {
      icon: Code,
      path: '/account/api-keys',
      title: 'API Keys',
    },
    {
      icon: HelpCircle,
      path: 'https://docs.keenthemes.com/metronic-vite',
      title: 'Docs',
    },
  ];

  const pathname = usePathname();
  const { isActive } = useMenu(pathname);

  return (
    <TooltipProvider>
      <div className="flex flex-col grow items-center py-3.5 lg:py-0 gap-2.5">
        {items.map((item, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                shape="circle"
                mode="icon"
                // {...(item.active ? { 'data-state': 'open' } : {})}
                {...(isActive(item.path) ? { 'data-state': 'open' } : {})}
                className={cn(
                  'data-[state=open]:bg-background data-[state=open]:border data-[state=open]:border-input data-[state=open]:text-primary',
                  'hover:bg-background hover:border hover:border-input hover:text-primary',
                )}
              >
                <Link
                  href={item.path || ''}
                  {...(item.newTab
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  <item.icon className="size-4.5!" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">{item.title}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
