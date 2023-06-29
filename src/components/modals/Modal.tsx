"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import { FaTimes } from "react-icons/fa";
import Button from "../Button";
import { modalItemVariants, modalVariants } from "@/libs/framer/variants";

interface ModalProps {
  head: string;
  body: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  actionLabel: string;
  onSubmit: () => void;
  secondaryActionLabel?: string;
  secondaryAction?: () => void;
  disabled?: boolean;
}

const Modal = ({
  head,
  body,
  isOpen,
  onClose,
  actionLabel,
  onSubmit,
  secondaryAction,
  secondaryActionLabel,
  disabled,
}: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          variants={modalVariants}
          initial={modalVariants.start}
          animate={modalVariants.end}
          exit={modalVariants.exit}
          className="fixed top-0 left-0 overflow-hidden w-screen h-screen bg-black/70"
        >
          <div className="flex items-center justify-center h-full w-full">
            <motion.div
              variants={modalItemVariants}
              initial={modalItemVariants.start}
              animate={modalItemVariants.end}
              exit={modalItemVariants.exit}
              className="bg-white w-full sm:w-3/4 md:w-1/2 lg:w-1/3 2xl:w-2/5 h-full sm:h-auto rounded-lg"
            >
              <div className="p-6 relative flex items-center justify-center font-semibold text-lg">
                <div
                  className="absolute left-6 cursor-pointer hover:opacity-70 hover:scale-105 transition"
                  onClick={onClose}
                >
                  <FaTimes />
                </div>
                {head}
              </div>
              <hr />
              <div className="p-6 max-h-[350px] overflow-y-auto">{body}</div>
              <hr />
              <div className="p-6">
                <div className="flex items-center justify-center gap-6">
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      label={secondaryActionLabel}
                      action={secondaryAction}
                      outline
                    />
                  )}
                  <Button
                    label={actionLabel}
                    action={onSubmit}
                    disabled={disabled}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Modal;
