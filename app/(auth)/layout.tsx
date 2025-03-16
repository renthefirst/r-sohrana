import Image from 'next/image';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <section className="hidden w-1/2 items-center justify-center bg-brand p-10 lg:flex xl:w-2/5">
        <div className="flex max-h-[800px] max-w-[430px] flex-col justify-center items-center space-y-12">
          <div className="w-full flex flex-col justify-between items-center rounded-full bg-white p-4">
            <Image
              src="/assets/icons/logo.svg"
              alt="logo"
              width={82}
              height={82}
              className="h-auto"
            />
            <h1 className="h1 text-brand">Sohrana</h1>
          </div>

          <div className="space-y-2 text-white text-center">
            <h1 className="h2">Управляйте своими файлами наилучшим образом</h1>
            <p className="body-1">
              Это место, где вы можете хранить и сохранять.
            </p>
          </div>
          <Image
            src="/assets/images/files.png"
            alt="Files"
            width={250}
            height={250}
            className="transition-all hover:rotate-2 hover:scale-105"
          />
        </div>
      </section>

      <section className="flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0">
        <div className="mb-16 lg:hidden">
          <Image
            src="/assets/icons/logo.svg"
            alt="logo"
            width={82}
            height={82}
            className="h-auto w-[200px] lg:w-[250px]"
          />
          <h1 className="h1 text-brand text-center pt-2">Sohrana</h1>
        </div>

        {children}
      </section>
    </div>
  );
};

export default Layout;
