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
import EditReviewModal from "./Editreview";
import DeleteReviewModal from "./Deletereview";
import { QRCodeCanvas } from "qrcode.react"; // Import QR Code component

function ListReview() {
    const [reviews, setReviews] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteReviewId, setDeleteReviewId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            const response = await axios.get(
                "http://127.0.0.1:8082/api/reviews/user",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setReviews(response.data.data);
        } catch (error) {
            console.error(
                "Error fetching reviews:",
                error.response?.data || error.message
            );
        }
    };

    const openEditModal = (review) => {
        setSelectedReview(review);
        setEditModalOpen(true);
    };

    const closeEditModal = () => {
        setEditModalOpen(false);
        setSelectedReview(null);
    };

    const openDeleteModal = (reviewId) => {
        setDeleteReviewId(reviewId);
        setDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
        setDeleteReviewId(null);
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
            accessorKey: "review_link",
            header: "Review Link",
            cell: ({ row }) => {
                const link = row.original.review_link;
                const displayText =
                    link.length > 20 ? `${link.substring(0, 20)}...` : link;
        
                return (
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 underline"
                        title={link} // Shows full link on hover
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
                row.original.review_link ? (
                    <QRCodeCanvas value={row.original.review_link} size={50} />
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
        data: reviews,
        columns,
        initialState: { pagination: { pageSize: 5 } },
        getCoreRowModel: getCoreRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div className="p-4 my-6">
            <h1 className="font-semibold text-2xl text-green-700">Reviews</h1>

            {/* Search & Add Review */}
            <div className="mt-4 flex items-center justify-between">
                <input
                    value={globalFilter ?? ""}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    type="search"
                    placeholder="Search reviews"
                    className="p-2 border w-full md:w-96 border-gray-300 rounded-lg outline-none"
                />
                <button
                    className="bg-green-600 text-white p-2 rounded-lg"
                    onClick={() => navigate("/admin/addreview")}
                >
                    Add Review
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
                <DeleteReviewModal
                    isOpen={deleteModalOpen}
                    onClose={closeDeleteModal}
                    reviewId={deleteReviewId}
                    onDelete={fetchReviews}
                />
            )}

            {editModalOpen && (
                <EditReviewModal
                    isOpen={editModalOpen}
                    onClose={closeEditModal}
                    review={selectedReview}
                    onUpdate={fetchReviews}
                />
            )}
        </div>
    );
}

export default ListReview;
