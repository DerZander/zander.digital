import {Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography,} from "@mui/material";
import {useState} from "react";
import skills from "../data/skills.json";

import CropDinIcon from '@mui/icons-material/CropDin';
import {AccountTree as AccountTreeIcon, Build as BuildIcon, Cloud as CloudIcon, Code as CodeIcon, ExpandMore as ExpandMoreIcon, Storage as StorageIcon, Terminal as TerminalIcon,} from "@mui/icons-material";

const skillIcon = (icon) => {
    switch (icon) {
        case "Code":
            return <CodeIcon/>;
        case "CropDinIcon":
            return <CropDinIcon/>;
        case "StorageIcon":
            return <StorageIcon/>;
        case "ExpandMoreIcon":
            return <ExpandMoreIcon/>;
        case "BuildIcon":
            return <BuildIcon/>;
        case "TerminalIcon":
            return <TerminalIcon/>;
        case "CloudIcon":
            return <CloudIcon/>;
        case "Module":
            return <AccountTreeIcon/>;
        default:
            return <CodeIcon/>;
    }
}

function FlippingSkillCard({skill}) {
    const [flipped, setFlipped] = useState(false);

    return (
        <Box
            sx={{
                perspective: "1000px",
                width: "220px",
                height: "180px",
                margin: "10px"
            }}
            onClick={() => setFlipped(!flipped)}
        >
            <Box
                sx={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    transformStyle: "preserve-3d",
                    transition: "transform 0.8s",
                    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)"
                }}
            >
                {/* Front Side */}
                <Card
                    sx={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        backfaceVisibility: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        bgcolor: skill.color,
                        color: "#fff",
                        borderRadius: 3,
                        padding: 1
                    }}
                >
                    <CardContent sx={{display: "flex", flexDirection: "column", alignItems: "center", padding: "8px !important"}}>
                        <Avatar sx={{bgcolor: "#fff", color: skill.color, mb: 1}}>
                            {skillIcon(skill.icon)}
                        </Avatar>
                        <Typography variant="h6" textAlign="center">{skill.name}</Typography>
                    </CardContent>
                </Card>

                {/* Back Side */}
                <Card
                    sx={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        bgcolor: "#f5f5f5",
                        borderRadius: 3,
                        padding: 1
                    }}
                >
                    <CardContent sx={{padding: "8px !important"}}>
                        <Typography variant="subtitle1" mb={0.5}>{skill.name}</Typography>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mt={0.5} mb={0.5}>
                            <Typography variant="caption">Seit: {skill.since}</Typography>
                            <Typography variant="caption" color="text.secondary">{skill.level}%</Typography>
                        </Box>
                        <LinearProgress
                            variant="determinate"
                            value={skill.level}
                            sx={{
                                height: 8, borderRadius: 4, "& .MuiLinearProgress-bar": {
                                    backgroundColor: skill.color,
                                },
                            }}
                        />
                        {skill.projects.length > 0 && (
                            <>
                                <Typography variant="caption" mt={0.5}>Projekte: <br/></Typography>
                                {skill.projects.map((project, i) => (
                                    <Typography key={i} variant="caption">- {project}</Typography>
                                ))}
                            </>
                        )}
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}

function SkillGridPage() {
    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom>
                🛠 Meine Skills
            </Typography>
            <Grid container spacing={1} justifyContent="center">
                {skills.map((skill, index) => (
                    <Grid item xs={6} sm={4} md={3} key={index} display="flex" justifyContent="center">
                        <FlippingSkillCard skill={skill} index={index}/>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default function SkillPage() {
    return (
        <SkillGridPage/>
    );
}