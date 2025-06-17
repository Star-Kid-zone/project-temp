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
import EditMenuModal from "./Editmenu";
import DeleteMenuModal from "./Deletemenu";

function Listmenu() {
    const [menuData, setMenuData] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteMenuId, setDeleteMenuId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMenuData();
    }, []);

    const fetchMenuData = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            const response = await axios.get(
                "http://127.0.0.1:8082/api/menu/user",
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );

            setMenuData(response.data.data);
        } catch (error) {
            console.error(
                "Error fetching menu data:",
                error.response?.data || error.message,
            );
        }
    };

    const openEditModal = (menu) => {
        setSelectedMenu(menu);
        setEditModalOpen(true);
    };

    const closeEditModal = () => {
        setEditModalOpen(false);
        setSelectedMenu(null);
    };

    const openDeleteModal = (menuId) => {
        setDeleteMenuId(menuId);
        setDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
        setDeleteMenuId(null);
    };

    const columns = [
        {
            accessorKey: "item",
            header: "Item",
            cell: ({ row }) => <div>{row.original.item}</div>,
        },
        {
            accessorKey: "category",
            header: "Category",
            cell: ({ row }) => <div>{row.original.category}</div>,
        },
        {
            accessorKey: "type",
            header: "Type",
            cell: ({ row }) => <div>{row.original.type}</div>,
        },
        {
            accessorKey: "price",
            header: "Price",
            cell: ({ row }) => <div>${row.original.price}</div>,
        },
        {
            accessorKey: "availability",
            header: "Availability",
            cell: ({ row }) => (
                <div>
                    {row.original.availability ? "Available" : "Unavailable"}
                </div>
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
                    <DropdownMenuContent
                        align="end"
                        className="bg-white shadow-md p-2 rounded-md"
                    >
                        <DropdownMenuLabel className="text-center text-base">
                            Actions
                        </DropdownMenuLabel>
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
        data: menuData,
        columns,
        initialState: { pagination: { pageSize: 5 } },
        getCoreRowModel: getCoreRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div className="p-4 my-6">
            <h1 className="font-semibold text-2xl text-green-700">Menu</h1>

            <div className="mt-4 flex items-center justify-between">
                <input
                    value={globalFilter ?? ""}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    type="search"
                    placeholder="Search menu"
                    className="p-2 border w-full md:w-96 border-gray-300 rounded-lg outline-none"
                />
                <button
                    className="bg-green-600 text-white p-2 rounded-lg"
                    onClick={() => navigate("/admin/addmenu")}
                >
                    Add Menu Item
                </button>
            </div>

            <div className="overflow-x-auto mt-6">
                <table className="w-full text-sm border border-gray-300 rounded-lg">
                    <thead className="bg-green-100">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="p-3 text-gray-700"
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext(),
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr
                                key={row.id}
                                className="border-b hover:bg-green-50 text-center"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="p-3">
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {deleteModalOpen && (
                <DeleteMenuModal
                    isOpen={deleteModalOpen}
                    onClose={closeDeleteModal}
                    menuId={deleteMenuId}
                    onDelete={fetchMenuData}
                />
            )}

            {editModalOpen && (
                <EditMenuModal
                    isOpen={editModalOpen}
                    onClose={closeEditModal}
                    menu={selectedMenu}
                    onUpdate={fetchMenuData}
                />
            )}
        </div>
    );
}

export default Listmenu;
