import { useState } from "react";
import axios from "axios";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

function EditBusinessModal({ isOpen, onClose, business, onUpdate }) {
    const [businessName, setBusinessName] = useState(business?.business_name || "");
    const [phone, setPhone] = useState(business?.phone || "");
    const [socialMedia, setSocialMedia] = useState(
        business?.social_media
            ? Object.entries(business.social_media).map(([platform, link]) => ({ platform, link }))
            : [{ platform: "", link: "" }]
    );
    const [active, setActive] = useState(business?.active || 0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    if (!isOpen) return null;

    const handleUpdate = async () => {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");

            // Convert socialMedia array back to object before sending to API
            const formattedSocialMedia = socialMedia.reduce((acc, { platform, link }) => {
                if (platform.trim() && link.trim()) {
                    acc[platform] = link;
                }
                return acc;
            }, {});

            await axios.put(
                `http://127.0.0.1:8082/api/business/${business.id}`,
                {
                    business_name: businessName,
                    phone,
                    social_media: formattedSocialMedia,
                    active,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            onUpdate();
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update business");
        } finally {
            setLoading(false);
        }
    };

    const handleSocialMediaChange = (index, key, value) => {
        setSocialMedia((prev) =>
            prev.map((item, i) => (i === index ? { ...item, [key]: value } : item))
        );
    };

    const addSocialMediaField = () => {
        setSocialMedia([...socialMedia, { platform: "", link: "" }]);
    };

    const removeSocialMediaField = (index) => {
        setSocialMedia((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
            <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Edit Business</h2>

                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                <label className="block text-sm font-medium mb-1">Business Name</label>
                <input
                    type="text"
                    className="w-full p-2 border rounded-md mb-3"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                />

                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                    type="text"
                    className="w-full p-2 border rounded-md mb-3"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <label className="block text-sm font-medium mb-1">Social Media Links</label>
                {socialMedia.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                        <input
                            type="text"
                            placeholder="Platform (e.g., Facebook)"
                            className="w-1/3 p-2 border rounded-md"
                            value={item.platform}
                            onChange={(e) => handleSocialMediaChange(index, "platform", e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="URL (e.g., http://facebook.com)"
                            className="w-2/3 p-2 border rounded-md"
                            value={item.link}
                            onChange={(e) => handleSocialMediaChange(index, "link", e.target.value)}
                        />
                        <button
                            onClick={() => removeSocialMediaField(index)}
                            className="p-2 text-red-500 hover:text-red-700"
                            disabled={socialMedia.length === 1}
                        >
                            <AiOutlineMinus />
                        </button>
                    </div>
                ))}
                <button
                    onClick={addSocialMediaField}
                    className="flex items-center gap-2 text-green-600 hover:text-green-800 mb-3"
                >
                    <AiOutlinePlus />
                    Add Social Media
                </button>

                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                    className="w-full p-2 border rounded-md mb-4"
                    value={active}
                    onChange={(e) => setActive(Number(e.target.value))}
                >
                    <option value={1}>Active</option>
                    <option value={0}>Inactive</option>
                </select>

                <div className="flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 border rounded-md">Cancel</button>
                    <button
                        onClick={handleUpdate}
                        className="px-4 py-2 bg-green-600 text-white rounded-md"
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditBusinessModal;
