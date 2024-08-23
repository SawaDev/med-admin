import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { SheetType } from '@/types/Other.type'
import { FC } from 'react'

const DeleteServiceDialog: FC<SheetType> = ({ open, setOpen }) => {



  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Xizmatni o'chirish</DialogTitle>
          <DialogDescription>Ushbu xizmatning ma'lumotlari o'chirilgandan so'ng uni qayta tiklab bo'lmaydi!</DialogDescription>
          <div className='flex items-center justify-end gap-3 mt-3'>
            <Button variant={"outline"} onClick={() => setOpen(false)}>
              Bekor qilish
            </Button>
            <Button variant={"destructive"}>
              O'chirish
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteServiceDialog