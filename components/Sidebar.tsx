'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { avatarPlaceholderUrl, navItems } from '@/constants';
import { cn } from '@/lib/utils';

interface Props {
  fullName: string;
  email: string;
  avatar: string;
}

const Sidebar = ({ email, avatar, fullName }: Props) => {
  const pathname = usePathname();
  return (
    <aside className="sidebar">
      <Link href="/">
        <div className='flex justify-around items-center'>
          <Image
            width={80}
            height={50}
            alt="logo"
            src="/assets/icons/logo.svg"
            className="hidden h-auto lg:block"
          />
          <p className="text-brand h1 pl-1">Сохрана</p>
        </div>
        <Image
          width={52}
          height={52}
          alt="logo"
          src="/assets/icons/logo.svg"
          className="h-auto lg:hidden"
        />
      </Link>

      <nav className="sidebar-nav">
        <ul className="flex flex-1 flex-col gap-6">
          {navItems.map(({ url, name, icon }) => (
            <Link key={name} href={url} className="lg:w-full">
              <li
                className={cn(
                  'sidebar-nav-item',
                  pathname === url && 'shad-active'
                )}
              >
                <Image
                  src={icon}
                  alt={name}
                  width={24}
                  height={24}
                  className={cn(
                    'nav-icon',
                    pathname === url && 'nav-icon-active'
                  )}
                />
                <p className="hidden lg:block">{name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </nav>

      <Image
        src="/assets/images/files-2.png"
        alt=""
        width={506}
        height={418}
        className="w-full"
      />

      <div className="sidebar-user-info">
        <Image
          src={avatar || avatarPlaceholderUrl}
          height={44}
          width={44}
          alt="avatar"
          className="sidebar-user-avatar"
        />
        <div className="hidden lg:block">
          <p className="subtitle-2 capitalize">{fullName}</p>
          <p className="caption">{email}</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
