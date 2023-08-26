import { ChatState } from "../Context/ChatProvider";
import { Box, HStack } from "@chakra-ui/react";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";
import { Flex } from "@chakra-ui/react";

const ChatPage = () => {
	const { user } = ChatState();
	return (
		<div style={{ width: "100%" }}>
			{user && <SideDrawer />}
			<HStack
				d="flex"
				flexDir="row"
				justifyContent="space-between"
				w="100%"
				h="85vh"
				p="10px"
			>
				<Box>{user && <MyChats />}</Box>
				<Box> {user && <ChatBox />}</Box>
			</HStack>
		</div>
	);
};

export default ChatPage;
