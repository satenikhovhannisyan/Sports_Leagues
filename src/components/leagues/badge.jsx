import CardMedia from "@mui/material/CardMedia";

function Badge({ selectedBadgeUrl = "", }) {    
    
    return (
        <CardMedia
            component="img"
            image={selectedBadgeUrl}
            alt="Season badge"
            sx={{ objectFit: "contain" }}
            style={{
                maxWidth: "120px",
                maxHeight: "120px",
                objectFit: "contain",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                margin: "0 auto",
                display: "block",
            }}
        />
    );
}

export default Badge;