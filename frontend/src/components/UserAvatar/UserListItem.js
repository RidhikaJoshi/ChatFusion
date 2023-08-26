import { color } from "framer-motion";
import React from "react";
import { Avatar, Box, HStack, VStack, Text } from "@chakra-ui/react";

const UserListItem = ({ user, handleFunction }) => {
	return (
		<HStack
			onClick={handleFunction}
			cusor="pointer"
			bg="#E8E8E8"
			_hover={{
				background: "#38B2AC",
				color: "white",
			}}
			w="100%"
			d="flex"
			alignItems="center"
			color="black"
			px={3}
			py={2}
			mb={2}
			borderRadius="lg"
		>
			<Avatar
				mr={2}
				size="sm"
				cusor="pointer"
				name={user.name}
				src={user.pic}
			/>
			<VStack alignItems="left" gap="0.5px">
				<Text>{user.name}</Text>
				<Text fontSize="xs">
					<b>Email: </b>
					{user.email}
				</Text>
			</VStack>
		</HStack>
	);
};

export default UserListItem;
