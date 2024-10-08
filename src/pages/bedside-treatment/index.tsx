import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ban, PlusCircle } from "lucide-react";
import { useState } from "react";
import DeleteServiceDialog from "./delete-service";
import useTherapies from "@/hooks/useTherapies";
import { useSearchParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import AttachServiceDialog from "../patients/attach-service";
import { DataTablePagination } from "@/components/ui/pagination";

const BedsideTreatment = () => {
  const [add, setAdd] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<number | undefined>();

  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
    size: "50",
  });

  const page = parseInt(searchParams.get("page") || "1");
  const size = parseInt(searchParams.get("size") || "10");

  const { getTherapiesQuery } = useTherapies();
  const { data, isLoading, isError } = getTherapiesQuery({
    page,
    size,
    bedside_treatment: true,
  });

  const renderAddDialog = () => (
    <AttachServiceDialog open={add} setOpen={setAdd} />
  );

  if (isLoading) {
    return (
      <div className="w-full h-full space-y-2">
        {Array.from({ length: 12 }).map((_, index) => (
          <Skeleton className="h-7" key={index} />
        ))}
      </div>
    );
  }

  return (
    <Card className="m-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Yotib davolanish</CardTitle>
        </div>
        <div>
          <Button onClick={() => setAdd(true)} variant={"outline"}>
            <PlusCircle className="w-4 h-4 mr-1" />
            Bemorni xonaga biriktirish
          </Button>
        </div>
      </CardHeader>
      <CardContent className="border m-2 rounded-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ismi</TableHead>
              <TableHead>To'lov</TableHead>
              <TableHead className="sr-only">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!isError && data?.data.content ? (
              <>
                {data.data.content.map((d) => (
                  <TableRow>
                    <TableCell>{d.patient_name}</TableCell>
                    <TableCell>{d.price_in_sum}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Ban
                          onClick={() => setDeleteModal(d.id)}
                          className="w-6 h-6 cursor-pointer text-red-300 border border-red-400 p-1 rounded-sm"
                        />
                        
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <TableRow>
                <TableCell colSpan={99}>Hech narsa yo'q</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <DataTablePagination
          size={size}
          page={page}
          total_pages={data?.data.total_pages}
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
      {renderAddDialog()}
      <DeleteServiceDialog
        open={!!deleteModal}
        setOpen={() => setDeleteModal(undefined)}
        id={deleteModal}
      />
    </Card>
  );
};

export default BedsideTreatment;
