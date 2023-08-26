import React from "react";
import {
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Icon,
	IconButton,
	Image,
	Text,
	VStack,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";

const ProfileModel = ({ user, children }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			{children ? (
				<span onClick={onOpen}>{children} </span>
			) : (
				<IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
			)}
			<Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay />
				<ModalContent h="400px">
					<ModalHeader fontSize="40px" fontFamily="satisfy" textAlign="center">
						{user.name}
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack>
							<Image
								borderRadius="full"
								boxSize="150px"
								src={user.pic}
								alt={user.name}
							/>

							<Text
								fontSize={{ base: "10px", md: "20px" }}
								fontFamily="Quicksand"
							>
								Email: {user.email}
							</Text>
						</VStack>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={onClose}>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default ProfileModel;
