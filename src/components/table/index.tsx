import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Skeleton } from "../ui/skeleton"

interface TableComponentProps<T> {
  data: T[],
  columns: ColumnDef<T, any>[],
  isLoading: boolean
}

const TableComponent = <T,>({ data, columns, isLoading }: TableComponentProps<T>) => {

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  if (isLoading) {
    return (
      <div className="flex flex-col gap-1 m-4">
        <Skeleton className="h-12 mb-2" />
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} className="h-10" />
        ))}
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id} colSpan={header.colSpan}>
                  <div className="w-full flex items-center justify-between pr-2 border-r-2">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                    }
                  </div>
                </TableHead>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={99}
              className="h-24 text-center"
            >
              Hech narsa yo'q.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table >
  )
}

export default TableComponent