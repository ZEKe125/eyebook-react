import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { useDispatch } from "react-redux";
import {
	increment,
	decrement,
} from "../../features/ChooseBook/ChooseBookSlice";
import "./Carrusel.css";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
	{
		label: "The Daily Stoic",
		imgPath: "https://images-na.ssl-images-amazon.com/images/I/71l+BjaWMmL.jpg",
	},
	{
		label: "Alice in Wonderland",
		imgPath: "https://images-na.ssl-images-amazon.com/images/I/A1esmi-0sqL.jpg",
	},
	{
		label: "The Illiad",
		imgPath: "https://images-na.ssl-images-amazon.com/images/I/41Erm7Nt4tL.jpg",
	},
	{
		label: "Pride and Prejudice",
		imgPath: "https://images-na.ssl-images-amazon.com/images/I/71Q1tPupKjL.jpg",
	},

	{
		label: "A Tale of Two Cities",
		imgPath:
			"https://images-na.ssl-images-amazon.com/images/I/515NxJ8qepL._SX311_BO1,204,203,200_.jpg",
	},
];

function Carrusel() {
	const dispatch = useDispatch();
	const theme = useTheme();
	const [activeStep, setActiveStep] = React.useState(0);
	const maxSteps = images.length;

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		// dispatch(increment());
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
		// dispatch(decrement());
	};

	function handleBookNext() {
		dispatch(increment());
	}
	function handleBookBack() {
		dispatch(decrement());
	}

	// const handleStepChange = (step) => {
	//   setActiveStep(step)
	// };

	return (
		<div className="carrusel">
			<Box sx={{ maxWidth: "50%", maxHeight: "50%", alignContent: "center" }}>
				<Paper
					square
					elevation={12}
					sx={{
						display: "flex",
						alignItems: "center",
						height: 50,
						pl: 4,
						bgcolor: "background.default",
					}}>
					{images[activeStep].label}
				</Paper>
				<AutoPlaySwipeableViews
					// axis={theme.direction === "rtl" ? "x-reverse" : "x"}
					index={activeStep}
					// onChangeIndex={handleStepChange}
					enableMouseEvents>
					{images.map((step, index) => (
						<div key={step.label}>
							{Math.abs(activeStep - index) <= 2 ? (
								<Box
									component="img"
									sx={{
										overflow: "hidden",
										width: "90%",
										maxWidth: "100%",
									}}
									src={step.imgPath}
									alt={step.label}
								/>
							) : null}
						</div>
					))}
				</AutoPlaySwipeableViews>
				<Paper
					square
					elevation={12}
					sx={{
						//   display: 'flex',
						alignItems: "center",
						height: 50,
						pl: 2,
						bgcolor: "background.default",
					}}>
					<MobileStepper
						steps={maxSteps}
						position="static"
						activeStep={activeStep}
						nextButton={
							<Button
								id="nextBook"
								size="small"
								onClick={() => {
									handleNext();
									handleBookNext();
								}}
								disabled={activeStep === maxSteps - 1}>
								{" "}
								Next (Focus Right)
								{theme.direction === "rtl" ? (
									<KeyboardArrowLeft />
								) : (
									<KeyboardArrowRight />
								)}
							</Button>
						}
						backButton={
							<Button
								id="backBook"
								size="small"
								onClick={() => {
									handleBack();
									handleBookBack();
								}}
								disabled={activeStep === 0}>
								{theme.direction === "rtl" ? (
									<KeyboardArrowRight />
								) : (
									<KeyboardArrowLeft />
								)}
								Back (Focus Left)
							</Button>
						}
					/>
				</Paper>
			</Box>
		</div>
	);
}

export default Carrusel;
