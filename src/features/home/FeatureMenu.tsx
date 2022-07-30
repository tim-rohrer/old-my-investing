import { NestedMenuItem } from "mui-nested-menu"
import * as React from "react"
import { useDispatch } from "react-redux"

import MenuIcon from "@mui/icons-material/Menu"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"

import { AppDispatch } from "../../app/store"
import { fetchQuickenData } from "../investments/investmentsSlice"

export default function FeatureMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch: AppDispatch = useDispatch();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleImport = () => {
    handleClose()
    dispatch(fetchQuickenData())
  }

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >     
        <NestedMenuItem
          label="Quicken"
          parentMenuOpen={open}
        >
          <MenuItem onClick={handleImport}>Import Data</MenuItem>
        </NestedMenuItem>

      </Menu>
    </div>
  );
}

