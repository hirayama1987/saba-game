import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from "@material-ui/core";
import { Twitter } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  title: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  text: {
    margin: theme.spacing(2),
    textAlign: "center",
  },
  actions: {
    justifyContent: "center",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const Modal = ({ visible, onClose, text, shareUrl }) => {
  const classes = useStyles();

  return (
    <Dialog open={visible} onClose={onClose}>
      <DialogTitle className={classes.title}>{text}</DialogTitle>
      <DialogContent>
        <Typography className={classes.text}>スコア: {text === "CLEAR" ? "5/5" : "0/5"}</Typography>
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button className={classes.button} variant="contained" color="primary" onClick={onClose}>
          RETRY
        </Button>
        {shareUrl && (
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            startIcon={<Twitter />}
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
              shareUrl
            )}&hashtags=鯖ゲー`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Share
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
