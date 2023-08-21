import { useState } from "react";
import React from "react";
import {
	FormControl,
	FormLabel,
	VStack,
	Input,
	InputGroup,
	InputRightElement,
	Button,
} from "@chakra-ui/react";

const Login = () => {
	const [show, setShow] = useState(false);
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const handleClick = () => setShow(!show);
	const submtHandler = () => {};
	return (
		<VStack spacing="5px" color="black">
			<FormControl id="first-name" isRequired>
				<FormLabel>Email</FormLabel>
				<Input
					placeholder="Enter your Email"
					onChange={(e) => setEmail(e.target.value)}
				/>
			</FormControl>
			<FormControl id="first-name" isRequired>
				<FormLabel>Password</FormLabel>
				<InputGroup>
					<Input
						type={show ? "text" : "password"}
						placeholder="Enter your Password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<InputRightElement width="4.5rem">
						<Button h="1.75rem" size="sm" onClick={handleClick}>
							{show ? "Hide" : "Show"}
						</Button>
					</InputRightElement>
				</InputGroup>
			</FormControl>
			<Button
				colorScheme="teal"
				width="100%"
				style={{ marginTop: 15 }}
				onclick={submtHandler}
			>
				Login
			</Button>
			<Button
				colorScheme="red"
				variant={"solid"}
				width="100%"
				style={{ marginTop: 15 }}
				onClick={() => {
					setEmail("guest@example.com");
					setPassword("123456");
				}}
			>
				Get Guest User Credentials
			</Button>
		</VStack>
	);
};

export default Login;
