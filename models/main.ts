export interface TweetModel {
  conversation_id: string;
  created_at: number;
  tweet: string;
  user_id: number;
  username: string;
  name: string;
  nlikes: number;
  nreplies: number;
  nretweets: number;
  // Add to model.
  verified: boolean;
  profilePic: string;
}

export interface AlgoCategoryModel {
  title: string;
  algorithms: AlgoModel[];
}

export interface AlgoModel {
  key: string;
  title: string;
  publisher: string;
  description: string;
  image: string;
  stars: number;
  rating: number;
  subtitle: string;
}

export interface UserModel {
  algo: string;
  subtitle: string;
}
