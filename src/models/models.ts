export interface UserData {
  password: string;
  email: string;
}

export interface CardData {
  likes: Owner[];
  _id: string;
  name: string;
  link: string;
  owner: Owner;
  createdAt: string;
}

export interface Owner {
  name: string;
  about: string;
  avatar: string;
  _id: string;
  cohort: string;
  email?: string;
}

export interface CardActions {
  onCardClick: (card: CardData) => void;
  onCardLike: (card: CardData) => void;
  onCardDelete: (card: CardData) => void;
}

export type CardAdd = { name: string; link: string };

export type UserProfile = { name: string; about: string };
export type UserAvatar = { avatar: string };
