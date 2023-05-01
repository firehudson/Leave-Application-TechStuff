import * as React from "react";
import Table from "@mui/joy/Table";
import data from "./data.json";
import Typography from "@mui/joy/Typography";
import Tooltip from "@mui/joy/Tooltip";
import Box from "@mui/joy/Box";
import AdjustIcon from "@mui/icons-material/Adjust";
import Chip from "@mui/joy/Chip";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import MoreVert from "@mui/icons-material/MoreVert";

const customTheme = extendTheme({
  fontFamily: "sans-serif,roboto",
  fontSize: 14,
  shadows: ["none"],
});

function LeaveApp() {
  const [empData, setEmpData] = React.useState(data);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedId, setSelectedId] = React.useState(0);
  const [approve, setApprove] = React.useState({
    text: "Approve",
    variant: "plain",
  });
  const [reject, setReject] = React.useState({
    text: "Reject",
    variant: "plain",
  });

  const open = Boolean(anchorEl);
  const handleClick = (event, id) => {
    setSelectedId(id);
    setAnchorEl(event.currentTarget);
  };

  // const handleCloseMenu= () => {
  //   setAnchorEl(null);
  // };

  const handleApprove = () => {
    reject.variant = "plain";
    if (approve.variant === "plain") {
      setApprove((prevState) => ({
        ...prevState,
        ["text"]: "Approve ?",
        ["variant"]: "solid",
      }));
    } else {
      handleStatusChange("Approved");

      setApprove((prevState) => ({
        ...prevState,
        ["text"]: "Approve",
        ["variant"]: "plain",
      }));
      setAnchorEl(null);
    }
  };
  const handleStatusChange = (status) => {
    empData.forEach((element) => {
      if (element.id === selectedId) {
        element.Status = status;
        if (status === "Approved") element.Color = "success";
        else element.Color = "danger";
      }
    });
    approve.text = "Approve";
    approve.variant = "plain";
    reject.text = "Reject";
    reject.variant = "plain";
  };
  const handleReject = () => {
    approve.variant = "plain";
    if (reject.variant === "plain") {
      setReject((prevState) => ({
        ...prevState,
        ["text"]: "Reject ?",
        ["variant"]: "solid",
      }));
    } else {
      handleStatusChange("Rejected");
      setReject((prevState) => ({
        ...prevState,
        ["text"]: "Reject",
        ["variant"]: "plain",
      }));
      setAnchorEl(null);
    }
  };

  return (
    <CssVarsProvider theme={customTheme}>
      <Table
        hoverRow
        sx={{ pt: 0, borderRadius: "sm", border: "1px solid #EBEBEF" }}
      >
        <thead>
          <tr>
            <th>Requester Name </th>
            <th>Leave Duration(Days)</th>
            <th>Leave Type</th>
            <th>Department</th>
            <th>Reason</th>
            <th align="center">Requested On</th>
            <th>Application Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {empData.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.RequesterName}</td>
              <td align="center">{employee.LeaveDuration}</td>
              <td>{employee.LeaveType}</td>
              <td>{employee.Department}</td>
              <td>
                <Tooltip
                  placement="bottom-end"
                  variant="outlined"
                  title={
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        maxWidth: 200,
                        justifyContent: "center",
                        p: 1,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          width: "100%",
                          mt: 1,
                        }}
                      >
                        <AdjustIcon color="success" />
                        <Box>
                          <Typography fontSize="sm" sx={{ mb: 1 }}>
                            {employee.Reason}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  }
                >
                  <Typography startDecorator={<AdjustIcon color="success" />}>
                    {employee.Reason.length > 19 ? (
                      <p>{employee.Reason.slice(0, 20) + "..."}</p>
                    ) : (
                      <p>{employee.Reason}</p>
                    )}
                  </Typography>
                </Tooltip>
              </td>
              <td align="center">{employee.RequestedOn}</td>
              <td>
                <Chip color={employee.Color} size="md">
                  {employee.Status}
                </Chip>
              </td>
              <td>
                <>
                  <IconButton
                    id="positioned-demo-button"
                    aria-controls={open ? "positioned-demo-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    variant="outlined"
                    color="neutral"
                    onClick={(event) => handleClick(event, employee.id)}
                  >
                    <MoreVert />
                  </IconButton>
                  <Menu
                    id="positioned-demo-menu"
                    anchorEl={anchorEl}
                    open={open}
                    // onClose={handleCloseMenu}
                    aria-labelledby="positioned-demo-button"
                    placement="bottom-end"
                    style={{
                      boxShadow: "none",
                      "--ListDivider-gap": 0,
                      width: "95px",
                    }}
                  >
                    <MenuItem
                      onClick={handleApprove}
                      color="success"
                      variant={approve.variant}
                    >
                      {approve.text}
                    </MenuItem>
                    <MenuItem
                      onClick={handleReject}
                      color="danger"
                      variant={reject.variant}
                    >
                      {reject.text}
                    </MenuItem>
                  </Menu>
                </>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </CssVarsProvider>
  );
}

export default LeaveApp;
