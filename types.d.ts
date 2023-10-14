export interface comment {
    author: {
      email: string;
      username: string;
      avatar:string;
    };
    text: string;
  };

export interface Threads{
    author:{
        email:string;
        username:string;
        avatar:string;
        _id:string;
    }
    createdAt:string;
    like:string[];
    threadText:string;
    updatedAt:string;
    _id:string;
}

export interface UserData {
    createdAt: string;
    email: string;
    avatar: string;
    followers: string[];
    following: string[];
    updatedAt: string;
    username: string;
    _id: string;
};