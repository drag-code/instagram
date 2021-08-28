import React from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import { connect } from "react-redux";
import Theme from "../../theme/Theme";

const Profile = (props) => {
	const { currentUser, posts } = props;
	return (
		<View style={[Theme.container, Theme.bgWhite]}>
			<View style={styles.infoContainer}>
				<Text>{currentUser.name}</Text>
				<Text>{currentUser.email}</Text>
			</View>
			<View style={styles.galleryContainer}>
				<FlatList
					numColumns={3}
					horizontal={false}
					data={posts}
					renderItem={({ item }) => (
						<View style={styles.imageContainer}>
							<Image style={styles.image} source={{ uri: item.downloadUrl }} />
						</View>
					)}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	infoContainer: {
		alignItems: "center",
	},
	galleryContainer: {},
	image: {
		flex: 1,
		aspectRatio: 1 / 1,
	},
    imageContainer: {
        flex: 1/3,
    }
});

const mapStateToProps = (store) => ({
	currentUser: store.userState.currentUser,
	posts: store.userState.posts,
});

export default connect(mapStateToProps, null)(Profile);
