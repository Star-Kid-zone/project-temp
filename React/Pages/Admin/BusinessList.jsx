import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiPencilSimpleBold } from "react-icons/pi";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import EditBusinessModal from "./EditBusiness";
import DeleteBusinessModal from "./DeleteBusiness";  // Import Delete Modal

function BusinessList() {
  const [businesses, setBusinesses] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteBusinessId, setDeleteBusinessId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBusinessData();
  }, []);

  const fetchBusinessData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get("http://127.0.0.1:8082/api/business/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBusinesses(response.data.data);
    } catch (error) {
      console.error("Error fetching business data:", error.response?.data || error.message);
    }
  };

  const openEditModal = (business) => {
    setSelectedBusiness(business);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedBusiness(null);
  };

  const openDeleteModal = (businessId) => {
    setDeleteBusinessId(businessId);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setDeleteBusinessId(null);
  };

  const formatSocialMedia = (socialMedia) => {
    if (!socialMedia || typeof socialMedia !== "object") return "-";
    return Object.entries(socialMedia).map(([platform, link]) => (
      <a key={platform} href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline mr-2">
        {platform}
      </a>
    ));
  };

  const columns = [
    {
      accessorKey: "business_name",
      header: "Business Name",
      cell: ({ row }) => <div>{row.original.business_name}</div>,
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => <div>{row.original.phone}</div>,
    },
    {
      accessorKey: "social_media",
      header: "Social Media",
      cell: ({ row }) => <div className="flex flex-wrap">{formatSocialMedia(row.original.social_media)}</div>,
    },
    {
      accessorKey: "merchant_id",
      header: "Merchant ID",
      cell: ({ row }) => <div>{row.original.merchant_id}</div>,
    },
    {
      accessorKey: "active",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            row.original.active ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {row.original.active ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 hover:bg-green-200 rounded-lg">
              <HiOutlineDotsVertical className="size-5 text-green-600" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white shadow-md p-2 rounded-md">
            <DropdownMenuLabel className="text-center text-base">Actions</DropdownMenuLabel>
            <DropdownMenuItem
              className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => openDeleteModal(row.original.id)}
            >
              <RiDeleteBin6Line className="size-5 text-red-500" />
              Delete
            </DropdownMenuItem>

            <DropdownMenuItem
              className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => openEditModal(row.original)}
            >
              <PiPencilSimpleBold className="size-5 text-green-600" />
              Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const table = useReactTable({
    state: { globalFilter },
    data: businesses,
    columns,
    initialState: { pagination: { pageSize: 5 } },
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-4 my-6">
      <h1 className="font-semibold text-2xl text-green-700">Businesses</h1>

      <div className="mt-4 flex items-center justify-between">
        <input
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          type="search"
          placeholder="Search business"
          className="p-2 border w-full md:w-96 border-gray-300 rounded-lg outline-none"
        />
        <button
          className="bg-green-600 text-white p-2 rounded-lg"
          onClick={() => navigate("/admin/addBusiness")}
        >
          Add Business
        </button>
      </div>

      <div className="overflow-x-auto mt-6">
        <table className="w-full text-sm border border-gray-300 rounded-lg">
          <thead className="bg-green-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="p-3 text-gray-700">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b hover:bg-green-50 text-center">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Business Modal */}
      {editModalOpen && (
        <EditBusinessModal
          isOpen={editModalOpen}
          onClose={closeEditModal}
          business={selectedBusiness}
          onUpdate={fetchBusinessData}
        />
      )}

      {/* Delete Business Modal */}
      {deleteModalOpen && (
        <DeleteBusinessModal
          isOpen={deleteModalOpen}
          onClose={closeDeleteModal}
          businessId={deleteBusinessId}
          onDelete={fetchBusinessData}
        />
      )}
    </div>
  );
}

export default BusinessList;
