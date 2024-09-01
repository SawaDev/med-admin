import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { SheetType } from '@/types/Other.type'
import { FC } from 'react'

const CancelBookingDialog: FC<SheetType> = ({ open, setOpen }) => {

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bronni bekor qilish</DialogTitle>
          <DialogDescription>Siz haqiqatan ham bu bemorning bronini bekor qilmoqchimisiz</DialogDescription>
          <div className='flex items-center justify-end gap-3 mt-3'>
            <Button variant={"outline"} onClick={() => setOpen(false)}>
              Ortga
            </Button>
            <Button variant={"destructive"}>
              Bekor qilish
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default CancelBookingDialog