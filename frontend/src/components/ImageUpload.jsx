import { IKContext, IKUpload } from "imagekitio-react";
import axios from "axios";

const ImageUpload = ({ onUploadSuccess }) => {

    const authenticator = async () => {
        const res = await axios.get(
            "http://localhost:8000/api/imagekit/auth",
            { withCredentials: true }
        );
        return res.data;
    };

    return (
        <IKContext
            publicKey={import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY}
            urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
            authenticator={authenticator}
        >
            <IKUpload
                fileName="photo-editor-upload.png"
                onSuccess={(res) => {
                    console.log("Uploaded:", res);
                    onUploadSuccess(res);
                }}
                onError={(err) => console.error(err)}
            />
        </IKContext>
    );
};

export default ImageUpload;
