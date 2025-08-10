import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CommentSystem = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [showComments, setShowComments] = useState(true);

  // Mock comments data
  const mockComments = [
    {
      id: 'comment-1',
      author: {
        name: 'Alex Thompson',
        avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
        role: 'Senior Developer'
      },
      content: 'This is an excellent comprehensive guide! The search implementation example is particularly helpful. I\'ve been working on a similar system and this gives me some great ideas for optimization.',
      timestamp: '2025-01-09T14:30:00Z',
      likes: 12,
      isLiked: false,
      replies: [
        {
          id: 'reply-1',
          author: {
            name: 'Sarah Chen',
            avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
            role: 'Content Manager'
          },
          content: 'Glad you found it useful! If you implement any improvements to the search algorithm, I\'d love to hear about your results.',
          timestamp: '2025-01-09T15:45:00Z',
          likes: 5,
          isLiked: true
        }
      ]
    },
    {
      id: 'comment-2',
      author: {
        name: 'Maria Garcia',
        avatar: 'https://randomuser.me/api/portraits/women/38.jpg',
        role: 'Knowledge Manager'
      },
      content: 'The section on content governance is spot on. We\'ve implemented similar workflows in our organization and seen significant improvements in content quality and consistency.',
      timestamp: '2025-01-09T11:20:00Z',
      likes: 8,
      isLiked: true,
      replies: []
    },
    {
      id: 'comment-3',
      author: {
        name: 'James Wilson',
        avatar: 'https://randomuser.me/api/portraits/men/29.jpg',
        role: 'Technical Writer'
      },
      content: 'Could you elaborate more on the taxonomy design principles? I\'m particularly interested in how to handle cross-category content that doesn\'t fit neatly into a single classification.',
      timestamp: '2025-01-09T09:15:00Z',
      likes: 3,
      isLiked: false,
      replies: []
    }
  ];

  const [commentsData, setCommentsData] = useState(mockComments);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const commentTime = new Date(timestamp);
    const diffInHours = Math.floor((now - commentTime) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return commentTime?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleLike = (commentId, isReply = false, parentId = null) => {
    setCommentsData(prevComments => {
      return prevComments?.map(comment => {
        if (isReply && comment?.id === parentId) {
          return {
            ...comment,
            replies: comment?.replies?.map(reply => {
              if (reply?.id === commentId) {
                return {
                  ...reply,
                  isLiked: !reply?.isLiked,
                  likes: reply?.isLiked ? reply?.likes - 1 : reply?.likes + 1
                };
              }
              return reply;
            })
          };
        } else if (!isReply && comment?.id === commentId) {
          return {
            ...comment,
            isLiked: !comment?.isLiked,
            likes: comment?.isLiked ? comment?.likes - 1 : comment?.likes + 1
          };
        }
        return comment;
      });
    });
  };

  const handleSubmitComment = (e) => {
    e?.preventDefault();
    if (!newComment?.trim()) return;

    const comment = {
      id: `comment-${Date.now()}`,
      author: {
        name: 'Current User',
        avatar: 'https://randomuser.me/api/portraits/men/50.jpg',
        role: 'User'
      },
      content: newComment,
      timestamp: new Date()?.toISOString(),
      likes: 0,
      isLiked: false,
      replies: []
    };

    setCommentsData([comment, ...commentsData]);
    setNewComment('');
  };

  const handleSubmitReply = (e, parentId) => {
    e?.preventDefault();
    if (!replyText?.trim()) return;

    const reply = {
      id: `reply-${Date.now()}`,
      author: {
        name: 'Current User',
        avatar: 'https://randomuser.me/api/portraits/men/50.jpg',
        role: 'User'
      },
      content: replyText,
      timestamp: new Date()?.toISOString(),
      likes: 0,
      isLiked: false
    };

    setCommentsData(prevComments => {
      return prevComments?.map(comment => {
        if (comment?.id === parentId) {
          return {
            ...comment,
            replies: [...comment?.replies, reply]
          };
        }
        return comment;
      });
    });

    setReplyText('');
    setReplyingTo(null);
  };

  const CommentItem = ({ comment, isReply = false, parentId = null }) => (
    <div className={`${isReply ? 'ml-12' : ''}`}>
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-secondary">
            <Image
              src={comment?.author?.avatar}
              alt={comment?.author?.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-sm font-medium text-foreground">
                {comment?.author?.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {comment?.author?.role}
              </span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">
                {formatTimeAgo(comment?.timestamp)}
              </span>
            </div>
            
            <p className="text-sm text-foreground leading-relaxed">
              {comment?.content}
            </p>
          </div>

          <div className="flex items-center space-x-4 mt-2 ml-4">
            <button
              onClick={() => handleLike(comment?.id, isReply, parentId)}
              className={`flex items-center space-x-1 text-xs transition-smooth ${
                comment?.isLiked 
                  ? 'text-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={comment?.isLiked ? 'Heart' : 'Heart'} size={14} />
              <span>{comment?.likes}</span>
            </button>

            {!isReply && (
              <button
                onClick={() => setReplyingTo(replyingTo === comment?.id ? null : comment?.id)}
                className="text-xs text-muted-foreground hover:text-foreground transition-smooth"
              >
                Reply
              </button>
            )}
          </div>

          {/* Reply Form */}
          {replyingTo === comment?.id && (
            <form onSubmit={(e) => handleSubmitReply(e, comment?.id)} className="mt-3 ml-4">
              <div className="flex space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-secondary">
                    <Image
                      src="https://randomuser.me/api/portraits/men/50.jpg"
                      alt="Current User"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e?.target?.value)}
                    placeholder="Write a reply..."
                    className="w-full p-3 text-sm bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    rows="2"
                  />
                  <div className="flex items-center justify-end space-x-2 mt-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setReplyingTo(null)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      size="sm"
                      disabled={!replyText?.trim()}
                    >
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="mt-12 pt-8 border-t border-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="MessageCircle" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">
            Comments ({commentsData?.length})
          </h3>
        </div>
        <button
          onClick={() => setShowComments(!showComments)}
          className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
        >
          {showComments ? 'Hide' : 'Show'} Comments
        </button>
      </div>
      {showComments && (
        <>
          {/* New Comment Form */}
          <form onSubmit={handleSubmitComment} className="mb-8">
            <div className="flex space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-secondary">
                  <Image
                    src="https://randomuser.me/api/portraits/men/50.jpg"
                    alt="Current User"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e?.target?.value)}
                  placeholder="Share your thoughts on this article..."
                  className="w-full p-4 text-sm bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  rows="3"
                />
                <div className="flex items-center justify-end mt-3">
                  <Button
                    type="submit"
                    disabled={!newComment?.trim()}
                  >
                    Post Comment
                  </Button>
                </div>
              </div>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {commentsData?.map((comment) => (
              <div key={comment?.id}>
                <CommentItem comment={comment} />
                
                {/* Replies */}
                {comment?.replies?.length > 0 && (
                  <div className="mt-4 space-y-4">
                    {comment?.replies?.map((reply) => (
                      <CommentItem
                        key={reply?.id}
                        comment={reply}
                        isReply={true}
                        parentId={comment?.id}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CommentSystem;