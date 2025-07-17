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
import { QRCodeCanvas } from "qrcode.react";
import EditPaymentModal from "./EditPaymentModal";
import DeletePaymentModal from "./DeletePaymentModal";

function ListPayment() {
    const [payments, setPayments] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deletePaymentId, setDeletePaymentId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            const response = await axios.get(
                "http://127.0.0.1:8082/api/payments/user",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setPayments(response.data.data);
        } catch (error) {
            console.error(
                "Error fetching payments:",
                error.response?.data || error.message
            );
        }
    };

    const openEditModal = (payment) => {
        setSelectedPayment(payment);
        setEditModalOpen(true);
    };

    const closeEditModal = () => {
        setEditModalOpen(false);
        setSelectedPayment(null);
    };

    const openDeleteModal = (paymentId) => {
        setDeletePaymentId(paymentId);
        setDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
        setDeletePaymentId(null);
    };

    const columns = [
        {
            accessorKey: "id",
            header: "ID",
            cell: ({ row }) => <div>{row.original.id}</div>,
        },
        {
            accessorKey: "user",
            header: "User",
            cell: ({ row }) => <div>{row.original.user?.name || "N/A"}</div>,
        },
        {
            accessorKey: "payment_link",
            header: "Payment Link",
            cell: ({ row }) => {
                const link = row.original.payment_link;
                const displayText =
                    link.length > 20 ? `${link.substring(0, 20)}...` : link;

                return (
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 underline"
                        title={link}
                    >
                        {displayText}
                    </a>
                );
            },
        },
        {
            accessorKey: "qr_code",
            header: "QR Code",
            cell: ({ row }) =>
                row.original.payment_link ? (
                    <QRCodeCanvas value={row.original.payment_link} size={50} />
                ) : (
                    <span>N/A</span>
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
        data: payments,
        columns,
        initialState: { pagination: { pageSize: 5 } },
        getCoreRowModel: getCoreRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div className="p-4 my-6">
            <h1 className="font-semibold text-2xl text-green-700">Payments</h1>

            {/* Search & Add Payment */}
            <div className="mt-4 flex items-center justify-between">
                <input
                    value={globalFilter ?? ""}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    type="search"
                    placeholder="Search payments"
                    className="p-2 border w-full md:w-96 border-gray-300 rounded-lg outline-none"
                />
                <button
                    className="bg-green-600 text-white p-2 rounded-lg"
                    onClick={() => navigate("/admin/addpayment")}
                >
                    Add Payment
                </button>
            </div>

            {/* Table */}
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
                                            header.getContext()
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
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modals */}
            {deleteModalOpen && (
                <DeletePaymentModal
                    isOpen={deleteModalOpen}
                    onClose={closeDeleteModal}
                    paymentId={deletePaymentId}
                    onDelete={fetchPayments}
                />
            )}

            {editModalOpen && (
                <EditPaymentModal
                    isOpen={editModalOpen}
                    onClose={closeEditModal}
                    payment={selectedPayment}
                    onUpdate={fetchPayments}
                />
            )}
        </div>
    );
}

export default ListPayment;
