"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { Badge } from "@/components/ui/badge";

export const ProModal = () => {
    const proModal = useProModal();
    return(
        <div>
            <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
              <DialogContent>
                 <DialogHeader>
                    <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                       <div>
                        Upgrade to Genious
                        <Badge className="uppercase text-sm py-1">
                            Pro
                        </Badge>
                        </div>
                    </DialogTitle>
                 </DialogHeader>
             </DialogContent>
            </Dialog>
        </div>
    )
}