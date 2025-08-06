import { CardMedia } from "@mui/material";

function Badge({ selectedBadgeUrl = "" }) {
    
    return (
        <CardMedia
            component="img"
            height="140"
            image={selectedBadgeUrl}
            alt="Season badge"
            sx={{ objectFit: "contain", bgcolor: "#f5f5f5" }}
        />
    );
}

export default Badge;