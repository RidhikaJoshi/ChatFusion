import {
	Avatar,
	Button,
	Center,
	Flex,
	HStack,
	Menu,
	MenuList,
	MenuItem,
	Tooltip,
	MenuDivider,
	VStack,
	Input,
	useToast,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { Box } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { MenuButton } from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModel";
import { useHistory } from "react-router-dom";
import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import axios from "axios";
import ChatLoading from "../../components/ChatLoading";
import UserListItem from "../../components/UserAvatar/UserListItem";
import { Spinner } from "@chakra-ui/react";

const SideDrawer = () => {
	const [search, setSearch] = useState("");
	const [searchResult, setSearchResult] = useState([]);
	const [loading, setLoading] = useState(false);
	const [loadingChat, setLoadingChat] = useState();

	const { user, setSelectedChat, chats, setChats } = ChatState();
	const history = useHistory();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();
	const logoutHandler = () => {
		localStorage.removeItem("userInfo");
		history.push("/");
	};

	const handleSearch = async () => {
		if (!search) {
			toast({
				title: "Please enter a name or email to search",
				status: "warning",
				duration: 3000,
				isClosable: true,
				position: "top-left",
			});
			return;
		}
		try {
			setLoading(true);
			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};
			const { data } = await axios.get(`/api/user?search=${search}`, config);

			setLoading(false);
			setSearchResult(data);
		} catch (error) {
			toast({
				title: "Something went wrong",
				status: "error",
				duration: 5000,
				isClosable: true,
				position: "top-left",
			});
		}
	};
	const accessChat = async (userId) => {
		try {
			setLoadingChat(true);
			const config = {
				headers: {
					"Content-type": "application/json",
					Authorization: `Bearer ${user.token}`,
				},
			};
			const { data } = await axios.post("/api/chat", { userId }, config);
			if (!chats.find((chat) => chat._id === data._id)) {
				setChats([data, ...chats]);
			}
			setSelectedChat(data);
			setLoadingChat(false);
			onClose();
		} catch (error) {
			toast({
				title: "Error Fetching the Chat",
				description: error.message,
				status: "error",
				duration: 3000,
				isClosable: true,
				position: "bottom-left",
			});
		}
	};
	return (
		<>
			<HStack
				justifyContent="space-between"
				alignItems="center"
				bg="white"
				w="99%"
				p="5px 10px 5px 10px"
				borderWidth="5px"
				margin="5px 5px 5px 5px"
			>
				<Tooltip label="Search for a user" hasArrow placement="bottom-end">
					<Button variant="ghost" onClick={onOpen}>
						<i className="fas fa-search"></i>
						<Text
							fontSize={{ base: "0px", md: "15px" }}
							d={{ base: "none", md: "flex" }}
							px="4"
						>
							Search User
						</Text>
					</Button>
				</Tooltip>

				<Text fontSize="2xl" fontFamily="satisfy">
					ChatFusion
				</Text>
				<div>
					<Menu>
						<MenuButton p={1}>
							<BellIcon fontSize="2xl" m={1} />
						</MenuButton>
						{/* <MenuList></MenuList> */}
					</Menu>
					<Menu>
						<MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
							{/* <i className="fas fa-user"></i> */}
							<Avatar
								size="sm"
								cursor="pointer"
								name={user.name}
								src={user.pic}
							/>
						</MenuButton>
						<MenuList>
							<ProfileModal user={user}>
								<MenuItem>My Profile</MenuItem>
							</ProfileModal>
							<MenuItem onClick={logoutHandler}>Log Out</MenuItem>
						</MenuList>
					</Menu>
				</div>
			</HStack>

			<Drawer placement="left" onClose={onClose} isOpen={isOpen}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerHeader borderBottomWidth="1px">Search User</DrawerHeader>
					<DrawerBody>
						<HStack pb={2}>
							<Input
								placeholder="Search by Name or Email"
								mr={2}
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
							<Button onClick={handleSearch}>Go</Button>
						</HStack>
						{loading ? (
							<ChatLoading />
						) : (
							searchResult?.map((user) => (
								<UserListItem
									key={user._id}
									user={user}
									handleFunction={() => accessChat(user._id)}
								></UserListItem>
							))
						)}
						{loadingChat && <Spinner ml="auto" d="flex" />}
					</DrawerBody>

					<DrawerFooter borderTopWidth="1px">
						<Text fontSize="1xl" fontFamily={"Satisfy"} color="black">
							ChatFusion
						</Text>
					</DrawerFooter>
				</DrawerContent>
				      
			</Drawer>
		</>
	);
};

export default SideDrawer;
