import classes from "./messagebox.module.css";
function MessageBox({ title, text, actions }) {
	return (
		<div className={classes.messagebox}>
			<div className={classes.msgTitle}>{title}</div>
			<div className={classes.msgContent}>{text}</div>
			<div className={classes.msgButtons}>
				{actions.map((action) => {
					return (
						<div
							key={action.name}
							className={classes.msgBtn}
							onClick={action.callback}
						>
							<span>{action.name}</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}
export default MessageBox;
