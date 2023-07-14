"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../Button";

interface ConfirmProps {
  isOpen: boolean;
  text: string;
  onAction: () => void;
  onClose: () => void;
  disabled?: boolean;
}

const Confirm = ({
  isOpen,
  disabled,
  text,
  onAction,
  onClose,
}: ConfirmProps) => {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="absolute top-0 right-0 w-screen h-screen bg-black/70 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              delay: 0.3,
            },
          }}
        >
          <motion.div
            className="bg-white rounded-lg w-[340px] h-[160px] flex flex-col justify-between p-4"
            initial={{ opacity: 0, y: "100%", scale: 0.5 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                delay: 0.3,
                type: "tween",
              },
            }}
            exit={{ opacity: 0, y: "100%", scale: 0.5 }}
          >
            <h3 className="text-xl">{text}</h3>
            <div className="flex gap-4">
              <Button
                label="아니오"
                action={onClose}
                disabled={disabled}
                small
                outline
              />
              <Button label="네" action={onAction} disabled={disabled} small />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Confirm;
