import { Dialog, Transition } from "@headlessui/react";
import React, { FC, Fragment } from "react";
import { MdMenu } from "react-icons/md";
import { useToggle } from "react-use";
import { IconButton } from "./IconButton";
import { Navigation } from "./Navigation";

export const NavigationDrawerButton: FC = () => {
  const [isOpen, toggleIsOpen] = useToggle(false);

  return (
    <>
      <IconButton
        aria-label="メニューを開く"
        icon={<MdMenu />}
        variant="ghost"
        size="md"
        color="contrast"
        onClick={toggleIsOpen}
      />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={toggleIsOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/20" />
          </Transition.Child>

          <div className="fixed inset-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="h-fit w-fit p-3">
                <Dialog.Title as="h3" className="sr-only">
                  メニュー
                </Dialog.Title>
                <Navigation onNavigation={toggleIsOpen} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
