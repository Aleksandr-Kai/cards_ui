import classes from "./messagebox.module.css";
const MessageBox = ({ text }) => {
	return (
		<div className={classes.container}>
			<p>{text}</p>
		</div>
	);
};

export default MessageBox;
