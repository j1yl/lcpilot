'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import OpenProfile from './OpenProfile';
import { Session } from 'next-auth';
import Image from 'next/image';
import { Button, buttonVariants } from '../Button';
import { signOut } from 'next-auth/react';

type Props = {
  session: Session;
};

export default function Profile({ session }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const openProfile = () => setIsOpen(true);
  const closeProfile = () => setIsOpen(false);

  if (!session) return null;

  return (
    <>
      <button onClick={openProfile} aria-label="Open profile">
        <OpenProfile session={session} />
      </button>
      <Transition show={isOpen}>
        <Dialog
          onClose={closeProfile}
          className="absolute right-0 top-[40px] z-30 m-2 h-max w-full rounded-xl bg-neutral-800 md:w-[300px]"
        >
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <Dialog.Panel className="grid gap-2 p-4">
              <div className="flex items-center gap-4">
                <Image
                  src={session.user?.image as string}
                  alt={session.user?.name as string}
                  width={64}
                  height={64}
                  className={`h-16 w-16 rounded-full`}
                />
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-bold leading-none">{session.user?.name}</h2>
                  <p>{session.user?.email}</p>
                </div>
              </div>
              <div></div>
              <div>
                <Button
                  className={buttonVariants({
                    variant: 'ghost',
                    className: 'w-full'
                  })}
                  onClick={() => signOut()}
                >
                  Sign out
                </Button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
