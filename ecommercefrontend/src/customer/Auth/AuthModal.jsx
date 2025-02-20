import React from 'react'
import { Box, Modal, Typography } from "@mui/material";
import Register from './Register';
import { useLocation } from "react-router-dom";
import Login from './Login';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

// export default function AuthModal({ handleClose, open }) {
//   // const location = useLocation();
//   // const { auth } = useSelector((store) => store);
//   // useEffect(() => {
//   //   if (auth.user) handleClose();
//   // }, [auth.user]);
//   return (
//     <>
//     <Modal
//       open={open}
//       onClose={handleClose}
//       aria-labelledby="modal-modal-title"
//       aria-describedby="modal-modal-description"
//       size="large"
//     >
//       <Box className="rounded-md" sx={style}>
//       </Box>
//     </Modal>
    
//     </>
    
//   );
// }



const AuthModal = ({handleClose, open}) => {
  const location = useLocation();

  return (
    <div>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        
        {location.pathname === "/login" ? <Login /> : <Register />}
      </Box>
    </Modal>
    </div>
  )
}

export default AuthModal
