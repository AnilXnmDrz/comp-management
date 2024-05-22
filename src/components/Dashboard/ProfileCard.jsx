/* eslint-disable react/prop-types */
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoIcon from "@mui/icons-material/Info";

const ProfileCard = ({ items, sector }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: 500, margin: "auto", backgroundColor: "#ddd" }}
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              {sector}
              <IconButton>
                {" "}
                <InfoIcon />{" "}
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              <TableCell colSpan={3}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell>{item.name}</TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </AccordionSummary>
                  <AccordionDetails>
                    {/* <Typography>{item.description}</Typography> */}
                    {Object.entries(item).map(([key, value]) => (
                      <div key={key}>
                        <strong>{key}: </strong>
                        <span>{value}</span>
                      </div>
                    ))}
                  </AccordionDetails>
                </Accordion>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProfileCard;
