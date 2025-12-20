import axios from "axios";
import ImageUpload from "../components/ImageUpload";

const Dashboard = () => {

    const handleUploadSuccess = async (img) => {
        try {
            await axios.post(
                "http://localhost:8000/api/photos",
                {
                    title: "New Photo",
                    imageUrl: img.url,
                    imageId: img.fileId,
                    width: img.width,
                    height: img.height,
                    size: img.size,
                    format: img.fileType
                },
                { withCredentials: true }
            );

            alert("Photo uploaded & saved");

        } catch (err) {
            console.error(err);
            alert("Failed to save photo");
        }
    };

    return (
        <div>
            <h2>Upload Image</h2>
            <ImageUpload onUploadSuccess={handleUploadSuccess} />
        </div>
    );
};

export default Dashboard;
