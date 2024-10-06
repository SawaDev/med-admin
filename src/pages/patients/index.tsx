import { Patient } from "@/types/Patient.type";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PenIcon, PlusCircle, Trash } from "lucide-react";
import { useState } from "react";
import AddDialog from "./add-dialog";
import DeletePatientDialog from "./delete-patient";
import AttachServiceDialog from "./attach-service";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate, useSearchParams } from "react-router-dom";
import usePatients from "@/hooks/usePatients";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTablePagination } from "@/components/ui/pagination";

const Patients = () => {
  const [add, setAdd] = useState<boolean>(false);
  const [addService, setAddService] = useState<boolean>(false);
  const [edit, setEdit] = useState<Patient | undefined>();
  const [deleteModal, setDeleteModal] = useState<number | undefined>();

  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
    size: "50",
  });

  const page = parseInt(searchParams.get("page") || "1");
  const size = parseInt(searchParams.get("size") || "10");

  const { getAllPatientsQuery } = usePatients();

  const {
    data: patients,
    isLoading: loadingPatients,
    isError: errorPatients,
  } = getAllPatientsQuery({
    size,
    page,
  });

  const navigate = useNavigate();

  const handleEdit = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    patient: Patient
  ) => {
    e.stopPropagation();
    setEdit(patient);
  };

  const handleDelete = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    id: number
  ) => {
    e.stopPropagation();
    setDeleteModal(id);
  };

  if (loadingPatients) {
    return (
      <div className="w-full h-full">
        <Skeleton className="w-full h-[400px]" />
      </div>
    );
  }

  if (errorPatients) {
    return "Patients error occured!";
  }

  return (
    <Card className="m-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Bemorlar</CardTitle>
          <CardDescription>
            Bemorlar va ular haqidagi ma'lumotlar
          </CardDescription>
        </div>
        <div className="space-x-2">
          <Button onClick={() => setAddService(true)} variant={"outline"}>
            <PlusCircle className="w-4 h-4 mr-1" />
            Xizmat biriktirish
          </Button>
          <Button onClick={() => setAdd(true)} variant={"outline"}>
            <PlusCircle className="w-4 h-4 mr-1" />
            Bemor qo'shish
          </Button>
        </div>
      </CardHeader>
      <CardContent className="border m-2 rounded-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <div className="w-full flex items-center justify-between pr-2 border-r-2">
                  Ism
                </div>
              </TableHead>
              <TableHead>
                <div className="w-full flex items-center justify-between pr-2 border-r-2">
                  Telefon raqami
                </div>
              </TableHead>
              <TableHead>
                <div className="w-full flex items-center justify-between pr-2 border-r-2">
                  Tug'ilgan Kun
                </div>
              </TableHead>
              <TableHead>
                <div className="w-full flex items-center justify-between pr-2 border-r-2">
                  Manzil
                </div>
              </TableHead>
              <TableHead className="sr-only">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients?.data.content && patients?.data.content.length ? (
              patients?.data.content.map((patient) => (
                <TableRow
                  key={patient.id}
                  onClick={() => navigate(`/patients/${patient.id}`)}
                >
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.phone_number}</TableCell>
                  <TableCell>{patient.birthdate}</TableCell>
                  <TableCell>{patient.address}</TableCell>
                  <TableCell>
                    <div className="flex gap-3 items-center">
                      <PenIcon
                        onClick={(e) => handleEdit(e, patient)}
                        className="w-6 h-6 cursor-pointer text-green-300 border border-green-400 p-1 rounded-sm"
                      />
                      <Trash
                        onClick={(e) => handleDelete(e, patient.id)}
                        className="w-6 h-6 cursor-pointer text-red-300 border border-red-400 p-1 rounded-sm"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={99} className="h-24 text-center">
                  Hech narsa yo'q.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <DataTablePagination
          size={size}
          page={page}
          total_pages={patients?.data.total_pages}
          handleSizeChange={(value) =>
            setSearchParams(() => ({ page: page.toString(), size: value }))
          }
          handlePageChange={(value) =>
            setSearchParams(() => ({
              page: value ? value.toString() : "1",
              size: size.toString(),
            }))
          }
        />
      </CardContent>
      {add && <AddDialog open={add} setOpen={() => setAdd(false)} />}
      {addService && (
        <AttachServiceDialog open={addService} setOpen={setAddService} />
      )}
      {edit && (
        <AddDialog
          open={!!edit}
          setOpen={() => setEdit(undefined)}
          data={edit}
        />
      )}
      {deleteModal && (
        <DeletePatientDialog
          open={deleteModal}
          setOpen={() => setDeleteModal(undefined)}
        />
      )}
    </Card>
  );
};

export default Patients;
