import { useState, useEffect } from "react";
import axios from "axios";

function EditSettingModal({ isOpen, onClose, settingData, onSave }) {
    const [formData, setFormData] = useState(settingData || {});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (settingData) {
            setFormData(settingData);
        }
    }, [settingData]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem("token");
            await axios.put(
                `http://127.0.0.1:8082/api/settings/${formData.id}`,
                formData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert("Setting updated successfully!");
            onSave(); 
            onClose();
        } catch (error) {
            console.error("Failed to update setting:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-lg font-bold mb-4">Edit Setting</h2>

                <form onSubmit={handleSubmit} className="grid gap-4">
                    <div>
                        <label className="block font-medium">User ID</label>
                        <input
                            type="text"
                            name="user_id"
                            value={formData.user_id || ""}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Theme Color</label>
                        <input
                            type="text"
                            name="theme_colour"
                            value={formData.theme_colour || ""}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Menu Theme</label>
                        <input
                            type="text"
                            name="menu_theme"
                            value={formData.menu_theme || ""}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>

                    {["menubtn_status", "paybtn_status", "reviewbtn_status", "special_offerstatus"].map((field) => (
                        <div key={field} className="flex justify-between items-center bg-gray-100 p-2 rounded-md">
                            <label className="font-medium">{field.replace("_", " ").toUpperCase()}</label>
                            <input type="checkbox" name={field} checked={formData[field] || false} onChange={handleChange} />
                        </div>
                    ))}

                    <div className="flex justify-end">
                        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                            {loading ? "Updating..." : "Update Setting"}
                        </button>
                    </div>
                </form>

                <button onClick={onClose} className="mt-4 text-red-500 underline">Cancel</button>
            </div>
        </div>
    );
}

export default EditSettingModal;
