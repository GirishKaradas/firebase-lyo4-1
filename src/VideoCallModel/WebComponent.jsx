import Webcam from "react-webcam";

function WebComponent() {
    const videoConstraints = {
      facingMode: "user"
    };
    return (
        <div>
            <Webcam videoConstraints={videoConstraints} />
        </div>
    )
}

export default WebComponent
