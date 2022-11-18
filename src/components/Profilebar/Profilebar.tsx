import React from "react";
import { Link } from "react-router-dom";
// style
import "./profilebar.scss";

const Profilebar = () => {
	return (
		<div className="profilebar">
			<Link className="profilebar__link link" to="/adverticement/add">
				<svg
					className="link__icon"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512">
					<path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
				</svg>
				<span className="link__text">Add</span>
			</Link>
		</div>
	);
};

export default Profilebar;
