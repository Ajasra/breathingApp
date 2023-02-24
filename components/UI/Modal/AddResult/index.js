import {
	Modal,
	Title,
	TypographyStylesProvider,
	Center,
	Text,
	Container,
	Group,
	Button, TextInput ,
} from "@mantine/core";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useContext, useState } from "react";
import { UserContext, UserDispatchContext } from "@components/User/UserContext";
import {SaveSession} from "@utils/api";

export default function ModalAddResult({ opened, setOpened }) {

	const userDetails = useContext(UserContext);
	const setUserDetails = useContext(UserDispatchContext);
	
	const [date, onChange] = useState(new Date());
	const [value, setValue] = useState(null);
	const [error, setError] = useState("");
	
	function writeToDatabase(){
		
		if(value !== null){
			
			if(value.split(',').length < 2){
				setError("Please enter at least two values");
				return;
			}
			
			// check if first value number
			if(isNaN(value.split(',')[0])){
				setError("Please enter a number");
				return;
			}
			
			// get average of the number from the sting of values separated by comma like "10,13,23.4"
			const average = value.split(',').reduce((a, b) => parseFloat(a) + parseFloat(b)) / value.split(',').length;
			// convert string of number into array
			const rounds = value.split(',').map((round) => parseFloat(round));
		
			const session = { settings: 0, init: false }
			SaveSession(rounds, session, average, userDetails.userId)
			
			setOpened(false);
		}else{
			setError("Please enter a value");
		}
	}
	
	return (
		<>
			<Modal
				radius="md"
				centered
				withCloseButton={false}
				opened={opened}
				onClose={() => setOpened(false)}
				size="xl"
			>
				<TypographyStylesProvider>
					<Title order={1} color="cyan.7">
                        Add Result
					</Title>
					
					<Text size="lg">
						Here you can manually add your result in the format of
						<span className="selected-text"> 95, 100, 125, 130 </span>
						(seconds separated by comma for each round.
					</Text>
					<br />
					<TextInput
						placeholder="95, 100, 125, 130"
						onChange={(val) => {
							setValue(val.currentTarget.value);
						}}
						error={error}
					/>
					<br />
					{/*<DatePicker value={date} onChange={onChange} />;*/}
					<Button
						onClick={() => {
							writeToDatabase();
						}}
					>
						SAVE
					</Button>
				</TypographyStylesProvider>
				<Container className="controls">
					<Center className="btn">
						<Cross1Icon
							className="svg-icon"
							onClick={() => {
								setOpened(false);
							}}
						/>
					</Center>
				</Container>
			</Modal>
			
			<Group position="center" hidden>
				<Button onClick={() => setOpened(true)}>Open Modal</Button>
			</Group>
		</>
	);
}
