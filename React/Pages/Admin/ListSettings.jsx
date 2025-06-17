import { useEffect, useState } from "react";
import axios from "axios";
import { useReactTable, getCoreRowModel, flexRender, getFilteredRowModel, getPaginationRowModel } from "@tanstack/react-table";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { PiPencilSimpleBold } from "react-icons/pi";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import EditSettingModal from "./EditSetting"; 

function ListSettings() {
    const [settings, setSettings] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editSetting, setEditSetting] = useState(null);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://127.0.0.1:8082/api/settings", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSettings(response.data.data);
        } catch (error) {
            console.error("Error fetching settings:", error.response?.data || error.message);
        }
    };

    const openEditModal = (setting) => {
        setEditSetting(setting);
        setEditModalOpen(true);
    };

    const closeEditModal = () => {
        setEditModalOpen(false);
        setEditSetting(null);
    };

    const columns = [
        { accessorKey: "user_id", header: "User ID" },
        { accessorKey: "theme_colour", header: "Theme Color" },
        { accessorKey: "menu_theme", header: "Menu Theme" },
        ...["menubtn_status", "paybtn_status", "reviewbtn_status", "special_offerstatus"].map((field) => ({
            accessorKey: field,
            header: field.replace("_", " ").toUpperCase(),
            cell: ({ row }) => (
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${row.original[field] ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                    {row.original[field] ? "Active" : "Inactive"}
                </span>
            ),
        })),
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
                        <DropdownMenuItem className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer" onClick={() => openEditModal(row.original)}>
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
        data: settings,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div className="p-4 my-6">
            <h1 className="font-semibold text-2xl text-green-700">Settings</h1>

            <div className="mt-4 flex items-center justify-between">
                <input
                    value={globalFilter ?? ""}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    type="search"
                    placeholder="Search settings"
                    className="p-2 border w-full md:w-96 border-gray-300 rounded-lg outline-none"
                />
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

            {editModalOpen && <EditSettingModal isOpen={editModalOpen} onClose={closeEditModal} settingData={editSetting} onSave={fetchSettings} />}
        </div>
    );
}

export default ListSettings;
