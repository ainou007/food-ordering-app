"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useI18n } from "@/locales/client";

type ConfirmDialogProps = {
  onConfirm: () => void;
  onCancel: () => void;
  open: boolean;
  title?: string;
  description?: string;
};

const ConfirmDialog = ({ onConfirm, onCancel, open, title, description }: ConfirmDialogProps) => {
  const t = useI18n();

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px]" hiddenCloseButton>
        <DialogHeader>
          <DialogTitle> {title ?? t("Common.confirm")} </DialogTitle>
          <DialogDescription> {description ?? t("Common.confirmMessage")} </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex justify-start gap-2">
            <Button type="submit" onClick={onConfirm}>
              {t("Common.yes")}
            </Button>
            <Button onClick={onCancel} type="submit" variant={"outline"}>
              {t("Common.no")}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
