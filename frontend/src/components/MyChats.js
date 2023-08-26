import React, { useEffect } from "react";

import { ChatState } from "../Context/ChatProvider";
import { Toast, VStack } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { Box } from "@chakra-ui/react";

const MyChats = () => {
	const [loggedUser, setLoggedUser] = useState();
	const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

	const toast = useToast();
	const fecthChats = async () => {
		try {
			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};

			const { data } = await axios.get("/api/chat", config);
			setChats(data);
		} catch (error) {
			toast({
				title: "Something went wrong",
				status: "error",
				description: "Failed to load chats",
				duration: 5000,
				isClosable: true,
				position: "top-left",
			});
		}
	};
	useEffect(() => {
		setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
		fecthChats();
	}, []);
	return (
		<Box
			d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
			flexDir="column"
			w={{ base: "100%", md: "31%" }}
			p={3}
			bg="white"
			height="100%"
			borderRadius="lg"
			borderWidth="1px"
		>
			<Box
				pb={3}
				px={3}
				w="100%"
				alignItems="center"
				justifyContent="space-between"
				fontSize={{ base: "28px", md: "30px" }}
				fontFamily="quicksand"
			>
				MyChats
			</Box>
		</Box>
	);
};

export default MyChats;
