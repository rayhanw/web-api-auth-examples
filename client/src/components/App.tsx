import React, { FC, useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";

import SEO from "./SEO";
import UserProfile from "./User/UserProfile";
import {
	UserInfo,
	DefaultUserInfo,
	Playlists,
	RecentlyPlayedTracks
} from "./User/user_interfaces";

import "./styles/App.css";

type ParamsToken = {
	accessToken: string;
	refreshToken: string;
	username: string;
} | null;

const App: FC = () => {
	const [loggedIn, setLoggedIn] = useState<boolean>(false);
	const [userInfo, setUserInfo] = useState<UserInfo>(DefaultUserInfo);
	const [playlists, setPlaylists] = useState<Playlists>({
		href: "",
		items: []
	});
	const [recentTracks, setRecentTracks] = useState<RecentlyPlayedTracks[]>([]);

	const getParams = (): ParamsToken => {
		let [
			accessToken,
			refreshToken,
			uri
		]: string[] = window.location.pathname.split("&");

		if (accessToken && refreshToken && uri) {
			accessToken = accessToken.replace("/access_token=", "");
			refreshToken = refreshToken.replace("refresh_token=", "");
			uri = uri.replace("uri=", "").replace("spotify%3Auser%3A", "");
			return { accessToken, refreshToken, username: uri };
		}

		return null;
	};

	const getUserInfo = async (spotify: any, username: string) => {
		const info: UserInfo = await spotify.getUser(username);
		setUserInfo(info);
	};

	const getUserPlaylists = async (spotify: any, username: string) => {
		const options = { limit: 5 };

		const info: Playlists = await spotify.getUserPlaylists(username, options);
		setPlaylists(info);
	};

	const getRecentlyPlayed = async (spotify: any) => {
		const options = { limit: 10 };

		const info = await spotify.getMyRecentlyPlayedTracks(options);
		setRecentTracks(info);
	};

	useEffect(() => {
		const token = getParams();
		const spotify = new SpotifyWebApi();

		if (token) {
			spotify.setAccessToken(token.accessToken);
			setLoggedIn(true);
			getUserInfo(spotify, token.username);
			getUserPlaylists(spotify, token.username);
			getRecentlyPlayed(spotify);
		}
	}, []);

	const renderUser = (): JSX.Element => {
		if (
			loggedIn &&
			userInfo.display_name !== "" &&
			playlists.items.length > 0
		) {
			return (
				<UserProfile
					{...userInfo}
					playlists={playlists}
					recentTracks={recentTracks}
				/>
			);
		}

		return (
			<header className="App-header">
				<a href="/auth/spotify/login">Login to Spotify</a>
			</header>
		);
	};

	return (
		<div className="App">
			<SEO />
			<main>{renderUser()}</main>
		</div>
	);
};

export default App;
