export interface Tracks {
    href:     string;
    items:    Item[];
    limit:    number;
    next:     null;
    offset:   number;
    previous: null;
    total:    number;
}

export interface Item {
    added_at:        Date;
    added_by:        AddedBy;
    is_local:        boolean;
    primary_color:   null;
    track:           Track;
    video_thumbnail: VideoThumbnail;
}

export interface AddedBy {
    external_urls: ExternalUrls;
    href:          string;
    id:            string;
    type:          AddedByType;
    uri:           string;
    name?:         string;
}

export interface ExternalUrls {
    spotify: string;
}

export enum AddedByType {
    Artist = "artist",
    User = "user",
}

export interface Track {
    preview_url:       null | string;
    available_markets: string[];
    explicit:          boolean;
    type:              TrackType;
    episode:           boolean;
    track:             boolean;
    album:             Album;
    artists:           AddedBy[];
    disc_number:       number;
    track_number:      number;
    duration_ms:       number;
    external_ids:      ExternalIDS;
    external_urls:     ExternalUrls;
    href:              string;
    id:                string;
    name:              string;
    popularity:        number;
    uri:               string;
    is_local:          boolean;
}

export interface Album {
    available_markets:      string[];
    type:                   AlbumTypeEnum;
    album_type:             AlbumTypeEnum;
    href:                   string;
    id:                     string;
    images:                 Image[];
    name:                   string;
    release_date:           Date;
    release_date_precision: ReleaseDatePrecision;
    uri:                    string;
    artists:                AddedBy[];
    external_urls:          ExternalUrls;
    total_tracks:           number;
}

export enum AlbumTypeEnum {
    Album = "album",
    Single = "single",
}

export interface Image {
    height: number;
    url:    string;
    width:  number;
}

export enum ReleaseDatePrecision {
    Day = "day",
}

export interface ExternalIDS {
    isrc: string;
}

export enum TrackType {
    Track = "track",
}

export interface VideoThumbnail {
    url: null;
}