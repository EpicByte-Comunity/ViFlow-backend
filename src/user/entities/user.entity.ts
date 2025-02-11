import { Collection } from 'src/collections/entities/collection.entity';
import { BaseEntity } from 'src/common/helper/base.entity';
import { Follow } from 'src/follow/entities/follow.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Notification } from 'src/notifications/entities/notification.entity';
import { Story } from 'src/stories/entities/story.entity';
import { SavePost } from 'src/save-post/entities/save-post.entity';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { Tweet } from 'src/tweet/entities/tweet.entity';
import { Poll } from 'src/poll/entities/poll.entity';
import { PollVote } from 'src/poll/entities/poll-vote.entity';
import { Retweet } from 'src/tweet/entities/retweet.entity';
import { TweetLike } from 'src/tweet/entities/tweet.like.entity';
import { TweetComment } from 'src/tweet/entities/tweet-comment.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ nullable: true, unique: true })
  username: string;

  @Column({ nullable: true, unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  full_name: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  profile_pic: string;

  @Column({ nullable: true })
  verificationCode: string;

  @Column({ nullable: true })
  verificationCodeExpiry: Date;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Follow, (follower) => follower.follower)
  @JoinColumn({ name: 'follower_id' })
  followers: Follow[];

  @OneToMany(() => Follow, (follower) => follower.followed)
  @JoinColumn({ name: 'followed_id' })
  following: Follow[];

  @OneToMany(() => Story, (story) => story.user)
  stories: Story[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @OneToMany(() => SavePost, (savedPost) => savedPost.user)
  savedPosts: SavePost[];

  @OneToMany(() => Collection, (collection) => collection.user)
  collections: Collection[];

  @OneToMany(() => Tweet, (tweet) => tweet.user)
  tweets: Tweet[];

  @OneToMany(() => Retweet, (retweet) => retweet.user)
  retweets: Retweet[];

  @OneToMany(() => TweetLike, (like) => like.user)
  tweetLikes: TweetLike[];

  @OneToMany(() => TweetComment, (comment) => comment.user)
  tweetComments: TweetComment[];

  @OneToMany(() => Poll, (poll) => poll.user)
  polls: Poll[];

  @OneToMany(() => PollVote, (vote) => vote.user)
  pollVotes: PollVote[];
}
