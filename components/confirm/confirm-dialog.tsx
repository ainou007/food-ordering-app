import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type ConfirmDialogProps = {
  onConfirm: () => void;
  onCancel: () => void;
  open: boolean;
  title?: string;
  description?: string;
};

const ConfirmDialog = ({ onConfirm, onCancel, open, title, description }: ConfirmDialogProps) => {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px]" hiddenCloseButton>
        <DialogHeader>
          <DialogTitle> {title ?? "Confirmation"} </DialogTitle>
          <DialogDescription> {description ?? "Voulez-vous vraiment effectuer cette action ?"} </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit" onClick={onConfirm}>
            Oui
          </Button>
          <Button onClick={onCancel} type="submit" variant={"outline"}>
            Anuler
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
