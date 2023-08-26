import React from "react";
import {
	Container,
	Box,
	Text,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
} from "@chakra-ui/react";

import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Homepage = () => {
	const history = useHistory();

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("userInfo"));

		if (user) {
			history.push("/chats");
		}
	}, [history]);

	return (
		<Container maxW="xl" centerContent>
			<Box
				d="flex"
				justify-content="center"
				p={3}
				bg={"white"}
				w="100%"
				margin="40px 0 15px 0"
				borderRadius="lg"
				borderWidth="1px"
				textAlign={"center"}
			>
				<Text fontSize="3xl" fontFamily="Satisfy">
					ChatFusion
				</Text>
			</Box>
			<Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
				<Tabs variant="soft-rounded">
					<TabList mb="1em">
						<Tab width="50%">Login</Tab>
						<Tab width="50%">Sign Up</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>{<Login />}</TabPanel>
						<TabPanel>
							<Signup />
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Box>
		</Container>
	);
};

export default Homepage;
