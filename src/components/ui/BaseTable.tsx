'use client';

import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';
import "../../style/basetable.css";

type CommonTableProps<TData> = {
  data: TData[];
  columns: ColumnDef<TData, any>[];
};

export default function CommonTable<TData>({ data, columns }: CommonTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="table-responsive">
      <table className="table table-hover table-bordered">
        <thead className="thead-light">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


// 'use client';

// import React from 'react';
// import {
//   useReactTable,
//   getCoreRowModel,
//   flexRender,
//   ColumnDef,
// } from '@tanstack/react-table';
// import { useRouter } from 'next/navigation';
// import { Pagination } from 'react-bootstrap';
// import "../../style/basetable.css";
// import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";

// type CommonTableProps<TData extends { id?: string }> = {
//   data: TData[];
//   columns: ColumnDef<TData, any>[];
//   totalResults: number;
//   currentResults: number;
// };

// export default function CommonTable<TData extends { id?: string }>({
//   data,
//   columns,
//   totalResults,
//   currentResults,
// }: CommonTableProps<TData>) {
//   const router = useRouter();

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   });

//   const handleRowClick = (id?: string) => {
//     if (id) router.push(`/patients/${id}`);
//   };

//   return (
//     <div className="table-responsive">
//       <table className="table table-hover table-bordered">
//         <thead className="thead-light">
//           {table.getHeaderGroups().map(headerGroup => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map(header => (
//                 <th key={header.id}>
//                   {flexRender(header.column.columnDef.header, header.getContext())}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {table.getRowModel().rows.map(row => {
//             const id = (row.original as { id?: string }).id;
//             return (
//               <tr
//                 key={row.id}
//                 onClick={() => handleRowClick(id)}
//                 style={{ cursor: id ? 'pointer' : 'default' }}
//               >
//                 {row.getVisibleCells().map(cell => (
//                   <td key={cell.id}>
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </td>
//                 ))}
//               </tr>
//             );
//           })}

//           {/* Pagination Row Inside Table */}
//           <tr className="pagination-row">
//             <td colSpan={columns.length}>
//               <div className="d-flex justify-content-between align-items-center flex-wrap">
//                 <small className="text-muted pagination-results">
//                   Showing {currentResults} of {totalResults} results
//                 </small>
//                 <Pagination size="sm" className="mb-0 custom-pagination">
//                   <Pagination.Prev disabled>
//                     <ChevronLeft className='me-3' size={14} /><span className='me-3'>previous</span>
//                   </Pagination.Prev>
//                   {[1, 2, 3, 4, 5].map((p) => (
//                     <Pagination.Item key={p} active={p === 5}>
//                       {p}
//                     </Pagination.Item>
//                   ))}
//                   <Pagination.Ellipsis disabled />
//                   <Pagination.Item>99</Pagination.Item>
//                   <Pagination.Next>
//                     <span className='me-2 ms-2'>Next</span> <ChevronRight className='me-3' size={14} />
//                   </Pagination.Next>
//                 </Pagination>
//               </div>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }


// 'use client';

// import React from 'react';
// import {
//   useReactTable,
//   getCoreRowModel,
//   flexRender,
//   ColumnDef,
// } from '@tanstack/react-table';
// import { useRouter } from 'next/navigation';
// import { Pagination } from 'react-bootstrap';
// import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
// import "../../style/basetable.css";

// type CommonTableProps<TData extends { id: string }> = {
//   data: TData[];
//   columns: ColumnDef<TData, any>[];
//   totalResults: number;
//   currentResults: number;
// };

// export default function CommonTable<TData extends { id: string }>({
//   data,
//   columns,
//   totalResults,
//   currentResults,
// }: CommonTableProps<TData>) {
//   const router = useRouter();

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   });

//   const handleRowClick = (id: string) => {
//     router.push(`/patients/${id}`);
//   };

//   return (
//     <div className="table-responsive">
//       <table className="table table-hover table-bordered">
//         <thead className="thead-light">
//           {table.getHeaderGroups().map(headerGroup => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map(header => (
//                 <th key={header.id}>
//                   {flexRender(header.column.columnDef.header, header.getContext())}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>

//         <tbody>
//           {table.getRowModel().rows.map(row => {
//             const id = row.original.id;

//             return (
//               <tr
//                 key={row.id}
//                 onClick={() => handleRowClick(id)}
//                 style={{ cursor: 'pointer' }}
//               >
//                 {row.getVisibleCells().map(cell => (
//                   <td key={cell.id}>
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </td>
//                 ))}
//               </tr>
//             );
//           })}

//           {/* Pagination Row Inside Table */}
//           <tr className="pagination-row">
//             <td colSpan={columns.length}>
//               <div className="d-flex justify-content-between align-items-center flex-wrap">
//                 <small className="pagination-results">
//                   Showing {currentResults} of {totalResults} results
//                 </small>
//                 <Pagination size="sm" className="mb-0 custom-pagination">
//                   <Pagination.Prev disabled>
//                     <ChevronLeft className='me-3' size={14} /><span className='me-3'>previous</span>
//                   </Pagination.Prev>
//                   {[1, 2, 3, 4, 5].map((p) => (
//                     <Pagination.Item key={p} active={p === 1}>
//                       {p}
//                     </Pagination.Item>
//                   ))}
//                   <Pagination.Ellipsis disabled />
//                   <Pagination.Item>99</Pagination.Item>
//                   <Pagination.Next>
//                     <span className='me-2 ms-3'>Next</span> <ChevronRight className='me-3' size={14} />
//                   </Pagination.Next>
//                 </Pagination>
//               </div>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }
