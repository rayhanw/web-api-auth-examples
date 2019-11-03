interface Link {
	spotify: string;
}
interface PlaylistOwner {
	display_name: string;
	external_urls: Link;
}

interface ArtistImage {
	height: number;
	width: number;
	url: string;
}

export interface Artist {
	external_urls: Link;
	followers: { total: number };
	genres: string[];
	images: ArtistImage[];
	name: string;
	id: number;
}

export interface UserInfo {
	display_name: string;
	external_urls: any;
	followers: any;
	href: string;
	id: string;
	images: any;
	type: any;
	uri: any;
	playlists: any;
	recentTracks: any;
	followedArtists: any;
}

export interface Playlist {
	collaborative: boolean;
	external_urls: { spotify: string };
	href: string;
	id: string;
	images: { height: number; url: string; width: number }[];
	name: string;
	owner: PlaylistOwner;
	uri: string;
}

export interface Playlists {
	href: string;
	items: Playlist[];
}

export interface RecentlyPlayedTrack {
	track: {
		name: string;
		popularity: string;
		preview_url: string;
		duration_ms: number;
		id: number;
		artists: { name: string; external_urls: Link }[];
	};
}

export interface RecentlyPlayedTracks {
	items: RecentlyPlayedTrack[];
	href: string;
}

export interface FollowedArtists {
	items: Artist[];
}

export enum DefaultUserInfo {
	display_name = "",
	external_urls = "",
	followers = "",
	href = "",
	id = "",
	images = "",
	type = "",
	uri = "",
	playlists = "",
	recentTracks = "",
	followedArtists = ""
}
