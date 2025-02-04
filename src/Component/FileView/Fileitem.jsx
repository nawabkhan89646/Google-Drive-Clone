import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import GetAppIcon from "@mui/icons-material/GetApp";
import PropTypes from "prop-types";

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const FileItem = ({ caption, timestamp, fileUrl, size }) => {
  // Format the file date using the timestamp
  const fileDate = `${timestamp?.toDate().getDate()} ${
    monthNames[timestamp?.toDate().getMonth()]
  } ${timestamp?.toDate().getFullYear()}`;

  // Convert file size to a readable format
  const getReadableFileSizeString = (fileSizeInBytes) => {
    let i = -1;
    const byteUnits = [" kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    do {
      fileSizeInBytes = fileSizeInBytes / 1024;
      i++;
    } while (fileSizeInBytes > 1024);
    return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
  };

  // Handle file download
  const handleDownload = (e) => {
    e.preventDefault();
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = caption;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fileItem p-4 hover:bg-gray-100 rounded-md flex items-center justify-between">
      <a
        href={fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center no-underline"
      >
        <div className="fileItem--left flex items-center">
          <InsertDriveFileIcon
            sx={{ color: "blue" }}
            className="text-blue-500 mr-2"
          />
          <p className="text-gray-700">{caption}</p>
        </div>
        <div className="fileView__titles--right flex-1 flex justify-end space-x-16">
          <GetAppIcon
            sx={{ color: "blue", cursor: "pointer" }}
            className="text-blue-500 cursor-pointer"
            onClick={handleDownload}
          />
          <p className="flex-shrink-0">{fileDate}</p>
          <p className="flex-shrink-0">{getReadableFileSizeString(size)}</p>
        </div>
      </a>
    </div>
  );
};

FileItem.propTypes = {
  caption: PropTypes.string.isRequired,
  timestamp: PropTypes.object.isRequired, // Should be a Firestore Timestamp object
  fileUrl: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

export default FileItem;
