import Image from 'next/image';
import { signOut } from '@/lib/actions/user.actions';

import { Button } from '@/components/ui/button';
import FileUploader from '@/components/FileUploader';
import Search from '@/components/Search';

const Header = ({ userId, accountId}: {userId: string, accountId: string}) => {
  
  return (
    <header className="header">
      <Search />
      <div className="header-wrapper">
        <FileUploader ownerId={userId} accountId={accountId} />
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <Button type="submit" className="sign-out-button">
            <Image
              src="/assets/icons/logout.svg"
              alt="logout"
              width={24}
              height={24}
            />
          </Button>
        </form>
      </div>
    </header>
  );
};

export default Header;
