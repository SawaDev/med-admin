import TableComponent from "@/components/table";
import { serviceColumns } from "./columns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import AddDialog from "./add-dialog";
import DeleteServiceDialog from "./delete-service";
import useTherapyTypes from "@/hooks/useTherapyTypes";
import { TherapyType } from "@/types/TherapyType.type";

const Services = () => {
  const [add, setAdd] = useState<boolean>(false);
  const [edit, setEdit] = useState<TherapyType | undefined>();
  const [deleteModal, setDeleteModal] = useState<number | undefined>();

  const { getAllTherapyTypesQuery } = useTherapyTypes();
  const { data, isLoading, isError } = getAllTherapyTypesQuery();

  const therapyData = data?.data ?? [];

  const renderAddDialog = () => <AddDialog open={add} setOpen={setAdd} />;

  const renderEditDialog = () => (
    <AddDialog open={!!edit} setOpen={() => setEdit(undefined)} isEdit={edit} />
  );

  return (
    <Card className="m-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Xizmatlar</CardTitle>
          <CardDescription>
            Xizmatlar va ular haqidagi ma'lumotlar
          </CardDescription>
        </div>
        <div>
          <Button onClick={() => setAdd(true)} variant={"outline"}>
            <PlusCircle className="w-4 h-4 mr-1" />
            Xizmat qo'shish
          </Button>
        </div>
      </CardHeader>
      <CardContent className="border m-2 rounded-sm">
        {!isError && (
          <TableComponent
            isLoading={isLoading}
            data={therapyData}
            columns={serviceColumns(setEdit, setDeleteModal)}
          />
        )}
      </CardContent>

      {renderAddDialog()}
      {renderEditDialog()}
      
      <DeleteServiceDialog
        open={!!deleteModal}
        setOpen={() => setDeleteModal(undefined)}
      />
    </Card>
  );
};

export default Services;
